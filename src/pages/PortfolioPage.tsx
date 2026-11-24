import { useState, useMemo, useEffect } from 'react';
import { ExternalLink, ChevronDown, ChevronUp, BarChart2, RotateCcw, Maximize2, X } from 'lucide-react';
import {
  CANONICAL_URLS,
  PIPELINE_STAGES,
  ProjectCategory,
  ProjectItem,
  PROJECTS,
} from '../data/portfolioData';
import { SafeImage } from '../components/SafeImage';
import { InsuranceSimulator } from '../components/InsuranceSimulator';
import { FeatureBehaviorGraphRag } from '../components/FeatureBehaviorGraphRag';
import { FraudAnomalyChart } from '../components/FraudAnomalyChart';
import { CaseStudyModal } from '../components/CaseStudyModal';
import { FinSightCaseStudyModal } from '../components/FinSightCaseStudyModal';

interface PortfolioPageProps {
  activeCategory: ProjectCategory;
  onCategoryChange: (cat: ProjectCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const CATEGORIES: ProjectCategory[] = [
  'All (9)',
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
  const [finSightModalOpen, setFinSightModalOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; title: string } | null>(null);

  useEffect(() => {
    if (!lightboxImage) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxImage]);

  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PROJECTS.filter((project) => {
      const matchesCat =
        activeCategory === 'All (9)' || project.category === activeCategory;
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

  const featuredProjects = filteredProjects.filter((p) => p.featured);
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

      {project.interactiveType === 'finsight-modal' && (
        <button
          type="button"
          onClick={() => setFinSightModalOpen(true)}
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-amber-400/50 bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-200 transition-colors hover:border-amber-400 hover:bg-amber-500/20 hover:text-white whitespace-nowrap shrink-0"
        >
          <BarChart2 className="h-3.5 w-3.5" aria-hidden="true" />
          Open Case Study Detail
        </button>
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
          <BarChart2 className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
          Inspect Assessment Ratio Analysis
        </button>
      )}
    </div>
  );

  const renderCaseStudyHierarchy = (caseStudy: ProjectItem['caseStudy']) => (
    <dl className="mt-4 divide-y divide-white/[0.07] border-y border-white/[0.08] text-xs leading-relaxed">
      <div className="grid gap-1.5 py-2.5 sm:grid-cols-12 sm:gap-3">
        <dt className="font-mono font-semibold text-amber-300 sm:col-span-3">
          01 · Problem
        </dt>
        <dd className="text-slate-300 sm:col-span-9">{caseStudy.problem}</dd>
      </div>
      <div className="grid gap-1.5 py-2.5 sm:grid-cols-12 sm:gap-3">
        <dt className="font-mono font-semibold text-orange-300 sm:col-span-3">
          02 · Architecture
        </dt>
        <dd className="text-slate-300 sm:col-span-9">{caseStudy.architecture}</dd>
      </div>
      <div className="grid gap-1.5 py-2.5 sm:grid-cols-12 sm:gap-3">
        <dt className="font-mono font-semibold text-emerald-300 sm:col-span-3">
          03 · Impact
        </dt>
        <dd className="text-slate-200 sm:col-span-9">{caseStudy.impact}</dd>
      </div>
    </dl>
  );

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      {/* Page Header & Category Controls */}
      <div className="flex flex-col gap-6 border-b border-white/[0.08] pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono text-xs text-amber-300">Portfolio · 9 Flagship Deliverables</p>
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
            No project matched your current filter combination. Reset filters to inspect all 9 flagship deliverables.
          </p>
          <button
            type="button"
            onClick={() => {
              onCategoryChange('All (9)');
              onSearchChange('');
            }}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-xs font-semibold text-white hover:from-amber-400 hover:to-orange-500"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Reset Filters
          </button>
        </div>
      )}

      {/* Featured Flagship Systems */}
      {featuredProjects.map((featuredProject) =>
        featuredProject.id === 'finsight-financial-intelligence' ? (
          <article
            key={featuredProject.id}
            className="mt-8 overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0B0F17]/85 backdrop-blur-md shadow-[0_24px_60px_-20px_rgba(0,0,0,0.75)]"
          >
            <div className="grid items-start gap-8 p-6 sm:p-8 lg:grid-cols-12">
              {/* Left Column: Narrative, Problem->Architecture->Impact, Stack & Actions */}
              <div className="flex flex-col justify-between lg:col-span-7">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                    <span className="font-mono text-amber-300">
                      Project {featuredProject.number} · Flagship System
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Deployed Live on Vercel (Multi-Service Vite + FastAPI)</span>
                  </div>

                  <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl text-balance">
                    {featuredProject.title}
                  </h2>
                  <p className="mt-1.5 text-xs font-medium text-orange-200">
                    Full-Stack AI &amp; Data Science · Financial Analytics · FastAPI · React / TypeScript · Explainable AI (SHAP) · Time-Series Forecasting
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-200">
                    {featuredProject.description}
                  </p>

                  {renderCaseStudyHierarchy(featuredProject.caseStudy)}

                  <p className="mt-4 text-xs leading-relaxed text-slate-300">
                    <span className="font-semibold text-white">Tech Stack: </span>
                    {featuredProject.techStack.join(' · ')}
                  </p>
                </div>

                <div className="mt-6">{renderProjectLinks(featuredProject)}</div>
              </div>

              {/* Right Column: Project Screenshot + 2x2 Metrics */}
              <div className="flex flex-col gap-4 lg:col-span-5 lg:border-l lg:border-white/[0.08] lg:pl-8">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxImage({
                      src: featuredProject.imageUrl,
                      alt: featuredProject.imageAlt,
                      title: featuredProject.title,
                    })
                  }
                  aria-label="Inspect full-resolution FinSight Financial Intelligence dashboard screenshot"
                  className="group relative block aspect-[1280/719] w-full overflow-hidden rounded-xl border border-white/[0.12] bg-[#080B12] text-left shadow-[0_14px_36px_-12px_rgba(0,0,0,0.8)] transition-colors hover:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                >
                  <SafeImage
                    src={featuredProject.imageUrl}
                    alt={featuredProject.imageAlt}
                    fallbackTitle={featuredProject.title}
                    fallbackSubtitle={featuredProject.subtitle}
                    variant="ml"
                    className="h-full w-full bg-[#F8FAFC]"
                    imgClassName="object-contain transition-transform duration-300 group-hover:scale-[1.015]"
                  />
                  <span className="pointer-events-none absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-[#080B12]/90 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md transition-colors group-hover:border-amber-400/70 group-hover:bg-[#0B0F17]">
                    <Maximize2 className="h-3 w-3 text-amber-300" aria-hidden="true" />
                    Expand
                  </span>
                </button>

                {/* Performance & Optimization Metric Strip */}
                <div className="grid grid-cols-2 divide-x divide-y divide-white/[0.08] rounded-xl border border-white/[0.08] bg-[#080B12]/90">
                  {featuredProject.metrics.map((m) => (
                    <div key={m.label} className="px-4 py-3">
                      <p className="text-[11px] font-medium text-slate-400">{m.label}</p>
                      <p className="mt-0.5 font-mono text-sm font-semibold text-white tabular-nums">
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 5-Capability Executive Footer Strip */}
            <div className="border-t border-white/[0.08] bg-[#080B12]/80 px-6 py-5 sm:px-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-slate-200">
                  5 Platform Capabilities — Audit · 2030 Forecast &amp; 6 Hypothesis Tests · 5-Yr Simulator · Exact SHAP &amp; Isolation Forest · Graphical RAG
                </p>
                <button
                  type="button"
                  onClick={() => setFinSightModalOpen(true)}
                  className="font-mono text-xs font-semibold text-amber-300 transition-colors hover:text-orange-300 whitespace-nowrap"
                >
                  Inspect Full Engineering Case Study →
                </button>
              </div>
            </div>
          </article>
        ) : (
          <article
            key={featuredProject.id}
            className="mt-8 overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0B0F17]/85 backdrop-blur-md shadow-[0_24px_60px_-20px_rgba(0,0,0,0.75)]"
          >
            <div className="grid items-start gap-8 p-6 sm:p-8 lg:grid-cols-12">
              {/* Left Column: Narrative, Highlights, Stack & Actions */}
              <div className="flex flex-col justify-between lg:col-span-7">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                    <span className="font-mono text-amber-300">
                      Project {featuredProject.number} · Flagship System
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{featuredProject.domain}</span>
                  </div>

                  <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl text-balance">
                    {featuredProject.title}
                  </h2>
                  <p className="mt-1.5 text-sm font-medium text-orange-200">
                    {featuredProject.subtitle}
                  </p>

                  {renderCaseStudyHierarchy(featuredProject.caseStudy)}

                  <p className="mt-4 text-xs leading-relaxed text-slate-300">
                    <span className="font-semibold text-white">Tech Stack: </span>
                    {featuredProject.techStack.join(' · ')}
                  </p>
                </div>

                <div className="mt-6">{renderProjectLinks(featuredProject)}</div>
              </div>

              {/* Right Column: Compact 16:9 Project Visual + 2x2 Metrics */}
              <div className="flex flex-col gap-4 lg:col-span-5 lg:border-l lg:border-white/[0.08] lg:pl-8">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxImage({
                      src: featuredProject.imageUrl,
                      alt: featuredProject.imageAlt,
                      title: featuredProject.title,
                    })
                  }
                  aria-label="Inspect full-resolution Health Insurance Charges Predictor infographic"
                  className="group relative block aspect-[1280/719] w-full overflow-hidden rounded-xl border border-white/[0.12] bg-[#080B12] text-left shadow-[0_14px_36px_-12px_rgba(0,0,0,0.8)] transition-colors hover:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                >
                  <SafeImage
                    src={featuredProject.imageUrl}
                    alt={featuredProject.imageAlt}
                    fallbackTitle={featuredProject.title}
                    fallbackSubtitle={featuredProject.subtitle}
                    variant="ml"
                    className="h-full w-full"
                    imgClassName="object-contain transition-transform duration-300 group-hover:scale-[1.015]"
                  />
                  <span className="pointer-events-none absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-[#080B12]/90 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md transition-colors group-hover:border-amber-400/70 group-hover:bg-[#0B0F17]">
                    <Maximize2 className="h-3 w-3 text-amber-300" aria-hidden="true" />
                    Expand
                  </span>
                </button>

                {/* Performance Metric Strip */}
                <div className="grid grid-cols-2 divide-x divide-y divide-white/[0.08] rounded-xl border border-white/[0.08] bg-[#080B12]/90">
                  {featuredProject.metrics.map((m) => (
                    <div key={m.label} className="px-4 py-3">
                      <p className="text-[11px] font-medium text-slate-400">{m.label}</p>
                      <p className="mt-0.5 font-mono text-base font-semibold text-white tabular-nums">
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>
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
              <div id="insurance-simulator-panel" className="mt-6 scroll-mt-24">
                <InsuranceSimulator />
              </div>

              {/* Feature Importance & Behavior Knowledge Graph (Graph RAG) */}
              <div className="mt-6">
                <FeatureBehaviorGraphRag
                  onInspectSimulator={() => {
                    document
                      .getElementById('insurance-simulator-panel')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                />
              </div>
            </div>
          </article>
        )
      )}

      {/* Projects Grid */}
      {standardProjects.length > 0 && (
        <div className="mt-8 grid gap-7 lg:grid-cols-2">
          {standardProjects.map((project) =>
            project.interactiveType === 'fraud-chart' ? (
              <article
                key={project.id}
                className="lg:col-span-2 flex flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0B0F17]/85 backdrop-blur-md shadow-[0_20px_50px_-20px_rgba(0,0,0,0.75)]"
              >
                <div className="grid items-start gap-8 p-6 sm:p-8 lg:grid-cols-12">
                  {/* Left Column: Compact 16:9 Fraud Dashboard Infographic + 2x2 Metrics */}
                  <div className="flex flex-col gap-4 lg:col-span-5 lg:border-r lg:border-white/[0.08] lg:pr-8">
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxImage({
                          src: project.imageUrl,
                          alt: project.imageAlt,
                          title: project.title,
                        })
                      }
                      aria-label="Inspect full-resolution Discount or Deceit fraud clustering infographic"
                      className="group relative block aspect-[1280/719] w-full overflow-hidden rounded-xl border border-white/[0.12] bg-[#080B12] text-left shadow-[0_14px_36px_-12px_rgba(0,0,0,0.8)] transition-colors hover:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                    >
                      <SafeImage
                        src={project.imageUrl}
                        alt={project.imageAlt}
                        fallbackTitle={project.title}
                        fallbackSubtitle={project.subtitle}
                        variant="fraud"
                        className="h-full w-full"
                        imgClassName="object-contain transition-transform duration-300 group-hover:scale-[1.015]"
                      />
                      <span className="pointer-events-none absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-[#080B12]/90 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md transition-colors group-hover:border-amber-400/70 group-hover:bg-[#0B0F17]">
                        <Maximize2 className="h-3 w-3 text-amber-300" aria-hidden="true" />
                        Expand
                      </span>
                    </button>

                    {/* 2x2 Key Audit Metrics */}
                    <div className="grid grid-cols-2 divide-x divide-y divide-white/[0.08] rounded-xl border border-white/[0.08] bg-[#080B12]/90">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="px-4 py-3">
                          <p className="text-[11px] font-medium text-slate-400">{m.label}</p>
                          <p className="mt-0.5 font-mono text-base font-semibold text-white tabular-nums">
                            {m.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Narrative, Highlights, Stack & Actions */}
                  <div className="flex flex-col justify-between lg:col-span-7">
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

                      <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white text-balance">
                        {project.title}
                      </h2>
                      <p className="mt-1.5 text-sm font-medium text-orange-200">
                        {project.subtitle}
                      </p>

                      {renderCaseStudyHierarchy(project.caseStudy)}

                      <p className="mt-4 text-xs leading-relaxed text-slate-300">
                        <span className="font-semibold text-white">Stack: </span>
                        {project.techStack.join(' · ')}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      {renderProjectLinks(project)}

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
                    </div>
                  </div>
                </div>

                {showFraudChart && (
                  <div className="border-t border-white/[0.08] bg-[#080B12]/80 p-6">
                    <FraudAnomalyChart />
                  </div>
                )}
              </article>
            ) : project.id === 'global-retail-sales-intelligence' ||
              project.id === 'meridian-fx-profit-forecasting' ? (
              <article
                key={project.id}
                className="lg:col-span-2 flex flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0B0F17]/85 backdrop-blur-md shadow-[0_20px_50px_-20px_rgba(0,0,0,0.75)]"
              >
                <div className="grid items-start gap-8 p-6 sm:p-8 lg:grid-cols-12">
                  {/* Left Column: Narrative, Highlights, Stack & Actions */}
                  <div className="flex flex-col justify-between lg:col-span-7">
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

                      <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white text-balance">
                        {project.title}
                      </h2>
                      <p className="mt-1.5 text-sm font-medium text-orange-200">
                        {project.subtitle}
                      </p>

                      {renderCaseStudyHierarchy(project.caseStudy)}

                      <p className="mt-4 text-xs leading-relaxed text-slate-300">
                        <span className="font-semibold text-white">Stack: </span>
                        {project.techStack.join(' · ')}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      {renderProjectLinks(project)}
                    </div>
                  </div>

                  {/* Right Column: Compact 16:9 Screenshot/Infographic + Metrics */}
                  <div className="flex flex-col gap-4 lg:col-span-5 lg:border-l lg:border-white/[0.08] lg:pl-8">
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxImage({
                          src: project.imageUrl,
                          alt: project.imageAlt,
                          title: project.title,
                        })
                      }
                      aria-label={`Inspect full-resolution ${project.title} visual`}
                      className="group relative block w-full overflow-hidden rounded-xl border border-white/[0.14] bg-[#080B12] p-1.5 text-left shadow-[0_14px_36px_-12px_rgba(0,0,0,0.85)] transition-colors hover:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                    >
                      <div
                        className={`relative aspect-[1280/719] w-full overflow-hidden rounded-lg ring-1 ring-black/15 ${
                          project.id === 'global-retail-sales-intelligence'
                            ? 'bg-[#F8FAFC]'
                            : 'bg-[#050810]'
                        }`}
                      >
                        <SafeImage
                          src={project.imageUrl}
                          alt={project.imageAlt}
                          fallbackTitle={project.title}
                          fallbackSubtitle={project.subtitle}
                          variant="fraud"
                          className={`h-full w-full ${
                            project.id === 'global-retail-sales-intelligence'
                              ? 'bg-[#F8FAFC]'
                              : 'bg-[#050810]'
                          }`}
                          imgClassName="object-contain transition-transform duration-300 group-hover:scale-[1.015]"
                        />
                        <div
                          className="pointer-events-none absolute inset-0 rounded-lg shadow-[inset_0_0_24px_rgba(8,11,18,0.12)]"
                          aria-hidden="true"
                        />
                      </div>
                      <span className="pointer-events-none absolute bottom-3.5 right-3.5 inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-[#080B12]/90 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md transition-colors group-hover:border-amber-400/70 group-hover:bg-[#0B0F17]">
                        <Maximize2 className="h-3 w-3 text-amber-300" aria-hidden="true" />
                        Expand
                      </span>
                    </button>

                    {/* Metrics Strip */}
                    <div
                      className={`grid divide-x divide-white/[0.08] rounded-xl border border-white/[0.08] bg-[#080B12]/90 ${
                        project.metrics.length === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3'
                      }`}
                    >
                      {project.metrics.map((m) => (
                        <div key={m.label} className="px-3.5 py-3">
                          <p className="text-[11px] font-medium text-slate-400 truncate">{m.label}</p>
                          <p className="mt-0.5 font-mono text-sm font-semibold text-white tabular-nums">
                            {m.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ) : (
              <article
                key={project.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0B0F17]/85 backdrop-blur-md transition-colors duration-200 hover:border-white/[0.16]"
              >
                <div className="flex flex-1 flex-col">
                  <div className="border-b border-white/[0.08] bg-[#080B12] p-2.5">
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxImage({
                          src: project.imageUrl,
                          alt: project.imageAlt,
                          title: project.title,
                        })
                      }
                      aria-label={`Inspect full-resolution ${project.title} visual`}
                      className="group relative block aspect-[1280/719] w-full overflow-hidden rounded-lg border border-white/[0.1] bg-[#0B0F17] text-left shadow-[inset_0_0_24px_rgba(0,0,0,0.2)] transition-colors hover:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                    >
                      <SafeImage
                        src={project.imageUrl}
                        alt={project.imageAlt}
                        fallbackTitle={project.title}
                        fallbackSubtitle={project.subtitle}
                        variant={project.category === 'Fraud & Forecasting' ? 'fraud' : 'bi'}
                        className="h-full w-full"
                        imgClassName={`object-contain transition-transform duration-300 group-hover:scale-[1.015] ${
                          project.id === 'logistics-financing-dashboard'
                            ? 'bg-[#F3F4F6]'
                            : project.id === 'sales-profit-performance-dashboard' ||
                              project.id === 'ai-data-jobs-salary-analysis'
                            ? 'bg-white'
                            : ''
                        }`}
                      />
                      <span className="pointer-events-none absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-[#080B12]/90 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md transition-colors group-hover:border-amber-400/70 group-hover:bg-[#0B0F17]">
                        <Maximize2 className="h-3 w-3 text-amber-300" strokeWidth={1.75} aria-hidden="true" />
                        Expand
                      </span>
                    </button>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6">
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

                      <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-white text-balance">
                        {project.title}
                      </h2>
                      <p className="mt-1 text-xs font-medium text-orange-200">
                        {project.subtitle}
                      </p>

                      {renderCaseStudyHierarchy(project.caseStudy)}
                    </div>

                    <div className="mt-5 space-y-4">
                      {/* Standardized 3-Column Metrics Bar */}
                      <div className="grid grid-cols-3 divide-x divide-white/[0.08] rounded-xl border border-white/[0.08] bg-[#080B12]/90">
                        {project.metrics.map((m) => (
                          <div key={m.label} className="px-3 py-2.5">
                            <span className="block text-[11px] text-slate-400 truncate">{m.label}</span>
                            <span className="mt-0.5 block font-mono text-xs font-semibold text-white tabular-nums truncate">
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
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )
          )}
        </div>
      )}

      <CaseStudyModal mode={modalMode} onClose={() => setModalMode(null)} />
      <FinSightCaseStudyModal
        open={finSightModalOpen}
        onClose={() => setFinSightModalOpen(false)}
      />

      {/* Fullscreen Infographic Lightbox */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxImage.title}
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-white/[0.15] bg-[#080B12] p-3 sm:p-4 shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between gap-4 px-1">
              <p className="font-display text-sm font-semibold text-white">
                {lightboxImage.title}
              </p>
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                aria-label="Close full-resolution view"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.05] text-slate-200 hover:bg-white/[0.12] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="max-h-[82vh] w-full rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
