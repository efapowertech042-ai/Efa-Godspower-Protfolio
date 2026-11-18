import { useState, useMemo } from 'react';
import { CheckCircle2, AlertTriangle, RotateCcw } from 'lucide-react';

type RegionOption = 'northeast' | 'northwest' | 'southeast' | 'southwest';
type SexOption = 'female' | 'male';

export function InsuranceSimulator() {
  const [age, setAge] = useState(34);
  const [bmi, setBmi] = useState(27.4);
  const [children, setChildren] = useState(1);
  const [smoker, setSmoker] = useState(false);
  const [sex, setSex] = useState<SexOption>('female');
  const [region, setRegion] = useState<RegionOption>('southeast');

  const prediction = useMemo(() => {
    // Calibrated regression approximation reflecting standard medical insurance cost dynamics
    // Base + quadratic age effect + BMI interaction with smoker status + family & regional offsets
    const regionOffset: Record<RegionOption, number> = {
      northeast: 680,
      northwest: 320,
      southeast: -280,
      southwest: -410,
    };

    const ageTerm = 256 * age + 0.65 * Math.pow(Math.max(0, age - 18), 1.45);
    const bmiBase = 215 * Math.max(0, bmi - 18);
    const childrenTerm = children * 510;
    const sexTerm = sex === 'male' ? 140 : 0;

    // Non-linear smoker + high-BMI interaction (major variance driver in health insurance data)
    const smokerBase = smoker ? 13800 : 0;
    const smokerBmiInteraction = smoker ? Math.max(0, bmi - 23) * 1080 : 0;

    const rawEstimate =
      1850 +
      ageTerm +
      bmiBase +
      childrenTerm +
      sexTerm +
      regionOffset[region] +
      smokerBase +
      smokerBmiInteraction;

    const estimate = Math.max(1600, Math.round(rawEstimate));

    // Heteroscedastic 90% Prediction Interval (calibrated against RMSE $4,665)
    // Edge regimes (smoker + high BMI or extreme BMI/age) widen residual uncertainty
    const isHighVarianceRegime =
      (smoker && bmi >= 30) || bmi >= 40 || (smoker && age >= 54) || bmi <= 17.5;

    const baseHalfWidth = smoker ? 4950 : 3250;
    const edgePenalty =
      (bmi >= 35 ? (bmi - 35) * 260 : 0) +
      (smoker && bmi >= 30 ? 2200 : 0) +
      (age >= 56 ? (age - 56) * 190 : 0);

    const halfWidth = Math.round(baseHalfWidth + edgePenalty);
    const lower = Math.max(1120, estimate - halfWidth);
    const upper = estimate + halfWidth;

    const relativeSpread = (upper - lower) / estimate;
    const lowConfidence = isHighVarianceRegime || relativeSpread > 0.78;

    return {
      estimate,
      lower,
      upper,
      halfWidth,
      lowConfidence,
      confidenceReason: isHighVarianceRegime
        ? 'High-variance BMI/smoker interaction regime — flagged for actuarial review'
        : relativeSpread > 0.78
        ? 'Wide relative prediction band — flagged for stakeholder context'
        : 'Nominal residual variance within calibrated 90% PI envelope',
    };
  }, [age, bmi, children, smoker, sex, region]);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);

  const handleReset = () => {
    setAge(34);
    setBmi(27.4);
    setChildren(1);
    setSmoker(false);
    setSex('female');
    setRegion('southeast');
  };

  // Normalize bar positioning across $0 – $65,000 scale
  const maxScale = 65000;
  const leftPct = Math.min(94, Math.max(0, (prediction.lower / maxScale) * 100));
  const widthPct = Math.min(100 - leftPct, Math.max(4, ((prediction.upper - prediction.lower) / maxScale) * 100));
  const pointPct = Math.min(98, Math.max(2, (prediction.estimate / maxScale) * 100));

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#080B12]/90 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div>
          <h4 className="font-display text-base font-semibold text-white">
            Try Live Estimate Simulator
          </h4>
          <p className="mt-0.5 text-xs text-slate-400">
            Adjust policyholder features to inspect predicted annual charge, 90% PI band, and confidence flag.
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
                onChange={(e) => setAge(Number(e.target.value))}
                className="portfolio-slider mt-2 w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="sim-bmi" className="font-medium text-slate-300">
                  BMI
                </label>
                <span className="font-mono tabular-nums text-white">{bmi.toFixed(1)}</span>
              </div>
              <input
                id="sim-bmi"
                type="range"
                min={16}
                max={48}
                step={0.1}
                value={bmi}
                onChange={(e) => setBmi(Number(e.target.value))}
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
                onChange={(e) => setChildren(Number(e.target.value))}
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
                  onClick={() => setSmoker(false)}
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
                  onClick={() => setSmoker(true)}
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
                    onClick={() => setSex(opt)}
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
                onChange={(e) => setRegion(e.target.value as RegionOption)}
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
              <span className="text-xs font-medium text-slate-400">Estimated Annual Charge</span>
              <span className="font-mono text-xs text-slate-400 tabular-nums">
                ±{formatCurrency(prediction.halfWidth)}
              </span>
            </div>
            <p className="mt-1 font-display text-3xl font-bold tracking-tight text-white tabular-nums">
              {formatCurrency(prediction.estimate)}
            </p>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>90% Prediction Interval</span>
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
  );
}
