import { useEffect, useState } from 'react';
import { Printer, ExternalLink, Award, Eye, X } from 'lucide-react';
import {
  CANONICAL_URLS,
  CERTIFICATIONS,
  CONTACT_INFO,
  PROJECTS,
  TECH_STACK_GROUPS,
} from '../data/portfolioData';

export function ResumePage() {
  const [activeCert, setActiveCert] = useState<(typeof CERTIFICATIONS)[number] | null>(null);

  useEffect(() => {
    if (!activeCert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCert(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeCert]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-[1040px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      {/* Top Action Bar */}
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <p className="font-mono text-xs text-amber-300">Executive Curriculum Vitae</p>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-white">
            Efa Godspower — Resume
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:from-amber-400 hover:to-orange-500 whitespace-nowrap shrink-0"
          >
            <Printer className="h-4 w-4" aria-hidden="true" />
            Print / Save PDF
          </button>

          <a
            href={CANONICAL_URLS.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[42px] items-center gap-1.5 rounded-lg border border-white/[0.14] bg-[#0B0F17]/85 backdrop-blur-md px-4 py-2 text-xs font-semibold text-slate-100 transition-colors hover:border-amber-400/50 hover:text-white whitespace-nowrap shrink-0"
          >
            Original Resume Route
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Printable Resume Sheet */}
      <div className="print-surface rounded-2xl border border-white/[0.1] bg-[#0B0F17]/85 backdrop-blur-md p-6 sm:p-10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.75)]">
        {/* Header */}
        <header className="border-b border-white/[0.08] pb-6">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Efa Godspower
          </h2>
          <p className="mt-1.5 text-sm font-medium bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
            Machine Learning Engineer · Data Scientist · AI/ML Performance Evaluation &amp; Business Intelligence
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="font-mono tabular-nums hover:text-amber-300 transition-colors"
            >
              {CONTACT_INFO.phone}
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="hover:text-amber-300 transition-colors"
            >
              {CONTACT_INFO.email}
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={CANONICAL_URLS.githubProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-300 transition-colors"
            >
              github.com/efapowertech042-ai
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={CANONICAL_URLS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-300 transition-colors"
            >
              linkedin.com/in/efagodspower
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={CANONICAL_URLS.root}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-300 transition-colors"
            >
              sites.google.com/view/efagodspower
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={CANONICAL_URLS.tableauSalary}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-300 transition-colors"
            >
              Tableau Public Portfolio
            </a>
          </div>
        </header>

        {/* Executive Summary */}
        <section className="mt-6 border-b border-white/[0.08] pb-6">
          <h3 className="font-display text-sm font-semibold tracking-wide text-amber-300">
            Executive Profile
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-200">
            Machine Learning Engineer, Data Scientist, Business Intelligence (BI) Professional, and AI Evaluation Specialist transforming complex operational and financial data into reliable business decisions across the complete data lifecycle: acquisition, validation, EDA, predictive modeling, rigorous error analysis, deployment readiness, and executive BI reporting.
          </p>
        </section>

        {/* Verified Quantitative Outcomes */}
        <section className="mt-6 border-b border-white/[0.08] pb-6">
          <h3 className="font-display text-sm font-semibold tracking-wide text-amber-300">
            Verified Impact &amp; Evaluation Highlights
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/[0.08] bg-[#080B12]/90 p-4">
              <p className="font-mono text-lg font-bold text-white tabular-nums">
                R² 0.8538 · RMSE $4,765 · MAE $2,656
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-300">
                Engineered and deployed a 200-tree GradientBoostingRegressor (max_depth=4, lr=0.1; tuned depth-3 R² 0.8812) Health Insurance Charges Predictor with 90.3% split-conformal coverage and low-confidence flagging.
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-[#080B12]/90 p-4">
              <p className="font-mono text-lg font-bold text-white tabular-nums">
                9,994 Orders · $39,706 Anomaly Isolated
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-300">
                Applied Agglomerative Hierarchical Clustering across 793 customers, isolating all 300 maximum-discount (80%) orders in the Central region (31.9% loss rate, 8 loss-making accounts).
              </p>
            </div>
          </div>
        </section>

        {/* Core Technical Competencies */}
        <section className="mt-6 border-b border-white/[0.08] pb-6">
          <h3 className="font-display text-sm font-semibold tracking-wide text-amber-300">
            Technical Competencies
          </h3>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            {TECH_STACK_GROUPS.map((group) => (
              <div key={group.group}>
                <dt className="text-xs font-semibold text-white">{group.group}</dt>
                <dd className="mt-1 text-xs leading-relaxed text-slate-300">
                  {group.items.join(' · ')}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Certifications & Credentials */}
        <section className="mt-6 border-b border-white/[0.08] pb-6">
          <h3 className="font-display text-sm font-semibold tracking-wide text-amber-300">
            Certifications &amp; Credentials
          </h3>
          <div className="mt-4 space-y-4">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="flex flex-col gap-4 rounded-xl border border-white/[0.08] bg-[#080B12]/90 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Award className="h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
                    <h4 className="font-display text-sm font-semibold text-white">
                      {cert.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300">
                    <span className="font-medium text-orange-200">{cert.issuer}</span>
                    <span aria-hidden="true"> · </span>
                    <span>{cert.credentialType}</span>
                    <span aria-hidden="true"> · </span>
                    <span>{cert.duration} ({cert.program})</span>
                    <span aria-hidden="true"> · </span>
                    <span className="font-mono tabular-nums text-slate-200">
                      Completed {cert.completionDate}
                    </span>
                  </p>
                  <p className="text-xs leading-relaxed text-slate-400">
                    <span className="font-medium text-slate-300">Verified Competencies: </span>
                    {cert.tools.join(' · ')}
                  </p>
                </div>

                <div className="no-print flex flex-wrap items-center gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveCert(cert)}
                    className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-3.5 py-2 text-xs font-semibold text-white transition-all hover:from-amber-400 hover:to-orange-500 whitespace-nowrap"
                  >
                    <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                    View Certificate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Applied Projects */}
        <section className="mt-6">
          <h3 className="font-display text-sm font-semibold tracking-wide text-amber-300">
            Applied Data Science &amp; BI Deliverables
          </h3>
          <div className="mt-4 space-y-5">
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                className="border-b border-white/[0.06] pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-display text-sm font-semibold text-white">
                    {project.number}. {project.title}
                  </h4>
                  <span className="font-mono text-xs text-orange-300">{project.domain}</span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-200">
                  {project.description}
                </p>
                <p className="mt-1.5 text-xs text-slate-400">
                  {project.techStack.join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* View-Only Certificate Preview Modal */}
      {activeCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeCert.title}
          onClick={() => setActiveCert(null)}
          className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
            className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/[0.14] bg-[#080B12] p-3 sm:p-4 shadow-2xl select-none"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-1">
              <div>
                <p className="font-display text-sm font-semibold text-white">
                  {activeCert.title}
                </p>
                <p className="text-xs text-slate-400">
                  {activeCert.issuer} · Completed {activeCert.completionDate} · View-Only Credential
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveCert(null)}
                aria-label="Close certificate preview"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.05] text-slate-200 hover:bg-white/[0.12] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white">
              <img
                src={activeCert.previewImageUrl}
                alt={`${activeCert.title} — ${activeCert.issuer}`}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="max-h-[78vh] w-full object-contain pointer-events-none select-none"
              />
              <div
                className="absolute inset-0"
                onContextMenu={(e) => e.preventDefault()}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
