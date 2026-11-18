import { useState } from 'react';
import { REGIONAL_FRAUD_DATA } from '../data/portfolioData';

type MetricMode = 'discount' | 'lossRate' | 'profit';

export function FraudAnomalyChart() {
  const [metricMode, setMetricMode] = useState<MetricMode>('discount');

  const maxProfit = Math.max(...REGIONAL_FRAUD_DATA.map((d) => d.profit));

  return (
    <div className="mt-4 rounded-xl border border-white/[0.08] bg-[#080B12]/90 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-3.5">
        <div>
          <h4 className="font-display text-sm font-semibold text-white">
            Regional Anomaly Isolation — Central vs. East / West / South
          </h4>
          <p className="mt-0.5 text-xs text-slate-300">
            All 300 maximum-discount (80%) orders occurred exclusively in Central, driving a 31.9% loss-making order rate.
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-white/[0.08] bg-[#0B0F17] p-1">
          <button
            type="button"
            onClick={() => setMetricMode('discount')}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
              metricMode === 'discount'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Avg Discount %
          </button>
          <button
            type="button"
            onClick={() => setMetricMode('lossRate')}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
              metricMode === 'lossRate'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Loss Rate %
          </button>
          <button
            type="button"
            onClick={() => setMetricMode('profit')}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
              metricMode === 'profit'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Regional Profit
          </button>
        </div>
      </div>

      {/* Horizontal Comparative Bars */}
      <div className="mt-4 space-y-3">
        {REGIONAL_FRAUD_DATA.map((row) => {
          const widthPct =
            metricMode === 'discount'
              ? (row.avgDiscountPct / 30) * 100
              : metricMode === 'lossRate'
              ? (row.lossOrderRatePct / 36) * 100
              : (row.profit / maxProfit) * 100;

          const valueLabel =
            metricMode === 'discount'
              ? `${row.avgDiscountPct.toFixed(1)}%`
              : metricMode === 'lossRate'
              ? `${row.lossOrderRatePct.toFixed(1)}%`
              : `$${row.profit.toLocaleString()}`;

          return (
            <div key={row.region} className="grid grid-cols-12 items-center gap-3 text-xs">
              <div className="col-span-3 flex items-center gap-2">
                <span className={`font-medium ${row.isAnomaly ? 'text-rose-300' : 'text-slate-200'}`}>
                  {row.region}
                </span>
                {row.isAnomaly && (
                  <span className="font-mono text-[11px] text-rose-400 whitespace-nowrap">
                    Anomaly
                  </span>
                )}
              </div>
              <div className="col-span-7">
                <div className="h-2.5 w-full rounded-full bg-white/[0.06]">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      row.isAnomaly
                        ? 'bg-rose-400'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(4, widthPct))}%` }}
                  />
                </div>
              </div>
              <div className="col-span-2 text-right font-mono tabular-nums text-slate-200">
                {valueLabel}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabular Summary */}
      <div className="mt-5 overflow-x-auto border-t border-white/[0.08] pt-3">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/[0.08] text-slate-400">
              <th className="py-2 pr-3 font-medium">Region</th>
              <th className="py-2 px-3 text-right font-medium">Orders</th>
              <th className="py-2 px-3 text-right font-medium">Avg Discount</th>
              <th className="py-2 px-3 text-right font-medium">80% Disc. Orders</th>
              <th className="py-2 px-3 text-right font-medium">Loss Order Rate</th>
              <th className="py-2 pl-3 text-right font-medium">Net Profit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05] tabular-nums">
            {REGIONAL_FRAUD_DATA.map((row) => (
              <tr
                key={row.region}
                className={row.isAnomaly ? 'bg-rose-500/[0.08] text-rose-100' : 'text-slate-300'}
              >
                <td className="py-2 pr-3 font-medium">
                  {row.region} {row.isAnomaly ? '(Flagged)' : ''}
                </td>
                <td className="py-2 px-3 text-right font-mono">{row.orders.toLocaleString()}</td>
                <td className="py-2 px-3 text-right font-mono">{row.avgDiscountPct.toFixed(1)}%</td>
                <td className="py-2 px-3 text-right font-mono">{row.maxDiscount80Orders}</td>
                <td className="py-2 px-3 text-right font-mono">{row.lossOrderRatePct.toFixed(1)}%</td>
                <td className="py-2 pl-3 text-right font-mono">${row.profit.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
