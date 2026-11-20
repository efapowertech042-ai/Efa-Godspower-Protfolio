import { useState, type KeyboardEvent } from 'react';
import { GitBranch, ArrowRight } from 'lucide-react';
import { GBR_MODEL_RESULTS } from '../data/insuranceGbrModel';

export type FeatureKey = 'smoker' | 'bmi' | 'age' | 'children' | 'region' | 'sex';

interface CohortRow {
  label: string;
  sublabel: string;
  valueLabel: string;
  barPct: number;
  accent?: 'amber' | 'emerald' | 'slate';
}

interface FeatureBehaviorSpec {
  key: FeatureKey;
  columnName: string;
  label: string;
  importancePct: number;
  role: string;
  mechanismId: 'M1' | 'M2' | 'M3' | 'M4';
  secondaryMechanismId?: 'M1' | 'M2' | 'M3' | 'M4';
  targetIds: ('perf' | 'pi')[];
  summary: string;
  modelBehavior: string;
  olsGap: string;
  marginalLabel: string;
  marginalDelta: string;
  cohortTitle: string;
  cohorts: CohortRow[];
}

const FEATURE_SPECS: Record<FeatureKey, FeatureBehaviorSpec> = {
  smoker: {
    key: 'smoker',
    columnName: 'smoker',
    label: 'Smoker Status',
    importancePct: 63.76,
    role: 'Depth-0 Root Gating Split',
    mechanismId: 'M1',
    secondaryMechanismId: 'M2',
    targetIds: ['perf', 'pi'],
    summary:
      'Acts as the primary root split (smoker_yes <= 0.5) across the 200 gradient-boosted trees, separating the portfolio into two structurally distinct medical cost regimes.',
    modelBehavior:
      'Non-smokers route into a low-variance baseline subtree ($8,434 empirical mean, n=1,064), while smokers route into an amplified risk subtree ($32,050 mean, n=274) where downstream BMI splits trigger steep nonlinear jumps.',
    olsGap:
      'Linear OLS forces one shared slope for BMI and age across both groups, systematically under-predicting high-BMI smokers and over-predicting lean smokers.',
    marginalLabel: 'Median Non-Smoker -> Smoker Flip (39y, BMI 30.4)',
    marginalDelta: '+$32,942 ($7,267 -> $40,209)',
    cohortTitle: 'Observed Cohort Mean Charges (n=1,338)',
    cohorts: [
      { label: 'Non-Smoker', sublabel: 'n=1,064 · 79.5%', valueLabel: '$8,434', barPct: 26, accent: 'emerald' },
      { label: 'Smoker', sublabel: 'n=274 · 20.5%', valueLabel: '$32,050', barPct: 100, accent: 'amber' },
    ],
  },
  bmi: {
    key: 'bmi',
    columnName: 'bmi',
    label: 'Body Mass Index',
    importancePct: 21.2,
    role: 'Non-Linear Interaction Amplifier',
    mechanismId: 'M2',
    secondaryMechanismId: 'M1',
    targetIds: ['perf', 'pi'],
    summary:
      'Captures the sharp threshold cliff near BMI 30.0 (exact tree split at 29.97) exclusively inside the smoker subtree, rather than applying a uniform penalty across all policyholders.',
    modelBehavior:
      'For non-smokers, BMI barely shifts predicted cost ($7,516 to $8,843 across <25 to >=30). For smokers, crossing BMI 30 triggers an immediate +$19,926 surge at median age while widening the 90% split-conformal uncertainty band to ±$7,981.',
    olsGap:
      'This single interaction explains most of GBR’s -36.5% MAE reduction over OLS ($2,656 vs $4,181).',
    marginalLabel: 'Smoker BMI 24 -> BMI 31 Threshold Jump',
    marginalDelta: '+$19,926 ($19,903 -> $39,829)',
    cohortTitle: 'Smoker vs Non-Smoker BMI Interaction',
    cohorts: [
      { label: 'Non-Smoker <25', sublabel: 'n=190', valueLabel: '$7,516', barPct: 18, accent: 'slate' },
      { label: 'Non-Smoker >=30', sublabel: 'n=562', valueLabel: '$8,843', barPct: 21, accent: 'slate' },
      { label: 'Smoker 25-29.9', sublabel: 'n=74', valueLabel: '$22,496', barPct: 54, accent: 'amber' },
      { label: 'Smoker >=30', sublabel: 'n=145', valueLabel: '$41,558', barPct: 100, accent: 'amber' },
    ],
  },
  age: {
    key: 'age',
    columnName: 'age',
    label: 'Policyholder Age',
    importancePct: 12.72,
    role: 'Convex Baseline Utilization Ladder',
    mechanismId: 'M3',
    targetIds: ['perf'],
    summary:
      'Models the steady, accelerating rise in healthcare claims from age 18 to 64 inside both smoker and non-smoker subtrees using multi-tier threshold buckets (22.5, 32.5, 42.5, 51.5, 58.5).',
    modelBehavior:
      'Baseline charges rise slowly in early adulthood (+$1,918 from 20s to 30s) and steepen after 45 (+$4,248 from 40s to 50–64), reflecting cumulative chronic care utilization across age brackets.',
    olsGap:
      'Tree buckets absorb accelerating late-career costs without distorting young-adult floor estimates ($1,122–$2,200).',
    marginalLabel: 'Non-Smoker Age 20 -> Age 60 Shift',
    marginalDelta: '+$10,089 ($5,142 -> $15,231)',
    cohortTitle: 'Non-Smoker Mean Charge by Age Bracket',
    cohorts: [
      { label: '18–29 yrs', sublabel: 'n=331', valueLabel: '$4,419', barPct: 33, accent: 'emerald' },
      { label: '30–39 yrs', sublabel: 'n=199', valueLabel: '$6,337', barPct: 47, accent: 'emerald' },
      { label: '40–49 yrs', sublabel: 'n=217', valueLabel: '$9,183', barPct: 68, accent: 'amber' },
      { label: '50–64 yrs', sublabel: 'n=317', valueLabel: '$13,431', barPct: 100, accent: 'amber' },
    ],
  },
  children: {
    key: 'children',
    columnName: 'children',
    label: 'Dependents',
    importancePct: 1.64,
    role: 'Modest Family Coverage Offset',
    mechanismId: 'M3',
    targetIds: ['perf'],
    summary:
      'Applies incremental additive step adjustments for covered dependents (0 to 5), serving as a secondary calibrator once smoking status, BMI, and age are resolved.',
    modelBehavior:
      'Non-smoker averages rise smoothly from 0 ($7,612) through 3 dependents ($9,615) and 4 ($12,121), while sparse n=18 tail observations at 5 dependents are damped by depth-4 leaf shrinkage.',
    olsGap:
      'GBR isolates true dependent increments cleanly without letting sparse 5-child outliers tilt the global slope.',
    marginalLabel: '0 -> 3 Dependents at Median Profile',
    marginalDelta: '+$1,115 ($6,838 -> $7,953)',
    cohortTitle: 'Non-Smoker Mean by Dependents Covered',
    cohorts: [
      { label: '0 Children', sublabel: 'n=574 total', valueLabel: '$7,612', barPct: 63, accent: 'slate' },
      { label: '1 Child', sublabel: 'n=324 total', valueLabel: '$8,303', barPct: 68, accent: 'slate' },
      { label: '2–3 Children', sublabel: 'n=397 total', valueLabel: '$9,541', barPct: 79, accent: 'emerald' },
      { label: '4 Children', sublabel: 'n=25 total', valueLabel: '$12,121', barPct: 100, accent: 'amber' },
    ],
  },
  region: {
    key: 'region',
    columnName: 'region',
    label: 'US Region',
    importancePct: 0.5,
    role: 'Confounder-Filtered Geo Calibrator',
    mechanismId: 'M4',
    targetIds: ['perf'],
    summary:
      'Provides minor geographic pricing adjustments only after smoking prevalence differences across regions are accounted for higher up in the trees.',
    modelBehavior:
      'Raw unadjusted Southeast charges appear highest ($14,735) only because Southeast carries the highest smoking rate (25.0% vs 17.8% in NW/SW). Holding smoking and BMI fixed, Northeast predicts slightly highest ($7,487) and Southwest lowest ($6,149).',
    olsGap:
      'Graph attribution exposes regional confounding so underwriters do not mistake smoking concentration for geographic pricing risk.',
    marginalLabel: 'Controlled Regional Spread (SW -> NE)',
    marginalDelta: '+$1,338 ($6,149 -> $7,487)',
    cohortTitle: 'Controlled GBR Prediction vs Raw Smoking Rate',
    cohorts: [
      { label: 'Northeast', sublabel: '20.7% smokers · raw $13,406', valueLabel: '$7,487', barPct: 100, accent: 'amber' },
      { label: 'Southeast', sublabel: '25.0% smokers · raw $14,735', valueLabel: '$7,267', barPct: 97, accent: 'emerald' },
      { label: 'Northwest', sublabel: '17.8% smokers · raw $12,418', valueLabel: '$6,737', barPct: 90, accent: 'slate' },
      { label: 'Southwest', sublabel: '17.8% smokers · raw $12,347', valueLabel: '$6,149', barPct: 82, accent: 'slate' },
    ],
  },
  sex: {
    key: 'sex',
    columnName: 'sex',
    label: 'Sex',
    importancePct: 0.18,
    role: 'Smoking-Adjusted Near-Neutral Feature',
    mechanismId: 'M4',
    targetIds: ['perf'],
    summary:
      'Contributes just 0.18% of total tree split gain—confirming policyholder sex is nearly pricing-neutral once smoking behavior and BMI are conditioned out.',
    modelBehavior:
      'Raw dataset means show men averaging $13,957 vs women $12,570, driven largely by higher male smoking prevalence (23.5% vs 17.4%). Controlling all other columns leaves a negligible +$159 GBR differential.',
    olsGap:
      'Auditing this tiny 0.18% weight proves the ensemble avoids spurious gender drift and grounds risk in clinical/behavioral drivers.',
    marginalLabel: 'Controlled Female -> Male Delta',
    marginalDelta: '+$159 ($7,267 -> $7,426)',
    cohortTitle: 'Raw Unadjusted Mean vs Controlled GBR Estimate',
    cohorts: [
      { label: 'Female (Raw)', sublabel: '17.4% smokers · n=662', valueLabel: '$12,570', barPct: 90, accent: 'slate' },
      { label: 'Male (Raw)', sublabel: '23.5% smokers · n=676', valueLabel: '$13,957', barPct: 100, accent: 'slate' },
      { label: 'Female (GBR)', sublabel: 'Controlled baseline', valueLabel: '$7,267', barPct: 52, accent: 'emerald' },
      { label: 'Male (GBR)', sublabel: 'Controlled +$159', valueLabel: '$7,426', barPct: 53, accent: 'emerald' },
    ],
  },
};

const FEATURE_ORDER: FeatureKey[] = ['smoker', 'bmi', 'age', 'children', 'region', 'sex'];

interface GraphNodePos {
  key: FeatureKey;
  y: number;
  color: string;
}

const LEFT_NODES: GraphNodePos[] = [
  { key: 'smoker', y: 24, color: '#F59E0B' },
  { key: 'bmi', y: 92, color: '#FB923C' },
  { key: 'age', y: 160, color: '#FBBF24' },
  { key: 'children', y: 228, color: '#34D399' },
  { key: 'region', y: 296, color: '#94A3B8' },
  { key: 'sex', y: 364, color: '#64748B' },
];

const MECHANISM_NODES: {
  id: 'M1' | 'M2' | 'M3' | 'M4';
  y: number;
  code: string;
  title: string;
  sub: string;
  accent: string;
}[] = [
  {
    id: 'M1',
    y: 34,
    code: 'M1 · ROOT GATE',
    title: 'Regime Bifurcation',
    sub: 'smoker_yes <= 0.5 · 3.8x jump',
    accent: '#F59E0B',
  },
  {
    id: 'M2',
    y: 132,
    code: 'M2 · INTERACTION',
    title: 'BMI >= 30 Step Cliff',
    sub: 'smoker × BMI -> +$19,926',
    accent: '#FB923C',
  },
  {
    id: 'M3',
    y: 230,
    code: 'M3 · MONOTONIC',
    title: 'Age & Family Ladder',
    sub: '18->64 curve + dependent steps',
    accent: '#34D399',
  },
  {
    id: 'M4',
    y: 328,
    code: 'M4 · DECONFOUNDER',
    title: 'Smoker-Rate Isolation',
    sub: 'Strips geo/sex proxy bias',
    accent: '#94A3B8',
  },
];

export function FeatureBehaviorGraphRag({
  onInspectSimulator,
  embedded = false,
}: {
  onInspectSimulator?: () => void;
  embedded?: boolean;
}) {
  const [selectedFeature, setSelectedFeature] = useState<FeatureKey>('smoker');
  const active = FEATURE_SPECS[selectedFeature];

  const handleKeyDown = (e: KeyboardEvent<SVGGElement>, key: FeatureKey) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedFeature(key);
    }
  };

  const mechYMap: Record<'M1' | 'M2' | 'M3' | 'M4', number> = {
    M1: 72,
    M2: 170,
    M3: 268,
    M4: 366,
  };

  const targetYMap = {
    perf: 128,
    pi: 300,
  };

  return (
    <div
      className={
        embedded
          ? 'overflow-hidden bg-[#080B12]/90'
          : 'rounded-xl border border-white/[0.08] bg-[#080B12]/90 overflow-hidden'
      }
    >
      {/* Header + Segmented Feature Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] px-5 py-4 sm:px-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-300">
            <GitBranch className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            <span>Feature Importance &amp; Behavior Knowledge Graph (Graph RAG)</span>
          </div>
          <h4 className="mt-1 font-display text-base font-semibold text-white">
            How All 6 Columns Shape the 200-Tree GradientBoostingRegressor Predictions
          </h4>
        </div>

        <div
          className="flex flex-wrap items-center gap-1 rounded-lg border border-white/[0.08] bg-[#0B0F17] p-1"
          role="tablist"
          aria-label="Inspect dataset column feature importance and modeled behavior"
        >
          {FEATURE_ORDER.map((key) => {
            const spec = FEATURE_SPECS[key];
            const isSelected = selectedFeature === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedFeature(key)}
                className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 tabular-nums ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                    : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                {spec.columnName} ({spec.importancePct.toFixed(2)}%)
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split: Left Crisp SVG Graph Topology + Right Behavior Retrieval Panel */}
      <div className="grid lg:grid-cols-12">
        {/* Left: Crisp Vector Knowledge Graph */}
        <div className="overflow-x-auto border-b border-white/[0.08] bg-[#060910] p-4 sm:p-5 lg:col-span-7 lg:border-b-0 lg:border-r">
          <div className="mb-2.5 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Layer 1: Columns (% Gain)</span>
            <span>Layer 2: Learned Tree Mechanisms</span>
            <span>Layer 3: Model Outcomes</span>
          </div>

          <svg
            viewBox="0 0 820 434"
            className="h-auto w-full min-w-[600px] select-none"
            role="img"
            aria-label="Interactive Graph RAG knowledge graph connecting dataset columns, tree splitting mechanisms, and GBR prediction performance"
          >
            <defs>
              <marker
                id="rag-arrow-amber"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5.5"
                markerHeight="5.5"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#F59E0B" />
              </marker>
              <marker
                id="rag-arrow-emerald"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5.5"
                markerHeight="5.5"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#34D399" />
              </marker>
              <marker
                id="rag-arrow-muted"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="rgba(148,163,184,0.45)" />
              </marker>
            </defs>

            {/* Layer 1 -> Layer 2 Directed Causal Edges */}
            {LEFT_NODES.map((node) => {
              const spec = FEATURE_SPECS[node.key];
              const isHighlighted = selectedFeature === node.key;
              const startX = 230;
              const startY = node.y + 27;
              const endX = 296;
              const endY1 = mechYMap[spec.mechanismId];

              const strokeW =
                spec.importancePct > 30
                  ? 2.8
                  : spec.importancePct > 10
                  ? 2.1
                  : spec.importancePct > 1
                  ? 1.5
                  : 1.25;

              return (
                <g key={`edge-l1-${node.key}`}>
                  <path
                    d={`M ${startX} ${startY} C ${startX + 34} ${startY}, ${endX - 34} ${endY1}, ${endX} ${endY1}`}
                    fill="none"
                    stroke={isHighlighted ? '#F59E0B' : 'rgba(148,163,184,0.28)'}
                    strokeWidth={isHighlighted ? Math.max(2.2, strokeW) : strokeW}
                    strokeDasharray={spec.importancePct < 1 ? '4 4' : undefined}
                    opacity={isHighlighted ? 1 : 0.4}
                    markerEnd={isHighlighted ? 'url(#rag-arrow-amber)' : 'url(#rag-arrow-muted)'}
                  />
                  {spec.secondaryMechanismId && (
                    <path
                      d={`M ${startX} ${startY} C ${startX + 36} ${startY}, ${endX - 36} ${
                        mechYMap[spec.secondaryMechanismId]
                      }, ${endX} ${mechYMap[spec.secondaryMechanismId]}`}
                      fill="none"
                      stroke={isHighlighted ? '#FB923C' : 'rgba(148,163,184,0.2)'}
                      strokeWidth={isHighlighted ? 1.75 : 1.1}
                      strokeDasharray="4 4"
                      opacity={isHighlighted ? 0.9 : 0.3}
                      markerEnd={isHighlighted ? 'url(#rag-arrow-amber)' : 'url(#rag-arrow-muted)'}
                    />
                  )}
                </g>
              );
            })}

            {/* Layer 2 -> Layer 3 Directed Outcome Edges */}
            {MECHANISM_NODES.map((mech) => {
              const isPrimaryMech = active.mechanismId === mech.id;
              const isSecondaryMech = active.secondaryMechanismId === mech.id;
              const isActiveMech = isPrimaryMech || isSecondaryMech;
              const startX = 530;
              const startY = mechYMap[mech.id];
              const endX = 590;

              const connectsPerf = true;
              const connectsPi = mech.id === 'M1' || mech.id === 'M2';

              return (
                <g key={`edge-l2-${mech.id}`}>
                  {connectsPerf && (
                    <path
                      d={`M ${startX} ${startY} C ${startX + 32} ${startY}, ${endX - 32} ${targetYMap.perf}, ${endX} ${targetYMap.perf}`}
                      fill="none"
                      stroke={isActiveMech ? '#34D399' : 'rgba(148,163,184,0.22)'}
                      strokeWidth={isActiveMech ? 2.2 : 1.2}
                      opacity={isActiveMech ? 1 : 0.35}
                      markerEnd={isActiveMech ? 'url(#rag-arrow-emerald)' : 'url(#rag-arrow-muted)'}
                    />
                  )}
                  {connectsPi && (
                    <path
                      d={`M ${startX} ${startY} C ${startX + 32} ${startY}, ${endX - 32} ${targetYMap.pi}, ${endX} ${targetYMap.pi}`}
                      fill="none"
                      stroke={
                        isActiveMech && active.targetIds.includes('pi')
                          ? '#F59E0B'
                          : 'rgba(245,158,11,0.2)'
                      }
                      strokeWidth={isActiveMech && active.targetIds.includes('pi') ? 2.1 : 1.15}
                      strokeDasharray="4 4"
                      opacity={isActiveMech && active.targetIds.includes('pi') ? 1 : 0.35}
                      markerEnd={
                        isActiveMech && active.targetIds.includes('pi')
                          ? 'url(#rag-arrow-amber)'
                          : 'url(#rag-arrow-muted)'
                      }
                    />
                  )}
                </g>
              );
            })}

            {/* Layer 1: 6 Column Feature Nodes (Clickable) */}
            {LEFT_NODES.map((node) => {
              const spec = FEATURE_SPECS[node.key];
              const isSelected = selectedFeature === node.key;
              const barWidth = Math.max(4, Math.round((spec.importancePct / 100) * 184));

              return (
                <g
                  key={node.key}
                  role="button"
                  tabIndex={0}
                  aria-label={`Inspect ${spec.label} (${spec.importancePct}% importance)`}
                  onClick={() => setSelectedFeature(node.key)}
                  onKeyDown={(e) => handleKeyDown(e, node.key)}
                  className="cursor-pointer focus:outline-none"
                >
                  <rect
                    x="18"
                    y={node.y}
                    width="212"
                    height="54"
                    rx="10"
                    fill={isSelected ? '#121927' : '#0B0F17'}
                    stroke={isSelected ? '#F59E0B' : 'rgba(255,255,255,0.12)'}
                    strokeWidth={isSelected ? 1.8 : 1}
                  />
                  <text
                    x="32"
                    y={node.y + 20}
                    fill="#FFFFFF"
                    fontSize="12"
                    fontWeight="600"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {spec.columnName}
                  </text>
                  <text
                    x="216"
                    y={node.y + 20}
                    textAnchor="end"
                    fill={isSelected ? '#FBBF24' : '#E2E8F0'}
                    fontSize="11.5"
                    fontWeight="700"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {spec.importancePct.toFixed(2)}%
                  </text>
                  <text
                    x="32"
                    y={node.y + 35}
                    fill="#94A3B8"
                    fontSize="9.5"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                  >
                    {spec.role}
                  </text>
                  {/* Visual Split-Importance Bar */}
                  <rect
                    x="32"
                    y={node.y + 42}
                    width="184"
                    height="4"
                    rx="2"
                    fill="rgba(255,255,255,0.07)"
                  />
                  <rect
                    x="32"
                    y={node.y + 42}
                    width={barWidth}
                    height="4"
                    rx="2"
                    fill={node.color}
                  />
                </g>
              );
            })}

            {/* Layer 2: Retrieved Mechanism Nodes */}
            {MECHANISM_NODES.map((mech) => {
              const isHighlighted =
                active.mechanismId === mech.id || active.secondaryMechanismId === mech.id;
              return (
                <g key={mech.id}>
                  <rect
                    x="298"
                    y={mech.y}
                    width="232"
                    height="76"
                    rx="10"
                    fill={isHighlighted ? '#111827' : '#0B0F17'}
                    stroke={isHighlighted ? mech.accent : 'rgba(255,255,255,0.1)'}
                    strokeWidth={isHighlighted ? 1.6 : 1}
                    opacity={isHighlighted ? 1 : 0.68}
                  />
                  <text
                    x="312"
                    y={mech.y + 20}
                    fill={mech.accent}
                    fontSize="9.5"
                    fontWeight="600"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {mech.code}
                  </text>
                  <text
                    x="312"
                    y={mech.y + 40}
                    fill="#FFFFFF"
                    fontSize="12.5"
                    fontWeight="600"
                    fontFamily="Outfit, sans-serif"
                  >
                    {mech.title}
                  </text>
                  <text
                    x="312"
                    y={mech.y + 58}
                    fill="#94A3B8"
                    fontSize="10"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                  >
                    {mech.sub}
                  </text>
                </g>
              );
            })}

            {/* Layer 3: Target Performance Nodes */}
            <g>
              <rect
                x="592"
                y="54"
                width="210"
                height="148"
                rx="12"
                fill="#0D1420"
                stroke="rgba(52,211,153,0.55)"
                strokeWidth="1.5"
              />
              <text
                x="608"
                y="78"
                fill="#6EE7B7"
                fontSize="10"
                fontWeight="600"
                fontFamily="JetBrains Mono, monospace"
              >
                TARGET · GBR PERFORMANCE
              </text>
              <text
                x="608"
                y="102"
                fill="#FFFFFF"
                fontSize="14"
                fontWeight="700"
                fontFamily="Outfit, sans-serif"
              >
                Holdout R² {GBR_MODEL_RESULTS.holdout.r2.toFixed(4)}
              </text>
              <text
                x="608"
                y="122"
                fill="#E2E8F0"
                fontSize="11"
                fontFamily="JetBrains Mono, monospace"
              >
                RMSE ${GBR_MODEL_RESULTS.holdout.rmse.toLocaleString()}
              </text>
              <text
                x="608"
                y="140"
                fill="#E2E8F0"
                fontSize="11"
                fontFamily="JetBrains Mono, monospace"
              >
                MAE ${GBR_MODEL_RESULTS.holdout.mae.toLocaleString()}
              </text>
              <line
                x1="608"
                y1="154"
                x2="786"
                y2="154"
                stroke="rgba(255,255,255,0.09)"
              />
              <text
                x="608"
                y="173"
                fill="#6EE7B7"
                fontSize="10.5"
                fontWeight="600"
                fontFamily="JetBrains Mono, monospace"
              >
                -36.5% MAE vs OLS
              </text>
              <text
                x="608"
                y="190"
                fill="#94A3B8"
                fontSize="9.5"
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                200 depth-4 trees · n=268 test
              </text>
            </g>

            <g>
              <rect
                x="592"
                y="230"
                width="210"
                height="142"
                rx="12"
                fill="#0D1420"
                stroke={
                  active.targetIds.includes('pi')
                    ? 'rgba(245,158,11,0.7)'
                    : 'rgba(255,255,255,0.14)'
                }
                strokeWidth={active.targetIds.includes('pi') ? 1.5 : 1.1}
                opacity={active.targetIds.includes('pi') ? 1 : 0.72}
              />
              <text
                x="608"
                y="254"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="600"
                fontFamily="JetBrains Mono, monospace"
              >
                GUARDRAIL · 90% PI BANDS
              </text>
              <text
                x="608"
                y="278"
                fill="#FFFFFF"
                fontSize="14"
                fontWeight="700"
                fontFamily="Outfit, sans-serif"
              >
                {GBR_MODEL_RESULTS.holdout.conformalCoveragePct}% Coverage
              </text>
              <text
                x="608"
                y="298"
                fill="#CBD5E1"
                fontSize="10.5"
                fontFamily="JetBrains Mono, monospace"
              >
                Non-Smoker: ±${GBR_MODEL_RESULTS.conformalHalfWidths90.nonSmoker.toLocaleString()}
              </text>
              <text
                x="608"
                y="316"
                fill="#CBD5E1"
                fontSize="10.5"
                fontFamily="JetBrains Mono, monospace"
              >
                Smoker BMI&lt;30: ±${GBR_MODEL_RESULTS.conformalHalfWidths90.smokerLean.toLocaleString()}
              </text>
              <text
                x="608"
                y="334"
                fill="#FBBF24"
                fontSize="10.5"
                fontWeight="600"
                fontFamily="JetBrains Mono, monospace"
              >
                Smoker BMI&gt;=30: ±${GBR_MODEL_RESULTS.conformalHalfWidths90.smokerHighBmi.toLocaleString()}
              </text>
              <text
                x="608"
                y="357"
                fill="#94A3B8"
                fontSize="9.5"
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                Flags high-variance edges
              </text>
            </g>
          </svg>
        </div>

        {/* Right: Retrieved Feature Behavior & Empirical Cohort Breakdown */}
        <div className="flex flex-col justify-between p-5 sm:p-6 lg:col-span-5">
          <div>
            <div className="flex items-baseline justify-between gap-2 text-xs">
              <span className="font-mono font-semibold text-amber-300">
                {active.columnName} · {active.role}
              </span>
              <span className="font-mono font-bold text-white tabular-nums">
                {active.importancePct.toFixed(2)}% gain
              </span>
            </div>

            <h5 className="mt-2 font-display text-lg font-semibold text-white">
              {active.label} Behavior in Model Predictions
            </h5>

            <p className="mt-2 text-xs leading-relaxed text-slate-200">{active.summary}</p>
            <p className="mt-2.5 text-xs leading-relaxed text-slate-300">{active.modelBehavior}</p>

            {/* Empirical Cohort Proof Bars */}
            <div className="mt-4 border-t border-white/[0.08] pt-4">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-200">{active.cohortTitle}</span>
                <span className="font-mono text-slate-400">insurance.csv</span>
              </div>

              <div className="mt-3 space-y-2.5">
                {active.cohorts.map((row) => (
                  <div key={row.label}>
                    <div className="flex items-baseline justify-between gap-2 text-xs">
                      <div className="min-w-0 truncate">
                        <span className="font-medium text-white">{row.label}</span>
                        <span className="ml-1.5 text-[11px] text-slate-400">{row.sublabel}</span>
                      </div>
                      <span className="font-mono font-semibold text-slate-100 tabular-nums shrink-0">
                        {row.valueLabel}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-white/[0.06]">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-200 ${
                          row.accent === 'amber'
                            ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                            : row.accent === 'emerald'
                            ? 'bg-emerald-400'
                            : 'bg-slate-400'
                        }`}
                        style={{ width: `${Math.max(4, row.barPct)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Marginal Prediction Effect + OLS Insight */}
            <dl className="mt-4 space-y-2 border-t border-white/[0.08] pt-3.5 text-xs">
              <div>
                <dt className="text-[11px] text-slate-400">{active.marginalLabel}</dt>
                <dd className="mt-0.5 font-mono font-semibold text-amber-300 tabular-nums">
                  {active.marginalDelta}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] text-slate-400">Why It Improves Performance</dt>
                <dd className="mt-0.5 leading-relaxed text-slate-300">{active.olsGap}</dd>
              </div>
            </dl>
          </div>

          {onInspectSimulator && (
            <div className="mt-5 border-t border-white/[0.08] pt-4">
              <button
                type="button"
                onClick={onInspectSimulator}
                className="inline-flex min-h-[40px] w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:from-amber-400 hover:to-orange-500"
              >
                Test This Feature Live in 200-Tree Simulator
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
