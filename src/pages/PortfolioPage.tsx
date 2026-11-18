import { useState, useMemo } from 'react';
import { ExternalLink, ChevronDown, ChevronUp, BarChart2, RotateCcw } from 'lucide-react';
import {
  CANONICAL_URLS,
  PIPELINE_STAGES,
  ProjectCategory,
  ProjectItem,
  PROJECTS,
} from '../data/portfolioData';
import { SafeImage } from '../components/SafeImage';
import { InsuranceSimulator } from '../components/InsuranceSimulator';
import { FraudAnomalyChart } from '../components/FraudAnomalyChart';
import { CaseStudyModal } from '../components/CaseStudyModal';

interface PortfolioPageProps {
  activeCategory: ProjectCategory;
  onCategoryChange: (cat: ProjectCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const CATEGORIES: ProjectCategory[] = [
  'All (7)',
  'Production ML & Evaluation',
  'Fraud & Forecasting',
  'BI & Tableau Dashboards',
];

export function PortfolioPage({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: PortfolioPageProps) {
  const [activePipelineStep, setActivePipelineStep] = useState(3);
  const [showFraudChart, setShowFraudChart] = useState(true);
  const [modalMode, setModalMode] = useState<'logistics' | 'realestate' | null>(null);

  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PROJECTS.filter((project) => {
      const matchesCat =
        activeCategory === 'All (7)' || project.category === activeCategory;
      if (!matchesCat) return false;
      if (!q) return true;

      const haystack = [
        project.title,
        project.subtitle,
        project.description,
        project.domain,
        project.category,
        ...project.techStack,
        ...project.highlights,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [activeCategory, searchQuery]);

  const featuredProject = filteredProjects.find((p) => p.featured);
  const standardProjects = filteredProjects.filter((p) => !p.featured);

  const renderProjectLinks = (project: ProjectItem) => (
    <div className="flex flex-wrap items-center gap-3">
      {project.links.liveDemo && (
        <a
          href={project.links.liveDemo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:from-amber-400 hover:to-orange-500 whitespace-nowrap shrink-0"
        >
          Site Demo
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      )}

      {project.links.tableau && (
        <a
          href={project.links.tableau}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:from-amber-400 hover:to-orange-500 whitespace-nowrap shrink-0"
        >
          Tableau Public Dashboard
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      )}

      {project.links.github && (
        <a
          href={project.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/[0.14] bg-white/[0.04] px-4 py-2 text-xs font-semibold text-slate-100 transition-colors hover:border-amber-400/50 hover:bg-white/[0.08] whitespace-nowrap shrink-0"
        >
          GitHub Repository
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      )}

      {project.interactiveType === 'logistics-modal' && (
        <button
          type="button"
          onClick={() => setModalMode('logistics')}
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:from-amber-400 hover:to-orange-500 whitespace-nowrap shrink-0"
        >
          <BarChart2 className="h-3.5 w-3.5" aria-hidden="true" />
          Inspect Dashboard Case Study
        </button>
      )}

      {project.interactiveType === 'realestate-modal' && (
        <button
          type="button"
          onClick={() => setModalMode('realestate')}
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:from-amber-400 hover:to-orange-500 whitespace-nowrap shrink-0"
        >
          <BarChart2 className="h-3.5 w-3.5" aria-hidden="true" />
          Inspect Assessment Ratio Analysis
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      {/* Page Header & Category Controls */}
      <div className="flex flex-col gap-6 border-b border-white/[0.08] pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono text-xs text-amber-300">Portfolio · 7 Flagship Deliverables</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Production ML, Fraud Clustering &amp; BI Systems
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
            Every system below connects raw data engineering and rigorous validation to deployed web applications, GitHub repositories, and interactive Tableau Public workbooks.
          </p>
        </div>

        <a
          href={CANONICAL_URLS.portfolio}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-300 transition-colors hover:text-orange-300 whitespace-nowrap shrink-0"
        >
          Original Google Sites Portfolio
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>

      {/* Category Filter Segmented Bar */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Filter projects by discipline"
          className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/[0.09] bg-[#0B0F17]/85 backdrop-blur-md p-1.5"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => onCategoryChange(category)}
                className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                    : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <p className="font-mono text-xs text-slate-300 tabular-nums">
          Showing {filteredProjects.length} of {PROJECTS.length} projects
          {searchQuery.trim() ? ` · "${searchQuery.trim()}"` : ''}
        </p>
      </div>

      {/* Empty Search / Filter State */}
      {filteredProjects.length === 0 && (
        <div className="mt-10 rounded-2xl border border-white/[0.09] bg-[#0B0F17]/85 backdrop-blur-md p-10 text-center">
          <p className="font-display text-lg font-semibold text-white">
            No matching portfolio projects found
          </p>
          <p className="mt-2 text-sm text-slate-300">
            No project matched your current filter combination. Reset filters to inspect all 7 flagship deliverables.
          </p>
          <button
            type="button"
            onClick={() => {
              onCategoryChange('All (7)');
              onSearchChange('');
            }}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-xs font-semibold text-white hover:from-amber-400 hover:to-orange-500"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Reset Filters
          </button>
        </div>
      )}

      {/* Featured Full-Width Flagship: Project 1 */}
      {featuredProject && (
        <article className="mt-8 overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0B0F17]/85 backdrop-blur-md shadow-[0_24px_60px_-20px_rgba(0,0,0,0.75)]">
          <div className="grid lg:grid-cols-12">
            <div className="p-6 sm:p-8 lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                <span className="font-mono text-amber-300">
                  Project {featuredProject.number} · Flagship System
                </span>
                <span aria-hidden="true">·</span>
                <span>{featuredProject.domain}</span>
              </div>

              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {featuredProject.title}
              </h2>
              <p className="mt-1.5 text-sm font-medium text-orange-200">
                {featuredProject.subtitle}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                {featuredProject.description}
              </p>

              {/* Performance Metric Strip */}
              <div className="mt-6 grid grid-cols-2 divide-x divide-white/[0.08] rounded-xl border border-white/[0.08] bg-[#080B12]/90 sm:grid-cols-4">
                {featuredProject.metrics.map((m) => (
                  <div key={m.label} className="p-3.5">
                    <p className="text-[11px] font-medium text-slate-400">{m.label}</p>
                    <p className="mt-1 font-mono text-base font-semibold text-white tabular-nums">
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Clean Unboxed Tech Stack */}
              <p className="mt-5 text-xs leading-relaxed text-slate-300">
                <span className="font-semibold text-white">Tech Stack: </span>
                {featuredProject.techStack.join(' · ')}
              </p>

              <div className="mt-6">{renderProjectLinks(featuredProject)}</div>
            </div>

            <div className="border-t border-white/[0.08] lg:col-span-5 lg:border-l lg:border-t-0">
              <SafeImage
                src={featuredProject.imageUrl}
                alt={featuredProject.imageAlt}
                fallbackTitle={featuredProject.title}
                fallbackSubtitle={featuredProject.subtitle}
                variant="ml"
                className="h-full min-h-[260px] w-full"
              />
            </div>
          </div>

          {/* 6-Stage Workflow Pipeline Stepper */}
          <div className="border-t border-white/[0.08] bg-[#080B12]/80 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xs font-semibold text-slate-200">
                End-to-End ML Workflow Pipeline
              </h3>
              <span className="font-mono text-xs text-slate-400">
                Click any stage to inspect engineering rigor
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {PIPELINE_STAGES.map((stage, idx) => {
                const active = activePipelineStep === idx;
                return (
                  <button
                    key={stage.step}
                    type="button"
                    onClick={() => setActivePipelineStep(idx)}
                    className={`rounded-lg border px-3 py-2.5 text-left transition-colors ${
                      active
                        ? 'border-amber-400/70 bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-white'
                        : 'border-white/[0.09] bg-[#0B0F17] text-slate-300 hover:border-white/25 hover:text-white'
                    }`}
                  >
                    <span className="block font-mono text-[11px] text-amber-300">
                      {stage.step}
                    </span>
                    <span className="mt-0.5 block text-xs font-semibold whitespace-nowrap truncate">
                      {stage.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-3 text-xs leading-relaxed text-slate-300">
              <span className="font-semibold text-white">
                {PIPELINE_STAGES[activePipelineStep].step}. {PIPELINE_STAGES[activePipelineStep].name}:
              </span>{' '}
              {PIPELINE_STAGES[activePipelineStep].detail}
            </p>

            {/* Embedded Live Estimate Simulator */}
            <div className="mt-6">
              <InsuranceSimulator />
            </div>
          </div>
        </article>
      )}

      {/* Projects 2–7 Grid */}
      {standardProjects.length > 0 && (
        <div className="mt-8 grid gap-7 lg:grid-cols-2">
          {standardProjects.map((project) => (
            <article
              key={project.id}
              className={`flex flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0B0F17]/85 backdrop-blur-md ${
                project.interactiveType === 'fraud-chart' ? 'lg:col-span-2' : ''
              }`}
            >
              <div
                className={
                  project.interactiveType === 'fraud-chart'
                    ? 'grid lg:grid-cols-12'
                    : 'flex flex-1 flex-col'
                }
              >
                <div
                  className={
                    project.interactiveType === 'fraud-chart'
                      ? 'lg:col-span-5 border-b border-white/[0.08] lg:border-b-0 lg:border-r'
                      : 'aspect-[16/9] border-b border-white/[0.08]'
                  }
                >
                  <SafeImage
                    src={project.imageUrl}
                    alt={project.imageAlt}
                    fallbackTitle={project.title}
                    fallbackSubtitle={project.subtitle}
                    variant={project.category === 'Fraud & Forecasting' ? 'fraud' : 'bi'}
                    className="h-full min-h-[220px] w-full"
                  />
                </div>

                <div
                  className={`flex flex-1 flex-col justify-between p-6 ${
                    project.interactiveType === 'fraud-chart' ? 'lg:col-span-7 sm:p-7' : ''
                  }`}
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                      <span className="font-mono text-amber-300">
                        Project {project.number}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.domain}</span>
                    </div>

                    <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-white">
                      {project.title}
                    </h2>
                    <p className="mt-1 text-xs font-medium text-orange-200">
                      {project.subtitle}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {project.description}
                    </p>

                    <ul className="mt-4 space-y-1.5 text-xs leading-relaxed text-slate-300">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-300" aria-hidden="true" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 space-y-4 border-t border-white/[0.08] pt-4">
                    {/* Unboxed Key Metrics */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      {project.metrics.map((m) => (
                        <div key={m.label}>
                          <span className="block text-[11px] text-slate-400">{m.label}</span>
                          <span className="font-mono text-xs font-semibold text-white tabular-nums">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-slate-300">
                      <span className="font-semibold text-white">Stack: </span>
                      {project.techStack.join(' · ')}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      {renderProjectLinks(project)}

                      {project.interactiveType === 'fraud-chart' && (
                        <button
                          type="button"
                          onClick={() => setShowFraudChart((prev) => !prev)}
                          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:from-amber-400 hover:to-orange-500 whitespace-nowrap shrink-0"
                        >
                          {showFraudChart ? 'Hide Regional Anomaly Chart' : 'Inspect Regional Anomaly Chart'}
                          {showFraudChart ? (
                            <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                          ) : (
                            <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {project.interactiveType === 'fraud-chart' && showFraudChart && (
                <div className="border-t border-white/[0.08] bg-[#080B12]/80 p-6">
                  <FraudAnomalyChart />
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      <CaseStudyModal mode={modalMode} onClose={() => setModalMode(null)} />
    </div>
  );
}
