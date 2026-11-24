import { useState, KeyboardEvent } from 'react';
import { ArrowRight, GitBranch, Layers, ShieldCheck, BarChart3 } from 'lucide-react';
import { ProjectCategory } from '../data/portfolioData';
import { FeatureBehaviorGraphRag } from './FeatureBehaviorGraphRag';

type DiagramMode = 'graph-rag' | 'feature-rag' | 'ml-pipeline';

interface NodeSpec {
  id: string;
  code: string;
  title: string;
  layer: string;
  summary: string;
  inputContract: string;
  outputGuarantee: string;
  metricLabel: string;
  metricValue: string;
  targetCategory: ProjectCategory;
  targetSearch: string;
}

const GRAPH_RAG_SPECS: Record<string, NodeSpec> = {
  'g-subgraph': {
    id: 'g-subgraph',
    code: 'KG-01',
    title: 'Entity Knowledge Graph Subgraph',
    layer: 'Multi-Hop Relational Traversal',
    summary:
      'Models structured domain entities (Customers, Orders, Regions, Discount Caps) and explicit edges (VIOLATES, ORIGINATES_IN, DRIVES_LOSS) so multi-hop queries resolve exact root-cause links without chunk fragmentation.',
    inputContract: 'Validated relational tables + entity-relation triples',
    outputGuarantee: 'Deterministic k-hop neighborhood subgraph with provenance IDs',
    metricLabel: 'Isolation Scope',
    metricValue: '9,994 Orders · 793 Accounts',
    targetCategory: 'Fraud & Forecasting',
    targetSearch: 'Discount',
  },
  'r-vector': {
    id: 'r-vector',
    code: 'VR-02',
    title: 'Dense Semantic Vector Index',
    layer: 'Unstructured Context Retrieval',
    summary:
      'Embeds technical documentation, policy rules, and analyst commentary into cosine-indexed vector chunks to surface qualitative nuance alongside exact graph facts.',
    inputContract: 'Domain documents chunked with metadata boundaries',
    outputGuarantee: 'Top-K semantically aligned passages with source offsets',
    metricLabel: 'Retrieval Mode',
    metricValue: 'Hybrid Dense + Graph',
    targetCategory: 'Fraud & Forecasting',
    targetSearch: 'Global Retail',
  },
  'r-rerank': {
    id: 'r-rerank',
    code: 'FX-03',
    title: 'Subgraph + Vector Fusion & Reranker',
    layer: 'Context Pruning & Noise Filtering',
    summary:
      'Merges multi-hop graph paths with dense passages via Reciprocal Rank Fusion (RRF), pruning low-relevance noise so downstream reasoning remains compact, faithful, and low-latency.',
    inputContract: 'Candidate graph paths + top-K vector chunks',
    outputGuarantee: 'Deduplicated, ranked context bundle under token budget',
    metricLabel: 'Signal Precision',
    metricValue: '300 Max-Discount Isolated',
    targetCategory: 'Fraud & Forecasting',
    targetSearch: 'Discount',
  },
  'r-llm': {
    id: 'r-llm',
    code: 'GS-04',
    title: 'Grounded Synthesis Engine',
    layer: 'Constrained Generation',
    summary:
      'Generates executive explanations and analyst responses strictly conditioned on verified graph edges and retrieved records, attaching explicit entity citations to every quantitative claim.',
    inputContract: 'Reranked subgraph context + structured citation schema',
    outputGuarantee: 'Claim-linked response with zero ungrounded extrapolation',
    metricLabel: 'Citation Rule',
    metricValue: '100% Source Attributed',
    targetCategory: 'Production ML & Evaluation',
    targetSearch: 'Health Insurance',
  },
  'r-eval': {
    id: 'r-eval',
    code: 'EV-05',
    title: 'AI Evaluation & Confidence Guardrail Gate',
    layer: 'Hallucination, Calibration & Bias Audit',
    summary:
      'Audits outputs prior to stakeholder delivery—verifying factual alignment against source graphs, computing calibrated 90% prediction intervals, and flagging high-variance edge cases for human review.',
    inputContract: 'Generated claims + model residuals + subgroup distributions',
    outputGuarantee: 'Verified output or automated low-confidence escalation flag',
    metricLabel: 'Production Benchmark',
    metricValue: 'R² 0.8538 · 90.3% PI',
    targetCategory: 'Production ML & Evaluation',
    targetSearch: 'Health Insurance',
  },
};

const ML_PIPELINE_SPECS: Record<string, NodeSpec> = {
  'm-ingest': {
    id: 'm-ingest',
    code: '01',
    title: 'SQL Feature Engineering & Ingestion',
    layer: 'Data Contracts Layer',
    summary:
      'Extracts multi-table operational records via parameterized SQL queries—engineering temporal lags, rolling revenue averages, and customer-level discount aggregations.',
    inputContract: 'Raw relational schemas & transaction logs',
    outputGuarantee: 'Typed, constraint-checked modeling datasets',
    metricLabel: 'Query Scope',
    metricValue: 'SQL + Multi-Store',
    targetCategory: 'Fraud & Forecasting',
    targetSearch: 'Global Retail',
  },
  'm-clean': {
    id: 'm-clean',
    code: '02',
    title: 'Validation & Leak-Free Preprocessing',
    layer: 'Integrity Layer',
    summary:
      'Enforces strict train/test split isolation prior to scaling and encoding, preventing target leakage while profiling skewness, missingness, and extreme BMI/discount bounds.',
    inputContract: 'Engineered raw feature matrix',
    outputGuarantee: 'Reproducible Scikit-learn pipeline transformers',
    metricLabel: 'Audit Coverage',
    metricValue: 'Zero Leakage Splits',
    targetCategory: 'Production ML & Evaluation',
    targetSearch: 'Health Insurance',
  },
  'm-model': {
    id: 'm-model',
    code: '03',
    title: 'Supervised Regression & Clustering Fit',
    layer: 'Modeling Layer',
    summary:
      'Benchmarks cross-validated regression models, gradient-boosted trees, and Ward Agglomerative Hierarchical Clustering to match problem structure with interpretable estimators.',
    inputContract: 'Validated transformed feature vectors',
    outputGuarantee: 'Serialized estimators & cluster assignments',
    metricLabel: 'Primary Models',
    metricValue: 'Regression · XGBoost · Ward',
    targetCategory: 'Fraud & Forecasting',
    targetSearch: '',
  },
  'm-eval': {
    id: 'm-eval',
    code: '04',
    title: 'Holdout Validation & Residual Error Audit',
    layer: 'Evaluation Layer',
    summary:
      'Evaluates generalization on unseen holdouts using R², RMSE, and MAE while inspecting subgroup residual variance to detect hidden failure modes across customer segments.',
    inputContract: 'Out-of-fold & holdout predictions vs ground truth',
    outputGuarantee: 'Verified error report & subgroup parity profile',
    metricLabel: 'Holdout Accuracy',
    metricValue: 'R² 0.8538 · RMSE $4,765',
    targetCategory: 'Production ML & Evaluation',
    targetSearch: 'Health Insurance',
  },
  'm-pi': {
    id: 'm-pi',
    code: '05',
    title: '90% Prediction Intervals & Confidence Flagging',
    layer: 'Uncertainty Layer',
    summary:
      'Quantifies heteroscedastic prediction uncertainty into calibrated 90% intervals and flags high-variance edge cases (e.g., smoker + high BMI) instead of serving overconfident point guesses.',
    inputContract: 'Point prediction + local residual variance profile',
    outputGuarantee: 'Lower/upper 90% interval + automated review flag',
    metricLabel: 'Coverage Target',
    metricValue: '90% Calibrated PI',
    targetCategory: 'Production ML & Evaluation',
    targetSearch: 'Health Insurance',
  },
  'm-serve': {
    id: 'm-serve',
    code: '06',
    title: 'Django / Render & BI Decision Delivery',
    layer: 'Serving & Executive Layer',
    summary:
      'Ships production inference endpoints via Django on Render alongside interactive Tableau Public and Excel Pivot workbooks for immediate stakeholder decision-making.',
    inputContract: 'Serialized pipeline artifacts + semantic BI tables',
    outputGuarantee: 'Live web estimator & decision-ready dashboards',
    metricLabel: 'Shipped Artifacts',
    metricValue: '9 Production Systems',
    targetCategory: 'All (9)',
    targetSearch: '',
  },
};

interface SystemArchitectureDiagramProps {
  onJumpToPortfolio: (category: ProjectCategory, search?: string) => void;
}

export function SystemArchitectureDiagram({ onJumpToPortfolio }: SystemArchitectureDiagramProps) {
  const [mode, setMode] = useState<DiagramMode>('graph-rag');
  const [selectedGraphId, setSelectedGraphId] = useState<string>('g-subgraph');
  const [selectedPipelineId, setSelectedPipelineId] = useState<string>('m-eval');

  const activeSpec =
    mode === 'graph-rag'
      ? GRAPH_RAG_SPECS[selectedGraphId] ?? GRAPH_RAG_SPECS['g-subgraph']
      : ML_PIPELINE_SPECS[selectedPipelineId] ?? ML_PIPELINE_SPECS['m-eval'];

  const handleNodeKeyDown = (e: KeyboardEvent<SVGGElement>, onSelect: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <div className="rounded-2xl border border-white/[0.1] bg-[#0B0F17]/85 backdrop-blur-md shadow-[0_24px_60px_-20px_rgba(0,0,0,0.75)]">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          {mode === 'graph-rag' ? (
            <GitBranch className="h-4 w-4 text-amber-300" strokeWidth={1.75} aria-hidden="true" />
          ) : mode === 'feature-rag' ? (
            <BarChart3 className="h-4 w-4 text-amber-300" strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <Layers className="h-4 w-4 text-amber-300" strokeWidth={1.75} aria-hidden="true" />
          )}
          <div>
            <h3 className="font-display text-sm font-semibold text-white">
              {mode === 'graph-rag'
                ? 'Interactive Blueprint: Graph RAG & AI Evaluation Topology'
                : mode === 'feature-rag'
                ? 'Interactive Blueprint: 6-Column Feature Importance & Behavior Graph RAG'
                : 'Interactive Blueprint: End-to-End ML Pipeline & 90% PI Gate'}
            </h3>
            <p className="text-xs text-slate-400">
              {mode === 'feature-rag'
                ? 'Inspect how each insurance.csv column drives the 200-tree GradientBoostingRegressor predictions'
                : 'Resolution-independent SVG architecture · Select any node to inspect input/output contracts'}
            </p>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Architecture diagram mode"
          className="flex flex-wrap items-center gap-1 rounded-lg border border-white/[0.09] bg-[#080B12] p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'graph-rag'}
            onClick={() => setMode('graph-rag')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              mode === 'graph-rag'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
            }`}
          >
            Graph RAG &amp; Eval
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'feature-rag'}
            onClick={() => setMode('feature-rag')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              mode === 'feature-rag'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
            }`}
          >
            Feature Importance RAG
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'ml-pipeline'}
            onClick={() => setMode('ml-pipeline')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              mode === 'ml-pipeline'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
            }`}
          >
            ML &amp; Uncertainty DAG
          </button>
        </div>
      </div>

      {/* Main Split: Vector Diagram Canvas + Active Node Spec Panel */}
      {mode === 'feature-rag' ? (
        <FeatureBehaviorGraphRag
          embedded
          onInspectSimulator={() => onJumpToPortfolio('Production ML & Evaluation', 'Health Insurance')}
        />
      ) : (
      <div className="grid lg:grid-cols-12">
        {/* Vector SVG Canvas */}
        <div className="overflow-x-auto border-b border-white/[0.08] bg-[#080B12]/90 p-4 sm:p-6 lg:col-span-8 lg:border-b-0 lg:border-r">
          {mode === 'graph-rag' ? (
            <svg
              viewBox="0 0 820 380"
              className="h-auto w-full min-w-[620px] select-none"
              role="img"
              aria-label="Interactive Graph RAG knowledge graph and AI evaluation architecture diagram"
            >
              <defs>
                <marker
                  id="arrow-amber"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#F59E0B" />
                </marker>
                <marker
                  id="arrow-slate"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#64748B" />
                </marker>
                <marker
                  id="arrow-emerald"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#34D399" />
                </marker>
              </defs>

              {/* Left Panel: Entity Knowledge Graph Subgraph */}
              <g
                role="button"
                tabIndex={0}
                aria-label="Inspect Entity Knowledge Graph Subgraph"
                onClick={() => setSelectedGraphId('g-subgraph')}
                onKeyDown={(e) => handleNodeKeyDown(e, () => setSelectedGraphId('g-subgraph'))}
                className="cursor-pointer focus:outline-none"
              >
                <rect
                  x="14"
                  y="16"
                  width="374"
                  height="346"
                  rx="12"
                  fill="#0B0F17"
                  stroke={selectedGraphId === 'g-subgraph' ? '#F59E0B' : 'rgba(255,255,255,0.12)'}
                  strokeWidth={selectedGraphId === 'g-subgraph' ? 1.75 : 1}
                />
                <text
                  x="30"
                  y="40"
                  fill="#FBBF24"
                  fontSize="10.5"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="600"
                >
                  KG-01 · ENTITY KNOWLEDGE GRAPH
                </text>
                <text x="30" y="56" fill="#94A3B8" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
                  Multi-hop relational edges resolve exact anomaly provenance
                </text>

                {/* Graph Edges */}
                <line
                  x1="104"
                  y1="128"
                  x2="226"
                  y2="112"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                  markerEnd="url(#arrow-amber)"
                  className="svg-flow-line"
                />
                <line
                  x1="96"
                  y1="146"
                  x2="108"
                  y2="210"
                  stroke="#64748B"
                  strokeWidth="1.4"
                  markerEnd="url(#arrow-slate)"
                />
                <line
                  x1="278"
                  y1="130"
                  x2="296"
                  y2="206"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                  markerEnd="url(#arrow-amber)"
                  className="svg-flow-line"
                />
                <line
                  x1="158"
                  y1="230"
                  x2="244"
                  y2="230"
                  stroke="#F87171"
                  strokeWidth="1.4"
                  strokeDasharray="4 4"
                  markerEnd="url(#arrow-slate)"
                />
                <line
                  x1="128"
                  y1="252"
                  x2="180"
                  y2="296"
                  stroke="#64748B"
                  strokeWidth="1.4"
                  markerEnd="url(#arrow-slate)"
                />
                <line
                  x1="286"
                  y1="252"
                  x2="232"
                  y2="296"
                  stroke="#34D399"
                  strokeWidth="1.5"
                  markerEnd="url(#arrow-emerald)"
                />

                {/* Edge Label Pills (Clean SVG Rect Backdrops) */}
                <rect x="136" y="108" width="60" height="16" rx="4" fill="#080B12" stroke="rgba(255,255,255,0.1)" />
                <text x="166" y="119" textAnchor="middle" fill="#FDE68A" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
                  MATCHES
                </text>

                <rect x="167" y="219" width="62" height="16" rx="4" fill="#080B12" stroke="rgba(248,113,113,0.3)" />
                <text x="198" y="230" textAnchor="middle" fill="#FCA5A5" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
                  VIOLATES
                </text>

                <rect x="262" y="156" width="84" height="16" rx="4" fill="#080B12" stroke="rgba(255,255,255,0.1)" />
                <text x="304" y="167" textAnchor="middle" fill="#CBD5E1" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
                  ORIGINATES_IN
                </text>

                {/* Graph Nodes */}
                {/* Node 1: Query */}
                <rect x="34" y="96" width="96" height="48" rx="10" fill="#111827" stroke="#F59E0B" strokeWidth="1.4" />
                <text x="82" y="117" textAnchor="middle" fill="#F8FAFC" fontSize="11" fontWeight="600" fontFamily="Outfit, sans-serif">
                  Query Intent
                </text>
                <text x="82" y="133" textAnchor="middle" fill="#94A3B8" fontSize="9.5" fontFamily="JetBrains Mono, monospace">
                  Entity + Metric
                </text>

                {/* Node 2: Account Cluster */}
                <rect x="228" y="82" width="138" height="48" rx="10" fill="#111827" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" />
                <text x="297" y="103" textAnchor="middle" fill="#F8FAFC" fontSize="11" fontWeight="600" fontFamily="Outfit, sans-serif">
                  Account Cluster
                </text>
                <text x="297" y="119" textAnchor="middle" fill="#FBBF24" fontSize="9.5" fontFamily="JetBrains Mono, monospace">
                  793 Entities · 8 Flagged
                </text>

                {/* Node 3: Policy / Threshold */}
                <rect x="34" y="206" width="124" height="48" rx="10" fill="#111827" stroke="rgba(248,113,113,0.45)" strokeWidth="1.2" />
                <text x="96" y="227" textAnchor="middle" fill="#FECACA" fontSize="11" fontWeight="600" fontFamily="Outfit, sans-serif">
                  80% Discount Cap
                </text>
                <text x="96" y="243" textAnchor="middle" fill="#94A3B8" fontSize="9.5" fontFamily="JetBrains Mono, monospace">
                  300 Max Orders
                </text>

                {/* Node 4: Region Hub */}
                <rect x="246" y="206" width="122" height="48" rx="10" fill="#111827" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" />
                <text x="307" y="227" textAnchor="middle" fill="#F8FAFC" fontSize="11" fontWeight="600" fontFamily="Outfit, sans-serif">
                  Central Region
                </text>
                <text x="307" y="243" textAnchor="middle" fill="#FCA5A5" fontSize="9.5" fontFamily="JetBrains Mono, monospace">
                  31.9% Loss Rate
                </text>

                {/* Node 5: Evidence Anchor */}
                <rect x="114" y="294" width="184" height="48" rx="10" fill="#0F172A" stroke="#34D399" strokeWidth="1.3" />
                <text x="206" y="315" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="600" fontFamily="Outfit, sans-serif">
                  Verified Subgraph Context
                </text>
                <text x="206" y="331" textAnchor="middle" fill="#6EE7B7" fontSize="9.5" fontFamily="JetBrains Mono, monospace">
                  Profit $39,706 · Provenance ID
                </text>
              </g>

              {/* Bridge Data Flow Arrows (KG + Vector -> Fusion) */}
              <path
                d="M 388 156 L 440 156"
                stroke="#F59E0B"
                strokeWidth="1.75"
                fill="none"
                markerEnd="url(#arrow-amber)"
                className="svg-flow-line"
              />
              <path
                d="M 528 84 L 528 118"
                stroke="#38BDF8"
                strokeWidth="1.6"
                fill="none"
                markerEnd="url(#arrow-slate)"
                className="svg-flow-line"
              />
              <path
                d="M 612 156 L 638 156"
                stroke="#F59E0B"
                strokeWidth="1.75"
                fill="none"
                markerEnd="url(#arrow-amber)"
                className="svg-flow-line"
              />
              <path
                d="M 720 194 L 720 228"
                stroke="#34D399"
                strokeWidth="1.75"
                fill="none"
                markerEnd="url(#arrow-emerald)"
                className="svg-flow-line"
              />

              {/* Right Node 1: Dense Vector Index */}
              <g
                role="button"
                tabIndex={0}
                aria-label="Inspect Dense Semantic Vector Index"
                onClick={() => setSelectedGraphId('r-vector')}
                onKeyDown={(e) => handleNodeKeyDown(e, () => setSelectedGraphId('r-vector'))}
                className="cursor-pointer focus:outline-none"
              >
                <rect
                  x="444"
                  y="16"
                  width="360"
                  height="68"
                  rx="12"
                  fill="#0B0F17"
                  stroke={selectedGraphId === 'r-vector' ? '#F59E0B' : 'rgba(56,189,248,0.35)'}
                  strokeWidth={selectedGraphId === 'r-vector' ? 1.75 : 1.1}
                />
                <text x="462" y="40" fill="#7DD3FC" fontSize="10.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                  VR-02 · DENSE VECTOR INDEX
                </text>
                <text x="462" y="60" fill="#F8FAFC" fontSize="13" fontWeight="600" fontFamily="Outfit, sans-serif">
                  Top-K Semantic Chunks &amp; Policy Documents
                </text>
                <text x="786" y="40" textAnchor="end" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono, monospace">
                  Cosine Similarity
                </text>
              </g>

              {/* Right Node 2: Hybrid Fusion & Reranker */}
              <g
                role="button"
                tabIndex={0}
                aria-label="Inspect Subgraph and Vector Fusion Reranker"
                onClick={() => setSelectedGraphId('r-rerank')}
                onKeyDown={(e) => handleNodeKeyDown(e, () => setSelectedGraphId('r-rerank'))}
                className="cursor-pointer focus:outline-none"
              >
                <rect
                  x="444"
                  y="120"
                  width="168"
                  height="74"
                  rx="12"
                  fill="#0B0F17"
                  stroke={selectedGraphId === 'r-rerank' ? '#F59E0B' : 'rgba(255,255,255,0.15)'}
                  strokeWidth={selectedGraphId === 'r-rerank' ? 1.75 : 1.1}
                />
                <text x="458" y="142" fill="#FBBF24" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                  FX-03 · RRF FUSION
                </text>
                <text x="458" y="162" fill="#F8FAFC" fontSize="12.5" fontWeight="600" fontFamily="Outfit, sans-serif">
                  Hybrid Reranker
                </text>
                <text x="458" y="179" fill="#94A3B8" fontSize="10" fontFamily="Plus Jakarta Sans, sans-serif">
                  Prunes noisy hops
                </text>
              </g>

              {/* Right Node 3: Grounded Synthesis */}
              <g
                role="button"
                tabIndex={0}
                aria-label="Inspect Grounded Synthesis Engine"
                onClick={() => setSelectedGraphId('r-llm')}
                onKeyDown={(e) => handleNodeKeyDown(e, () => setSelectedGraphId('r-llm'))}
                className="cursor-pointer focus:outline-none"
              >
                <rect
                  x="642"
                  y="120"
                  width="162"
                  height="74"
                  rx="12"
                  fill="#0B0F17"
                  stroke={selectedGraphId === 'r-llm' ? '#F59E0B' : 'rgba(255,255,255,0.15)'}
                  strokeWidth={selectedGraphId === 'r-llm' ? 1.75 : 1.1}
                />
                <text x="656" y="142" fill="#FB923C" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                  GS-04 · SYNTHESIS
                </text>
                <text x="656" y="162" fill="#F8FAFC" fontSize="12.5" fontWeight="600" fontFamily="Outfit, sans-serif">
                  Cited Generation
                </text>
                <text x="656" y="179" fill="#94A3B8" fontSize="10" fontFamily="Plus Jakarta Sans, sans-serif">
                  Strict evidence schema
                </text>
              </g>

              {/* Right Node 4: AI Evaluation & Confidence Gate */}
              <g
                role="button"
                tabIndex={0}
                aria-label="Inspect AI Evaluation and Confidence Guardrail Gate"
                onClick={() => setSelectedGraphId('r-eval')}
                onKeyDown={(e) => handleNodeKeyDown(e, () => setSelectedGraphId('r-eval'))}
                className="cursor-pointer focus:outline-none"
              >
                <rect
                  x="444"
                  y="232"
                  width="360"
                  height="130"
                  rx="12"
                  fill="#0D1420"
                  stroke={selectedGraphId === 'r-eval' ? '#F59E0B' : 'rgba(52,211,153,0.45)'}
                  strokeWidth={selectedGraphId === 'r-eval' ? 1.75 : 1.2}
                />
                <text x="462" y="256" fill="#6EE7B7" fontSize="10.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                  EV-05 · AI EVALUATION &amp; CONFIDENCE GATE
                </text>
                <text x="462" y="276" fill="#FFFFFF" fontSize="13.5" fontWeight="600" fontFamily="Outfit, sans-serif">
                  Factual Accuracy, Interval Calibration &amp; Bias Check
                </text>

                {/* Mini Verification Sub-cells inside EV-05 */}
                <rect x="462" y="294" width="102" height="52" rx="8" fill="#080B12" stroke="rgba(255,255,255,0.1)" />
                <text x="472" y="314" fill="#94A3B8" fontSize="9.5" fontFamily="Plus Jakarta Sans, sans-serif">
                  Faithfulness
                </text>
                <text x="472" y="333" fill="#FFFFFF" fontSize="11" fontWeight="600" fontFamily="JetBrains Mono, monospace">
                  Graph-Verified
                </text>

                <rect x="573" y="294" width="102" height="52" rx="8" fill="#080B12" stroke="rgba(255,255,255,0.1)" />
                <text x="583" y="314" fill="#94A3B8" fontSize="9.5" fontFamily="Plus Jakarta Sans, sans-serif">
                  Uncertainty
                </text>
                <text x="583" y="333" fill="#FBBF24" fontSize="11" fontWeight="600" fontFamily="JetBrains Mono, monospace">
                  90% PI Envelope
                </text>

                <rect x="684" y="294" width="102" height="52" rx="8" fill="#080B12" stroke="rgba(255,255,255,0.1)" />
                <text x="694" y="314" fill="#94A3B8" fontSize="9.5" fontFamily="Plus Jakarta Sans, sans-serif">
                  Edge Guardrail
                </text>
                <text x="694" y="333" fill="#FCA5A5" fontSize="11" fontWeight="600" fontFamily="JetBrains Mono, monospace">
                  Low-Conf Flag
                </text>
              </g>
            </svg>
          ) : (
            <svg
              viewBox="0 0 820 380"
              className="h-auto w-full min-w-[620px] select-none"
              role="img"
              aria-label="Interactive end-to-end ML pipeline and 90% prediction interval architecture diagram"
            >
              <defs>
                <marker
                  id="ml-arrow-amber"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#F59E0B" />
                </marker>
                <marker
                  id="ml-arrow-emerald"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#34D399" />
                </marker>
              </defs>

              {/* Connecting DAG Flow Lines */}
              {/* 01 -> 02 */}
              <path
                d="M 254 96 L 292 96"
                stroke="#F59E0B"
                strokeWidth="1.75"
                fill="none"
                markerEnd="url(#ml-arrow-amber)"
                className="svg-flow-line"
              />
              {/* 02 -> 03 */}
              <path
                d="M 526 96 L 564 96"
                stroke="#F59E0B"
                strokeWidth="1.75"
                fill="none"
                markerEnd="url(#ml-arrow-amber)"
                className="svg-flow-line"
              />
              {/* 03 -> 04 (clean S-curve return down to row 2) */}
              <path
                d="M 682 146 L 682 178 L 138 178 L 138 214"
                stroke="#F59E0B"
                strokeWidth="1.75"
                fill="none"
                markerEnd="url(#ml-arrow-amber)"
                className="svg-flow-line"
              />
              {/* 04 -> 05 */}
              <path
                d="M 254 274 L 292 274"
                stroke="#34D399"
                strokeWidth="1.75"
                fill="none"
                markerEnd="url(#ml-arrow-emerald)"
                className="svg-flow-line"
              />
              {/* 05 -> 06 */}
              <path
                d="M 526 274 L 564 274"
                stroke="#34D399"
                strokeWidth="1.75"
                fill="none"
                markerEnd="url(#ml-arrow-emerald)"
                className="svg-flow-line"
              />

              {[
                {
                  id: 'm-ingest',
                  x: 24,
                  y: 42,
                  code: '01 · DATA CONTRACTS',
                  title: 'SQL & Feature Ingestion',
                  sub: 'Temporal lags · Schema checks',
                  badge: '9,994+ Records Audited',
                  accent: '#FBBF24',
                },
                {
                  id: 'm-clean',
                  x: 296,
                  y: 42,
                  code: '02 · INTEGRITY',
                  title: 'Leak-Free Preprocessing',
                  sub: 'Split isolation · Bounds profiling',
                  badge: 'Zero Target Leakage',
                  accent: '#FBBF24',
                },
                {
                  id: 'm-model',
                  x: 568,
                  y: 42,
                  code: '03 · ESTIMATION',
                  title: 'ML & Clustering Fit',
                  sub: 'Regression · XGBoost · Ward',
                  badge: 'Cross-Validated',
                  accent: '#FB923C',
                },
                {
                  id: 'm-eval',
                  x: 24,
                  y: 218,
                  code: '04 · EVALUATION',
                  title: 'Holdout Residual Audit',
                  sub: 'Subgroup parity · Benchmarks',
                  badge: 'R² 0.8538 · RMSE $4,765',
                  accent: '#6EE7B7',
                },
                {
                  id: 'm-pi',
                  x: 296,
                  y: 218,
                  code: '05 · UNCERTAINTY',
                  title: '90% PI & Confidence Flag',
                  sub: 'Variance bands · Edge alerts',
                  badge: '90% Coverage Envelope',
                  accent: '#FBBF24',
                },
                {
                  id: 'm-serve',
                  x: 568,
                  y: 218,
                  code: '06 · SERVING & BI',
                  title: 'Django / Render & BI',
                  sub: 'Live endpoints · Tableau / Excel',
                  badge: '9 Production Deliverables',
                  accent: '#6EE7B7',
                },
              ].map((node) => {
                const isSelected = selectedPipelineId === node.id;
                return (
                  <g
                    key={node.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`Inspect ${node.title}`}
                    onClick={() => setSelectedPipelineId(node.id)}
                    onKeyDown={(e) => handleNodeKeyDown(e, () => setSelectedPipelineId(node.id))}
                    className="cursor-pointer focus:outline-none"
                  >
                    <rect
                      x={node.x}
                      y={node.y}
                      width="228"
                      height="104"
                      rx="12"
                      fill="#0B0F17"
                      stroke={isSelected ? '#F59E0B' : 'rgba(255,255,255,0.14)'}
                      strokeWidth={isSelected ? 1.8 : 1.1}
                    />
                    <text
                      x={node.x + 16}
                      y={node.y + 24}
                      fill={node.accent}
                      fontSize="10"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="600"
                    >
                      {node.code}
                    </text>
                    <text
                      x={node.x + 16}
                      y={node.y + 47}
                      fill="#FFFFFF"
                      fontSize="13.5"
                      fontWeight="600"
                      fontFamily="Outfit, sans-serif"
                    >
                      {node.title}
                    </text>
                    <text
                      x={node.x + 16}
                      y={node.y + 66}
                      fill="#94A3B8"
                      fontSize="10.5"
                      fontFamily="Plus Jakarta Sans, sans-serif"
                    >
                      {node.sub}
                    </text>
                    <line
                      x1={node.x + 16}
                      y1={node.y + 78}
                      x2={node.x + 212}
                      y2={node.y + 78}
                      stroke="rgba(255,255,255,0.08)"
                    />
                    <text
                      x={node.x + 16}
                      y={node.y + 94}
                      fill="#E2E8F0"
                      fontSize="10"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {node.badge}
                    </text>
                  </g>
                );
              })}
            </svg>
          )}
        </div>

        {/* Right Column: Interactive Node Specification Inspector */}
        <div className="flex flex-col justify-between p-5 sm:p-6 lg:col-span-4">
          <div>
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-mono font-semibold text-amber-300">
                {activeSpec.code} · {activeSpec.layer}
              </span>
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" strokeWidth={1.75} aria-hidden="true" />
            </div>

            <h4 className="mt-2 font-display text-lg font-semibold text-white">
              {activeSpec.title}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              {activeSpec.summary}
            </p>

            <dl className="mt-5 space-y-3 border-t border-white/[0.08] pt-4 text-xs">
              <div>
                <dt className="font-medium text-slate-400">Input Contract</dt>
                <dd className="mt-0.5 text-slate-200">{activeSpec.inputContract}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-400">Output Guarantee</dt>
                <dd className="mt-0.5 text-slate-200">{activeSpec.outputGuarantee}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-400">{activeSpec.metricLabel}</dt>
                <dd className="mt-0.5 font-mono font-semibold text-amber-200 tabular-nums">
                  {activeSpec.metricValue}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-6 border-t border-white/[0.08] pt-4">
            <button
              type="button"
              onClick={() => onJumpToPortfolio(activeSpec.targetCategory, activeSpec.targetSearch)}
              className="inline-flex min-h-[40px] w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:from-amber-400 hover:to-orange-500"
            >
              Inspect Matching Portfolio Deliverable
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
