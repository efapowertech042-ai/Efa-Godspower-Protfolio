import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { LOGISTICS_STUDY_DATA, REAL_ESTATE_STUDY_DATA } from '../data/portfolioData';

interface CaseStudyModalProps {
  mode: 'logistics' | 'realestate' | null;
  onClose: () => void;
}

export function CaseStudyModal({ mode, onClose }: CaseStudyModalProps) {
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedYear, setSelectedYear] = useState('All Years');

  useEffect(() => {
    if (!mode) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mode, onClose]);

  if (!mode) return null;

  const filteredLogistics =
    selectedRegion === 'All Regions'
      ? LOGISTICS_STUDY_DATA.products
      : LOGISTICS_STUDY_DATA.products.filter((p) => p.region === selectedRegion);

  const maxLogisticsRev = Math.max(...LOGISTICS_STUDY_DATA.products.map((p) => p.revenueK));
  const maxTrend = Math.max(...LOGISTICS_STUDY_DATA.monthlyTrend.map((m) => m.revenue));
  const maxBinCount = Math.max(...REAL_ESTATE_STUDY_DATA.distributionBins.map((b) => b.count));

  const yearAdjustment =
    selectedYear === '2023' ? 0.94 : selectedYear === '2024' ? 0.98 : selectedYear === '2025' ? 1.03 : 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-modal-title"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/[0.12] bg-[#0B0F17] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div>
            <p className="font-mono text-xs text-amber-300">
              {mode === 'logistics'
                ? 'Case Study 06 · Logistics Financing Dashboard'
                : 'Case Study 07 · Real Estate Sales Ratio Dashboard'}
            </p>
            <h3 id="case-study-modal-title" className="mt-1 font-display text-xl font-bold text-white">
              {mode === 'logistics'
                ? 'Revenue by Product & Regional Operational Flow'
                : 'Assessment Ratio Distribution & Tax Equity Summary'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study modal"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.04] text-slate-300 transition-colors hover:bg-white/[0.1] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {mode === 'logistics' ? (
          <div className="mt-5 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-300">
                Filter regional fulfillment corridors to inspect product revenue concentration and flow efficiency.
              </p>
              <select
                aria-label="Filter logistics region"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="rounded-lg border border-white/[0.1] bg-[#080B12] px-3 py-2 text-xs font-medium text-white focus:border-amber-400 focus:outline-none"
              >
                {LOGISTICS_STUDY_DATA.regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-400">
                Revenue by Product Line ($K) &amp; Operational Flow Index
              </h4>
              {filteredLogistics.map((item) => (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-200">
                      {item.name} <span className="text-slate-400">· {item.region}</span>
                    </span>
                    <span className="font-mono tabular-nums text-slate-200">
                      ${item.revenueK.toLocaleString()}K · {item.marginPct}% Margin · Flow {item.flowScore}/100
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-white/[0.06]">
                    <div
                      className="h-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                      style={{ width: `${(item.revenueK / maxLogisticsRev) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/[0.08] pt-4">
              <h4 className="text-xs font-semibold text-slate-400">
                Bi-Monthly Revenue Trajectory ($K)
              </h4>
              <div className="mt-4 grid grid-cols-6 items-end gap-3 h-36">
                {LOGISTICS_STUDY_DATA.monthlyTrend.map((m) => (
                  <div key={m.month} className="flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="font-mono text-[11px] tabular-nums text-slate-300">
                      ${m.revenue}K
                    </span>
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-amber-500/80 to-orange-400/85 transition-all duration-300"
                      style={{ height: `${(m.revenue / maxTrend) * 84}%` }}
                    />
                    <span className="text-xs text-slate-400">{m.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-300">
                Assessment ratio (Assessed Value ÷ Actual Sale Price). Ratios below 0.80 highlight systematic under-assessment.
              </p>
              <select
                aria-label="Filter assessment year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="rounded-lg border border-white/[0.1] bg-[#080B12] px-3 py-2 text-xs font-medium text-white focus:border-amber-400 focus:outline-none"
              >
                {REAL_ESTATE_STUDY_DATA.years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-400">
                Assessment Ratio Frequency Distribution
              </h4>
              <div className="mt-3 space-y-2.5">
                {REAL_ESTATE_STUDY_DATA.distributionBins.map((bin) => {
                  const adjCount = Math.round(bin.count * yearAdjustment);
                  return (
                    <div key={bin.range} className="grid grid-cols-12 items-center gap-3 text-xs">
                      <span className="col-span-3 font-mono tabular-nums text-slate-200">
                        {bin.range}
                      </span>
                      <div className="col-span-5">
                        <div className="h-2.5 w-full rounded-full bg-white/[0.06]">
                          <div
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                              bin.range.startsWith('0.50') || bin.range.startsWith('0.65')
                                ? 'bg-rose-400'
                                : 'bg-gradient-to-r from-amber-500 to-orange-500'
                            }`}
                            style={{ width: `${Math.min(100, (adjCount / maxBinCount) * 100)}%` }}
                          />
                        </div>
                      </div>
                      <span className="col-span-4 text-right font-mono tabular-nums text-slate-400">
                        {adjCount} parcels · {bin.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="overflow-x-auto border-t border-white/[0.08] pt-4">
              <h4 className="mb-2 text-xs font-semibold text-slate-400">
                District Tax Equity &amp; Reassessment Priority Summary
              </h4>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/[0.08] text-slate-400">
                    <th className="py-2 pr-3 font-medium">District</th>
                    <th className="py-2 px-3 text-right font-medium">Median Ratio</th>
                    <th className="py-2 px-3 text-right font-medium">Under-Assessed</th>
                    <th className="py-2 px-3 text-right font-medium">Median Sale</th>
                    <th className="py-2 pl-3 text-right font-medium">Equity Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05] tabular-nums">
                  {REAL_ESTATE_STUDY_DATA.districts.map((d) => {
                    const adjRatio = Math.min(1.05, d.medianRatio * yearAdjustment).toFixed(2);
                    return (
                      <tr key={d.district} className="text-slate-300">
                        <td className="py-2 pr-3 font-medium text-white">{d.district}</td>
                        <td className="py-2 px-3 text-right font-mono">{adjRatio}</td>
                        <td className="py-2 px-3 text-right font-mono">{d.underAssessedShare}%</td>
                        <td className="py-2 px-3 text-right font-mono">
                          ${d.medianSalePrice.toLocaleString()}
                        </td>
                        <td
                          className={`py-2 pl-3 text-right font-medium ${
                            d.underAssessedShare >= 50 ? 'text-amber-300' : 'text-emerald-300'
                          }`}
                        >
                          {d.status}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
