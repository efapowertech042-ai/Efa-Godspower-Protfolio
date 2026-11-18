import { ArrowRight, ExternalLink } from 'lucide-react';
import {
  CANONICAL_URLS,
  COMPETENCY_MATRIX,
  EFA_PORTRAIT_IMAGE,
  ProjectCategory,
  RoutePath,
  TECH_STACK_GROUPS,
} from '../data/portfolioData';
import { SafeImage } from '../components/SafeImage';

interface HomePageProps {
  onNavigate: (route: RoutePath) => void;
  onJumpToPortfolio: (category: ProjectCategory, search?: string) => void;
}

const VERIFIED_HERO_METRICS = [
  {
    value: '0.8816 R²',
    label: 'Health Insurance Charges Predictor (RMSE $4,665 · MAE $2,402 · 90% PI)',
  },
  {
    value: '9,994 Orders',
    label: 'Segmented via Agglomerative Clustering across 793 retail accounts',
  },
  {
    value: '$39,706',
    label: 'Central Region profit isolated with 300 max-discount (80%) orders',
  },
  {
    value: '7 Flagship',
    label: 'Production ML deployments, SQL pipelines & Tableau Public dashboards',
  },
];

const ML_ENGINEERING_PILLARS = [
  {
    index: '01',
    title: 'Data Contracts & Feature Pipelines',
    stack: 'SQL · Pandas · NumPy · Schema Validation',
    summary:
      'Constructs leak-free training and inference pipelines with automated schema assertions, temporal lag features, and reproducible preprocessing prior to model fitting.',
    proofTitle: 'Global Retail Sales Intelligence',
    actionLabel: 'Inspect Sales Pipeline',
    category: 'Fraud & Forecasting' as ProjectCategory,
    search: 'Global Retail',
  },
  {
    index: '02',
    title: 'Calibration, Intervals & Error Auditing',
    stack: 'Scikit-learn · Cross-Validation · 90% PI · Django',
    summary:
      'Evaluates models beyond aggregate R²—auditing subgroup residuals, benchmarking against baselines, calibrating 90% prediction intervals, and flagging low-confidence edge inputs.',
    proofTitle: 'Health Insurance Charges Predictor (Render)',
    actionLabel: 'Try Live ML Simulator',
    category: 'Production ML & Evaluation' as ProjectCategory,
    search: 'Health Insurance',
  },
  {
    index: '03',
    title: 'Unsupervised Discovery & Serving',
    stack: 'Hierarchical Clustering · Anomaly Isolation · Render',
    summary:
      'Applies unsupervised clustering and statistical anomaly detection to uncover hidden margin leakage, then ships interpretable outputs via Django apps and BI semantic layers.',
    proofTitle: 'Discount or Deceit? Fraud Clustering',
    actionLabel: 'Inspect Fraud Isolation',
    category: 'Fraud & Forecasting' as ProjectCategory,
    search: 'Discount',
  },
];

export function HomePage({ onNavigate, onJumpToPortfolio }: HomePageProps) {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      {/* Executive Split Hero */}
      <section className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col justify-between lg:col-span-7">
          <div>
            <p className="font-mono text-xs tracking-wide text-amber-300">
              Machine Learning Engineer · Data Scientist · AI/ML Evaluation
            </p>
            <h1
              className="mt-4 font-display font-bold tracking-tight text-white text-balance"
              style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', lineHeight: 1.08 }}
            >
              Efa Godspower
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-slate-100 sm:text-xl">
              Data Scientist | AI/ML Performance Evaluation | Predictive Analytics &amp; Insight-Driven Dashboards | Delivering Clear, Reliable Business Intelligence
            </p>
            <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-slate-300">
              Engineering production machine learning systems from validated SQL feature pipelines to deployed, uncertainty-aware inference services—bridging statistical model evaluation with executive business intelligence.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onJumpToPortfolio('All (7)', '')}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/40 transition-all hover:from-amber-400 hover:to-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 whitespace-nowrap shrink-0"
            >
              View My Portfolio
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('/resume')}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/[0.14] bg-[#0B0F17]/85 backdrop-blur-md px-5 py-2.5 text-sm font-semibold text-slate-100 transition-colors hover:border-amber-400/50 hover:bg-[#111724] whitespace-nowrap shrink-0"
            >
              View Resume
            </button>

            <a
              href={CANONICAL_URLS.githubProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-1.5 px-2 text-sm font-medium text-amber-300 transition-colors hover:text-orange-300 whitespace-nowrap shrink-0"
            >
              GitHub
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Executive Portrait Visual Frame */}
        <div className="flex items-center lg:col-span-5 lg:justify-end">
          <div className="relative aspect-square w-full max-w-[480px] overflow-hidden rounded-2xl border border-white/[0.14] bg-[#0B0F17] shadow-[0_24px_80px_-20px_rgba(245,158,11,0.18)]">
            <SafeImage
              src={EFA_PORTRAIT_IMAGE}
              alt="Efa Godspower — Machine Learning Engineer and Data Scientist"
              fallbackTitle="Efa Godspower"
              fallbackSubtitle="Machine Learning Engineer · Data Scientist · AI/ML Evaluation"
              variant="hero"
              className="h-full w-full"
              imgClassName="object-cover object-top"
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#05070B]/95 via-[#05070B]/60 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <p className="font-display text-base font-semibold text-white">
                Efa Godspower
              </p>
              <p className="mt-0.5 text-xs text-amber-200">
                Machine Learning Engineer · AI/ML Performance Evaluation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Width Verified Metrics Strip */}
      <section
        aria-label="Verified Portfolio Impact Metrics"
        className="mt-12 grid grid-cols-1 divide-y divide-white/[0.08] rounded-xl border border-white/[0.1] bg-[#0B0F17]/85 backdrop-blur-md shadow-[0_20px_50px_-15px_rgba(0,0,0,0.75)] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4"
      >
        {VERIFIED_HERO_METRICS.map((item) => (
          <div key={item.value} className="p-5 sm:p-6">
            <p className="font-display text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-amber-100 to-orange-300 bg-clip-text text-transparent tabular-nums">
              {item.value}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-300">{item.label}</p>
          </div>
        ))}
      </section>

      {/* 01. About Me & AI/ML Evaluation Specialty */}
      <section className="mt-16 border-t border-white/[0.08] pt-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs text-amber-300">01. Engineering Philosophy</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl text-balance">
              Full-Lifecycle ML Engineering &amp; Model Evaluation
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Production machine learning demands more than high training scores—it requires calibrated uncertainty, subgroup fairness checks, and reproducible serving.
            </p>
          </div>

          <div className="space-y-6 lg:col-span-7">
            <div className="space-y-4 text-base leading-relaxed text-slate-200">
              <p>
                Machine Learning Engineer, Data Scientist, Business Intelligence (BI) Professional, and AI Evaluation Specialist transforming complex data into intelligent business decisions across the full lifecycle: data acquisition, cleaning, exploratory data analysis (EDA), predictive modeling, model evaluation, deployment readiness, and executive BI reporting.
              </p>
              <p>
                Specializes in AI &amp; ML evaluation: rigorous validation strategies, performance metrics, error analysis, model benchmarking, bias reduction, and assessing model outputs for quality, consistency, factual accuracy, and real-world applicability.
              </p>
            </div>

            {/* Clean Unboxed Core Tech Stack Matrix */}
            <div className="border-t border-white/[0.08] pt-6">
              <h3 className="text-xs font-semibold tracking-wide text-orange-300">
                Production ML &amp; Analytics Stack
              </h3>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                {TECH_STACK_GROUPS.map((group) => (
                  <div key={group.group} className="space-y-1">
                    <dt className="text-sm font-semibold text-white">{group.group}</dt>
                    <dd className="text-xs leading-relaxed text-slate-300">
                      {group.items.join(' · ')}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* 02. Production ML Engineering Architecture */}
      <section className="mt-16 border-t border-white/[0.08] pt-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-amber-300">02. ML Systems Architecture</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              How Models Move from Raw Data to Production
            </h2>
          </div>
          <a
            href="https://health-insurance-ml-project.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-300 hover:text-orange-300 transition-colors whitespace-nowrap shrink-0"
          >
            Launch Live Render ML App
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {ML_ENGINEERING_PILLARS.map((stage) => (
            <div
              key={stage.index}
              className="flex flex-col justify-between rounded-xl border border-white/[0.09] bg-[#0B0F17]/85 backdrop-blur-md p-6"
            >
              <div>
                <span className="font-mono text-xs text-orange-300">
                  Stage {stage.index} · {stage.stack}
                </span>
                <h3 className="mt-2.5 font-display text-lg font-semibold text-white">
                  {stage.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                  {stage.summary}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
                <span className="text-xs font-medium text-slate-300 truncate">
                  {stage.proofTitle}
                </span>
                <button
                  type="button"
                  onClick={() => onJumpToPortfolio(stage.category, stage.search)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-amber-300 hover:text-orange-300 transition-colors whitespace-nowrap shrink-0"
                >
                  {stage.actionLabel}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03. Interactive "Connect the Dots" Competency Matrix */}
      <section className="mt-16 border-t border-white/[0.08] pt-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-amber-300">03. Connect the Dots</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Competency-to-Proof Matrix
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Select any positioning pillar below to open the filtered portfolio deliverables that substantiate it.
            </p>
          </div>
          <a
            href="/portfolio"
            onClick={(e) => {
              e.preventDefault();
              onJumpToPortfolio('All (7)', '');
            }}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-300 hover:text-orange-300 transition-colors whitespace-nowrap shrink-0"
          >
            Explore all 7 projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {COMPETENCY_MATRIX.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onJumpToPortfolio(item.targetCategory, item.targetSearch)}
              className="group flex flex-col justify-between rounded-xl border border-white/[0.09] bg-[#0B0F17]/85 backdrop-blur-md p-6 text-left transition-all duration-150 hover:border-amber-400/50 hover:bg-[#101622]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <div>
                <div className="flex items-center justify-between gap-3 text-xs text-slate-300">
                  <span className="font-mono text-orange-300">0{idx + 1} · {item.targetCategory}</span>
                  <ArrowRight
                    className="h-4 w-4 text-slate-400 transition-transform duration-150 group-hover:translate-x-1 group-hover:text-amber-300"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-white group-hover:text-amber-200 transition-colors">
                  {item.pillar}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {item.competencies}
                </p>
              </div>

              <div className="mt-5 border-t border-white/[0.08] pt-4">
                <p className="text-xs font-medium text-amber-200">
                  Connected Proof-of-Work
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-300">
                  {item.proofSummary}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
