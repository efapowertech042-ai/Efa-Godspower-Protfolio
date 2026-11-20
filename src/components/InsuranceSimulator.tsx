import { useState, useMemo } from 'react';
import { CheckCircle2, AlertTriangle, RotateCcw } from 'lucide-react';
import {
  GBR_MODEL_RESULTS,
  HoldoutBenchmarkRow,
  predictInsuranceGbr,
} from '../data/insuranceGbrModel';

type RegionOption = 'northeast' | 'northwest' | 'southeast' | 'southwest';
type SexOption = 'female' | 'male';

export function InsuranceSimulator() {
  const [age, setAge] = useState(34);
  const [bmi, setBmi] = useState(27.4);
  const [children, setChildren] = useState(1);
  const [smoker, setSmoker] = useState(false);
  const [sex, setSex] = useState<SexOption>('female');
  const [region, setRegion] = useState<RegionOption>('southeast');
  const [activeHoldoutRow, setActiveHoldoutRow] = useState<HoldoutBenchmarkRow | null>(null);

  const prediction = useMemo(
    () => predictInsuranceGbr({ age, bmi, children, smoker, sex, region }),
    [age, bmi, children, smoker, sex, region]
  );

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);

  const formatCurrencyExact = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);

  const handleReset = () => {
    setAge(34);
    setBmi(27.4);
    setChildren(1);
    setSmoker(false);
    setSex('female');
    setRegion('southeast');
    setActiveHoldoutRow(null);
  };

  const handleLoadHoldoutRow = (row: HoldoutBenchmarkRow) => {
    setAge(row.age);
    setBmi(row.bmi);
    setChildren(row.children);
    setSmoker(row.smoker);
    setSex(row.sex);
    setRegion(row.region);
    setActiveHoldoutRow(row);
  };

  // Normalize bar positioning across $0 – $65,000 scale
  const maxScale = 65000;
  const leftPct = Math.min(94, Math.max(0, (prediction.lower / maxScale) * 100));
  const widthPct = Math.min(
    100 - leftPct,
    Math.max(4, ((prediction.upper - prediction.lower) / maxScale) * 100)
  );
  const pointPct = Math.min(98, Math.max(2, (prediction.estimate / maxScale) * 100));

  const benchmarkRows = [
    {
      name: 'OLS Linear Regression (Baseline)',
      r2: GBR_MODEL_RESULTS.baselineOlsHoldout.r2.toFixed(4),
      rmse: formatCurrency(GBR_MODEL_RESULTS.baselineOlsHoldout.rmse),
      mae: formatCurrency(GBR_MODEL_RESULTS.baselineOlsHoldout.mae),
      highlight: false,
    },
    {
      name: 'GBR (200 trees, depth=4, lr=0.1) — Live Engine',
      r2: GBR_MODEL_RESULTS.holdout.r2.toFixed(4),
      rmse: formatCurrency(GBR_MODEL_RESULTS.holdout.rmse),
      mae: formatCurrency(GBR_MODEL_RESULTS.holdout.mae),
      highlight: true,
    },
    {
      name: 'Regularized GBR (200 trees, depth=3, lr=0.05)',
      r2: GBR_MODEL_RESULTS.tunedGbrHoldout.r2.toFixed(4),
      rmse: formatCurrency(GBR_MODEL_RESULTS.tunedGbrHoldout.rmse),
      mae: formatCurrency(GBR_MODEL_RESULTS.tunedGbrHoldout.mae),
      highlight: false,
    },
  ];

  const isActiveRowCovered =
    activeHoldoutRow !== null &&
    activeHoldoutRow.actualCharge >= prediction.lower &&
    activeHoldoutRow.actualCharge <= prediction.upper;

  return (
    <div className="space-y-6">
      {/* Live 200-Tree GBR Inference Card */}
      <div className="rounded-xl border border-white/[0.08] bg-[#080B12]/90 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div>
            <h4 className="font-display text-base font-semibold text-white">
              Live GradientBoostingRegressor Inference Engine
            </h4>
            <p className="mt-0.5 text-xs text-slate-400">
              Executes all 200 trained depth-4 trees from{' '}
              <span className="font-mono text-slate-300">insurance.csv</span> (n=1,338) in real time with calibrated 90% split-conformal intervals.
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-white/[0.08] hover:text-white whitespace-nowrap shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Reset
          </button>
        </div>

        <div className="mt-5 grid gap-6 lg:grid-cols-12">
          {/* Controls */}
          <div className="space-y-4 lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="sim-age" className="font-medium text-slate-300">
                    Age
                  </label>
                  <span className="font-mono tabular-nums text-white">{age} yrs</span>
                </div>
                <input
                  id="sim-age"
                  type="range"
                  min={18}
                  max={64}
                  step={1}
                  value={age}
                  onChange={(e) => {
                    setAge(Number(e.target.value));
                    setActiveHoldoutRow(null);
                  }}
                  className="portfolio-slider mt-2 w-full"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="sim-bmi" className="font-medium text-slate-300">
                    BMI
                  </label>
                  <span className="font-mono tabular-nums text-white">{bmi.toFixed(2)}</span>
                </div>
                <input
                  id="sim-bmi"
                  type="range"
                  min={16}
                  max={53}
                  step={0.05}
                  value={bmi}
                  onChange={(e) => {
                    setBmi(Number(e.target.value));
                    setActiveHoldoutRow(null);
                  }}
                  className="portfolio-slider mt-2 w-full"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="sim-children" className="font-medium text-slate-300">
                    Dependents
                  </label>
                  <span className="font-mono tabular-nums text-white">{children}</span>
                </div>
                <input
                  id="sim-children"
                  type="range"
                  min={0}
                  max={5}
                  step={1}
                  value={children}
                  onChange={(e) => {
                    setChildren(Number(e.target.value));
                    setActiveHoldoutRow(null);
                  }}
                  className="portfolio-slider mt-2 w-full"
                />
              </div>
            </div>

            <div className="grid gap-4 pt-1 sm:grid-cols-3">
              <div>
                <span className="block text-xs font-medium text-slate-300">Smoking Status</span>
                <div className="mt-2 grid grid-cols-2 gap-1 rounded-lg border border-white/[0.08] bg-[#0B0F17] p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setSmoker(false);
                      setActiveHoldoutRow(null);
                    }}
                    className={`rounded-md py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                      !smoker
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Non-Smoker
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSmoker(true);
                      setActiveHoldoutRow(null);
                    }}
                    className={`rounded-md py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                      smoker
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Smoker
                  </button>
                </div>
              </div>

              <div>
                <span className="block text-xs font-medium text-slate-300">Sex</span>
                <div className="mt-2 grid grid-cols-2 gap-1 rounded-lg border border-white/[0.08] bg-[#0B0F17] p-1">
                  {(['female', 'male'] as SexOption[]).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSex(opt);
                        setActiveHoldoutRow(null);
                      }}
                      className={`rounded-md py-1.5 text-xs font-medium capitalize transition-colors whitespace-nowrap ${
                        sex === opt ? 'bg-white/[0.12] text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="sim-region" className="block text-xs font-medium text-slate-300">
                  US Region
                </label>
                <select
                  id="sim-region"
                  value={region}
                  onChange={(e) => {
                    setRegion(e.target.value as RegionOption);
                    setActiveHoldoutRow(null);
                  }}
                  className="mt-2 w-full rounded-lg border border-white/[0.1] bg-[#0B0F17] px-3 py-2 text-xs font-medium capitalize text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="northeast">Northeast</option>
                  <option value="northwest">Northwest</option>
                  <option value="southeast">Southeast</option>
                  <option value="southwest">Southwest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="flex flex-col justify-between border-t border-white/[0.08] pt-4 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <div>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xs font-medium text-slate-400">
                  GBR Predicted Annual Charge
                </span>
                <span className="font-mono text-xs text-slate-400 tabular-nums">
                  ±{formatCurrency(prediction.halfWidth)}
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-2.5">
                <p className="font-display text-3xl font-bold tracking-tight text-white tabular-nums">
                  {formatCurrency(prediction.estimate)}
                </p>
                <span className="font-mono text-xs text-slate-400 tabular-nums">
                  ({formatCurrencyExact(prediction.exactEstimate)})
                </span>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>90% Split-Conformal Interval</span>
                  <span className="font-mono tabular-nums text-amber-300">
                    {formatCurrency(prediction.lower)} – {formatCurrency(prediction.upper)}
                  </span>
                </div>
                <div className="relative mt-2 h-2.5 w-full rounded-full bg-white/[0.06]">
                  <div
                    className="absolute top-0 h-2.5 rounded-full bg-gradient-to-r from-amber-500/45 to-orange-500/45 border border-amber-300/60 transition-all duration-150"
                    style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                  />
                  <div
                    className="absolute top-1/2 h-3.5 w-1 -translate-y-1/2 rounded-full bg-white transition-all duration-150"
                    style={{ left: `${pointPct}%` }}
                  />
                </div>
                <div className="mt-1 flex justify-between font-mono text-[11px] text-slate-500 tabular-nums">
                  <span>$0</span>
                  <span>$32.5k</span>
                  <span>$65k</span>
                </div>
              </div>

              {activeHoldoutRow && (
                <div className="mt-3 rounded-lg border border-amber-400/25 bg-amber-400/[0.05] px-3 py-2 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-amber-300 tabular-nums">
                      Holdout Row #{activeHoldoutRow.rowId}
                    </span>
                    <span
                      className={`font-mono tabular-nums ${
                        isActiveRowCovered ? 'text-emerald-300' : 'text-amber-300'
                      }`}
                    >
                      {isActiveRowCovered ? 'Within 90% PI' : 'Upper-Tail Outlier'}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center justify-between gap-2 text-slate-300 tabular-nums">
                    <span>
                      Actual:{' '}
                      <strong className="font-mono text-white">
                        {formatCurrencyExact(activeHoldoutRow.actualCharge)}
                      </strong>
                    </span>
                    <span>
                      Abs Error:{' '}
                      <strong className="font-mono text-white">
                        {formatCurrencyExact(activeHoldoutRow.absError)}
                      </strong>
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 border-t border-white/[0.08] pt-3">
              <div className="flex items-start gap-2">
                {prediction.lowConfidence ? (
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                ) : (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                )}
                <div>
                  <p
                    className={`text-xs font-semibold ${
                      prediction.lowConfidence ? 'text-amber-300' : 'text-emerald-300'
                    }`}
                  >
                    {prediction.lowConfidence
                      ? 'Lower Confidence — Flagged for Review'
                      : 'High Confidence Prediction'}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">{prediction.confidenceReason}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hardcoded Model Evaluation Results & Holdout Validation */}
      <div className="rounded-xl border border-white/[0.08] bg-[#080B12]/90 p-5 sm:p-6">
        <div className="border-b border-white/[0.08] pb-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h4 className="font-display text-base font-semibold text-white">
              Hardcoded Model Evaluation Results
            </h4>
            <span className="font-mono text-xs text-slate-400 tabular-nums">
              {GBR_MODEL_RESULTS.datasetRows.toLocaleString()} Records · {GBR_MODEL_RESULTS.trainRows.toLocaleString()} Train / {GBR_MODEL_RESULTS.testRows} Holdout Test
            </span>
          </div>
          <p className="mt-1 font-mono text-xs text-amber-300 break-all">
            {GBR_MODEL_RESULTS.modelSpec}
          </p>
        </div>

        {/* Primary Hardcoded Metrics Grid */}
        <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-lg border border-white/[0.08] bg-[#0B0F17] px-3.5 py-3">
            <dt className="text-[11px] font-medium text-slate-400">Holdout R²</dt>
            <dd className="mt-1 font-mono text-lg font-bold text-white tabular-nums">
              {GBR_MODEL_RESULTS.holdout.r2.toFixed(4)}
            </dd>
            <dd className="mt-0.5 font-mono text-[11px] text-slate-400 tabular-nums">
              Train fit {GBR_MODEL_RESULTS.trainFit.r2.toFixed(4)}
            </dd>
          </div>
          <div className="rounded-lg border border-white/[0.08] bg-[#0B0F17] px-3.5 py-3">
            <dt className="text-[11px] font-medium text-slate-400">Holdout RMSE</dt>
            <dd className="mt-1 font-mono text-lg font-bold text-white tabular-nums">
              {formatCurrency(GBR_MODEL_RESULTS.holdout.rmse)}
            </dd>
            <dd className="mt-0.5 font-mono text-[11px] text-slate-400 tabular-nums">
              Train {formatCurrency(GBR_MODEL_RESULTS.trainFit.rmse)}
            </dd>
          </div>
          <div className="rounded-lg border border-white/[0.08] bg-[#0B0F17] px-3.5 py-3">
            <dt className="text-[11px] font-medium text-slate-400">Holdout MAE</dt>
            <dd className="mt-1 font-mono text-lg font-bold text-white tabular-nums">
              {formatCurrency(GBR_MODEL_RESULTS.holdout.mae)}
            </dd>
            <dd className="mt-0.5 font-mono text-[11px] text-emerald-300 tabular-nums">
              -36.5% vs OLS MAE
            </dd>
          </div>
          <div className="rounded-lg border border-white/[0.08] bg-[#0B0F17] px-3.5 py-3">
            <dt className="text-[11px] font-medium text-slate-400">90% PI Coverage</dt>
            <dd className="mt-1 font-mono text-lg font-bold text-amber-300 tabular-nums">
              {GBR_MODEL_RESULTS.holdout.conformalCoveragePct}%
            </dd>
            <dd className="mt-0.5 font-mono text-[11px] text-slate-400 tabular-nums">
              {GBR_MODEL_RESULTS.holdout.coveredCount} / {GBR_MODEL_RESULTS.testRows} covered
            </dd>
          </div>
        </dl>

        {/* Benchmark Comparison & Feature Importance */}
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h5 className="text-xs font-semibold tracking-wide text-slate-200">
              Architecture Benchmark (Same 80/20 Holdout Split, n=268)
            </h5>
            <div className="mt-3 overflow-x-auto rounded-lg border border-white/[0.08]">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/[0.08] bg-[#0B0F17] text-slate-400">
                  <tr>
                    <th className="px-3 py-2.5 font-medium">Estimator Configuration</th>
                    <th className="px-3 py-2.5 text-right font-medium">Holdout R²</th>
                    <th className="px-3 py-2.5 text-right font-medium">RMSE</th>
                    <th className="px-3 py-2.5 text-right font-medium">MAE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] tabular-nums">
                  {benchmarkRows.map((row) => (
                    <tr
                      key={row.name}
                      className={row.highlight ? 'bg-amber-400/[0.06]' : 'bg-transparent'}
                    >
                      <td
                        className={`px-3 py-2.5 font-medium ${
                          row.highlight ? 'text-amber-200' : 'text-slate-300'
                        }`}
                      >
                        {row.name}
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono text-white">{row.r2}</td>
                      <td className="px-3 py-2.5 text-right font-mono text-slate-200">{row.rmse}</td>
                      <td className="px-3 py-2.5 text-right font-mono text-slate-200">{row.mae}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
              Note: Depth-4 / lr=0.1 achieves 0.9554 train R² vs 0.8538 holdout R²; reducing tree depth to 3 (lr=0.05) curbs leaf variance and lifts unseen holdout generalization to 0.8812 R².
            </p>
          </div>

          <div className="lg:col-span-5">
            <h5 className="text-xs font-semibold tracking-wide text-slate-200">
              Feature Importance (200 Fitted Trees)
            </h5>
            <div className="mt-3 space-y-2.5">
              {GBR_MODEL_RESULTS.featureImportance.map((item) => (
                <div key={item.key}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">{item.feature}</span>
                    <span className="font-mono text-white tabular-nums">{item.pct.toFixed(2)}%</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-white/[0.06]">
                    <div
                      className="h-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                      style={{ width: `${Math.max(2, item.pct)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Clickable Holdout Test Sample Predictions */}
        <div className="mt-6 border-t border-white/[0.08] pt-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h5 className="text-xs font-semibold tracking-wide text-slate-200">
              Verified Holdout Test Samples (Click any row to load into live simulator)
            </h5>
            <span className="font-mono text-[11px] text-slate-400">
              6 unseen rows from X_test
            </span>
          </div>
          <div className="mt-3 overflow-x-auto rounded-lg border border-white/[0.08]">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/[0.08] bg-[#0B0F17] text-slate-400">
                <tr>
                  <th className="px-3 py-2.5 font-medium">Row</th>
                  <th className="px-3 py-2.5 font-medium">Policyholder Features</th>
                  <th className="px-3 py-2.5 text-right font-medium">Actual Charge</th>
                  <th className="px-3 py-2.5 text-right font-medium">GBR Predicted</th>
                  <th className="px-3 py-2.5 text-right font-medium">Abs Error</th>
                  <th className="px-3 py-2.5 text-right font-medium">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] tabular-nums">
                {GBR_MODEL_RESULTS.sampleHoldoutPredictions.map((sample) => {
                  const isSelected = activeHoldoutRow?.rowId === sample.rowId;
                  return (
                    <tr
                      key={sample.rowId}
                      onClick={() => handleLoadHoldoutRow(sample)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-amber-400/[0.08]'
                          : 'hover:bg-white/[0.03]'
                      }`}
                    >
                      <td className="px-3 py-2.5 font-mono text-amber-300">#{sample.rowId}</td>
                      <td className="px-3 py-2.5 text-slate-300">
                        {sample.age}y · {sample.sex} · BMI {sample.bmi.toFixed(2)} · {sample.children} dep ·{' '}
                        <span className={sample.smoker ? 'text-amber-300 font-medium' : 'text-slate-400'}>
                          {sample.smoker ? 'smoker' : 'non-smoker'}
                        </span>{' '}
                        · {sample.region}
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono text-white">
                        {formatCurrencyExact(sample.actualCharge)}
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono text-emerald-300">
                        {formatCurrencyExact(sample.predictedCharge)}
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono text-slate-300">
                        {formatCurrencyExact(sample.absError)}
                      </td>
                      <td className="px-3 py-2.5 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLoadHoldoutRow(sample);
                          }}
                          className={`rounded border px-2 py-1 text-[11px] font-medium transition-colors whitespace-nowrap ${
                            isSelected
                              ? 'border-amber-400/60 bg-amber-400/15 text-amber-200'
                              : 'border-white/[0.12] bg-white/[0.03] text-slate-300 hover:border-amber-400/40 hover:text-white'
                          }`}
                        >
                          {isSelected ? 'Loaded' : 'Load Row'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
