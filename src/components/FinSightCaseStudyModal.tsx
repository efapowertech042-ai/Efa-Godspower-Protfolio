import { useEffect, useState } from 'react';
import { ExternalLink, X, ArrowRight } from 'lucide-react';
import { FinSightArchitectureVisual } from './FinSightArchitectureVisual';

interface FinSightCaseStudyModalProps {
  open: boolean;
  onClose: () => void;
}

const OPTIMIZATION_BENCHMARKS = [
  {
    metric: 'Python Serverless Footprint',
    before: '~1.3 GB',
    after: '~167 MB',
    delta: '-87% image weight',
    detail: 'Replaced heavy scientific binaries with pure-NumPy lightweight_ml.py.',
  },
  {
    metric: 'Cold Import Latency',
    before: '28.6s',
    after: '~1.2s',
    delta: '23.8× faster',
    detail: 'Zero heavy framework warm-up penalty on Vercel FastAPI functions.',
  },
  {
    metric: 'Frontend Initial Bundle',
    before: '~3 MB',
    after: '~100 KB',
    delta: '-96.7% payload',
    detail: 'Route-level and chart code-splitting across Vite + React + Recharts.',
  },
];

const FEATURE_MODULES = [
  {
    id: 'audit',
    code: '01',
    title: 'Automated Data Audit & Feature Engineering',
    subtitle: 'Schema validation, accounting reconciliation & 16 leak-free point-in-time features',
    summary:
      'Validates uploaded CSV/Excel financial ledgers via pandas/openpyxl, recalculates revenue, COGS, OpEx, and operating profit identities, and constructs 16 strictly point-in-time lagged and seasonal features with zero future leakage.',
    specs: [
      { label: 'Ingestion Formats', value: 'CSV · Excel (openpyxl)' },
      { label: 'Feature Set', value: '16 Lagged & Seasonal Signals' },
      { label: 'Temporal Guard', value: 'Point-in-Time Leak-Free' },
    ],
  },
  {
    id: 'forecast',
    code: '02',
    title: '2030 Forecasting Centre & Hypothesis Testing Lab',
    subtitle: '11-model chronological tournament + 6 automated statistical significance tests',
    summary:
      'Benchmarks 11 statistical and ML estimators—including Seasonal Exponential Smoothing ETS(M,N,M), Holt-Winters Damped, Random Forest, Gradient Boosting, Ridge, AR, and Naive baselines—across an untouched 18-month holdout and 4 rolling-origin backtests, paired with 6 automated hypothesis tests.',
    specs: [
      { label: 'Models Benchmarked', value: '11 (ETS · HW · RF · GBR · Ridge · AR)' },
      { label: 'Validation Protocol', value: '18-Mo Holdout + 4 Rolling Origins' },
      {
        label: '6 Hypothesis Tests',
        value: 'Mann-Kendall · Kruskal-Wallis/ANOVA · Spearman/Pearson · Mann-Whitney · HLN Diebold-Mariano · FX Shock',
      },
    ],
  },
  {
    id: 'simulator',
    code: '03',
    title: 'Interactive Scenario & 5-Year Accounting Simulator',
    subtitle: 'Synchronized macroeconomic faders with cumulative profit waterfall attribution',
    summary:
      'Lets finance teams stress-test USD/NGN FX shocks, domestic inflation pass-through, unit volume trajectories, unit pricing adjustments, and OpEx growth via live synchronized sliders with transparent cumulative operating profit waterfall attribution.',
    specs: [
      { label: 'Forecast Horizon', value: 'Monthly Through Dec 2030' },
      { label: 'Driver Controls', value: 'FX · Inflation · Volume · Price · OpEx' },
      { label: 'Attribution View', value: 'Cumulative Profit Waterfall' },
    ],
  },
  {
    id: 'shap',
    code: '04',
    title: 'Explainable AI (SHAP) & Anomaly Detection',
    subtitle: 'Exact LinearSHAP & Lundberg TreeSHAP + Isolation Forest drift guardrails',
    summary:
      'Computes exact LinearSHAP and Lundberg TreeSHAP global and per-month local attributions directly in pure NumPy—identifying exactly how FX swings, COGS, and OpEx shift predicted margins—paired with Isolation Forest anomaly detection and distribution drift monitoring.',
    specs: [
      { label: 'Attribution Engine', value: 'Exact TreeSHAP & LinearSHAP' },
      { label: 'Outlier & Drift Layer', value: 'Isolation Forest + Drift Monitor' },
      { label: 'Auditability', value: 'Row-Level Additive Explanations' },
    ],
  },
  {
    id: 'rag',
    code: '05',
    title: 'Graphical RAG Analyst & Executive Reporting',
    subtitle: 'Dataset-grounded Q&A, Gemini synthesis & one-click CSV / PDF exports',
    summary:
      'Combines retrieval-grounded natural-language Q&A anchored directly in historical ledger rows and forecast tables (with optional server-side Gemini API synthesis) alongside one-click CSV data downloads and jsPDF executive board reports.',
    specs: [
      { label: 'Grounding Source', value: 'Verified Ledger & Forecast Rows' },
      { label: 'LLM Synthesis', value: 'Server-Side Gemini API' },
      { label: 'Deliverable Exports', value: 'One-Click CSV & jsPDF Reports' },
    ],
  },
];

const STACK_LAYERS = [
  {
    layer: 'Frontend',
    items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Recharts', 'Lucide Icons', 'jsPDF'],
  },
  {
    layer: 'Backend & ML',
    items: [
      'Python',
      'FastAPI',
      'NumPy',
      'Pandas',
      'Custom Pure-NumPy ML / ETS / Exact SHAP Engine',
      'Gemini API',
    ],
  },
  {
    layer: 'Deployment',
    items: ['Vercel Multi-Service Architecture (vite frontend + fastapi backend)'],
  },
];

export function FinSightCaseStudyModal({ open, onClose }: FinSightCaseStudyModalProps) {
  const [activeFeatureIdx, setActiveFeatureIdx] = useState(0);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const activeFeature = FEATURE_MODULES[activeFeatureIdx];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="finsight-case-study-title"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-white/[0.12] bg-[#0B0F17] p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <p className="font-mono text-xs text-amber-300">
              Case Study 09 · Deployed Live on Vercel (Multi-Service Vite + FastAPI)
            </p>
            <h3
              id="finsight-case-study-title"
              className="mt-1.5 font-display text-xl font-bold tracking-tight text-white sm:text-2xl text-balance"
            >
              FinSight Financial Intelligence — Operating Profit Prediction, 2030 Forecasting &amp; Explainable AI Platform
            </h3>
            <p className="mt-2 text-xs text-slate-300">
              Full-Stack AI &amp; Data Science · Financial Analytics · FastAPI · React / TypeScript · Explainable AI (SHAP) · Time-Series Forecasting
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close FinSight case study modal"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.04] text-slate-300 transition-colors hover:bg-white/[0.1] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Action Links */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href="https://finsight-financial-intelligence.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:from-amber-400 hover:to-orange-500 whitespace-nowrap shrink-0"
          >
            Launch Live Platform
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <a
            href="https://github.com/efapowertech042-ai/FinSight-Financial-Intelligence"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/[0.14] bg-white/[0.04] px-4 py-2 text-xs font-semibold text-slate-100 transition-colors hover:border-amber-400/50 hover:bg-white/[0.08] whitespace-nowrap shrink-0"
          >
            GitHub Repository
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        {/* Problem & Engineering Architecture + SVG Diagram */}
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            <div className="border-b border-white/[0.08] pb-4">
              <p className="font-mono text-xs font-semibold text-amber-300">01 · Business Challenge</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
                Volatile USD/NGN FX depreciation and inflation swings make static spreadsheet budgeting unreliable for margin protection and multi-year financial planning across 10 years of operational and macroeconomic history.
              </p>
            </div>

            <div className="border-b border-white/[0.08] pb-4">
              <p className="font-mono text-xs font-semibold text-orange-300">02 · Technical Architecture</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
                Built a decoupled React + TypeScript + Tailwind + Recharts frontend paired with a Python FastAPI ML backend deployed as Vercel Services—uniting automated ledger auditing, 2030 forecasting, exact SHAP explanations, and retrieval-grounded RAG Q&amp;A.
              </p>
            </div>

            <div>
              <p className="font-mono text-xs font-semibold text-emerald-300">
                03 · Serverless Engineering Optimization
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
                Engineered a custom pure-NumPy ML, ETS/Holt-Winters time-series, statistical testing, and exact TreeSHAP/LinearSHAP module (<code className="font-mono text-xs text-amber-200">lightweight_ml.py</code>) to eliminate heavy scientific dependencies.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-xl border border-white/[0.1] bg-[#060910] aspect-[1280/719]">
              <FinSightArchitectureVisual />
            </div>
          </div>
        </div>

        {/* Serverless Performance Benchmark Strip */}
        <div className="mt-6 grid gap-4 border-y border-white/[0.08] py-5 md:grid-cols-3">
          {OPTIMIZATION_BENCHMARKS.map((item) => (
            <div key={item.metric} className="rounded-xl border border-white/[0.08] bg-[#080B12]/90 p-4">
              <p className="text-xs font-medium text-slate-400">{item.metric}</p>
              <div className="mt-1.5 flex items-baseline gap-2 font-mono tabular-nums">
                <span className="text-xs text-slate-400 line-through">{item.before}</span>
                <ArrowRight className="h-3 w-3 text-amber-400 shrink-0" aria-hidden="true" />
                <span className="text-lg font-bold text-white">{item.after}</span>
              </div>
              <p className="mt-1 font-mono text-xs text-emerald-300">{item.delta}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-300">{item.detail}</p>
            </div>
          ))}
        </div>

        {/* 5 Key Features Interactive Inspector */}
        <div className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="font-display text-sm font-semibold text-white">
              Core Platform Modules Implemented (5 End-to-End Capabilities)
            </h4>
            <span className="font-mono text-xs text-slate-400">
              Select a module to inspect engineering specifications
            </span>
          </div>

          <div
            role="tablist"
            aria-label="FinSight platform capabilities"
            className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5"
          >
            {FEATURE_MODULES.map((mod, idx) => {
              const active = idx === activeFeatureIdx;
              return (
                <button
                  key={mod.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveFeatureIdx(idx)}
                  className={`rounded-lg border px-3 py-2.5 text-left transition-colors ${
                    active
                      ? 'border-amber-400/70 bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-white'
                      : 'border-white/[0.09] bg-[#080B12] text-slate-300 hover:border-white/25 hover:text-white'
                  }`}
                >
                  <span className="block font-mono text-[11px] text-amber-300">{mod.code}</span>
                  <span className="mt-0.5 block text-xs font-semibold truncate">{mod.title}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-xl border border-white/[0.08] bg-[#080B12]/90 p-5">
            <p className="font-mono text-xs text-amber-300">
              Module {activeFeature.code} · {activeFeature.subtitle}
            </p>
            <h5 className="mt-1 font-display text-base font-semibold text-white">
              {activeFeature.title}
            </h5>
            <p className="mt-2 text-sm leading-relaxed text-slate-200">{activeFeature.summary}</p>

            <dl className="mt-4 grid gap-3 border-t border-white/[0.08] pt-4 sm:grid-cols-3">
              {activeFeature.specs.map((spec) => (
                <div key={spec.label}>
                  <dt className="text-[11px] font-medium text-slate-400">{spec.label}</dt>
                  <dd className="mt-0.5 font-mono text-xs font-semibold text-white">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Full Tech Stack Breakdown */}
        <div className="mt-6 border-t border-white/[0.08] pt-5">
          <h4 className="font-display text-sm font-semibold text-white">Production Tech Stack</h4>
          <dl className="mt-3 grid gap-4 sm:grid-cols-3">
            {STACK_LAYERS.map((group) => (
              <div key={group.layer}>
                <dt className="font-mono text-xs font-semibold text-amber-300">{group.layer}</dt>
                <dd className="mt-1 text-xs leading-relaxed text-slate-300">
                  {group.items.join(' · ')}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
