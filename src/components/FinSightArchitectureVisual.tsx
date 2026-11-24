interface FinSightArchitectureVisualProps {
  compact?: boolean;
}

export function FinSightArchitectureVisual({ compact = false }: FinSightArchitectureVisualProps) {
  return (
    <svg
      viewBox="0 0 820 460"
      className="h-full w-full select-none bg-[#060910]"
      role="img"
      aria-label="FinSight Financial Intelligence multi-service Vite and FastAPI architecture, serverless optimization metrics, 2030 forecasting benchmark, and exact SHAP pipeline"
    >
      <defs>
        <linearGradient id="fs-amber-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id="fs-emerald-area" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#34D399" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#34D399" stopOpacity="0.02" />
        </linearGradient>
        <marker
          id="fs-arrow-amber"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5.5"
          markerHeight="5.5"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#F59E0B" />
        </marker>
        <marker
          id="fs-arrow-sky"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5.5"
          markerHeight="5.5"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#38BDF8" />
        </marker>
      </defs>

      {/* Subtle architectural grid */}
      <rect width="820" height="460" fill="#060910" />
      <g stroke="rgba(255,255,255,0.035)" strokeWidth="1">
        <line x1="0" y1="68" x2="820" y2="68" />
        <line x1="0" y1="224" x2="820" y2="224" />
        <line x1="0" y1="348" x2="820" y2="348" />
      </g>

      {/* Header Strip */}
      <text
        x="28"
        y="34"
        fill="#FBBF24"
        fontSize={compact ? '11' : '10.5'}
        fontFamily="JetBrains Mono, monospace"
        fontWeight="600"
      >
        FINSIGHT FINANCIAL INTELLIGENCE · VERCEL MULTI-SERVICE ARCHITECTURE
      </text>
      <text
        x="28"
        y="53"
        fill="#94A3B8"
        fontSize="11"
        fontFamily="Plus Jakarta Sans, sans-serif"
      >
        10-Year Macro &amp; Op-Profit Ledger · Dec 2030 Horizon · Pure-NumPy ML &amp; Exact SHAP
      </text>

      {/* Top Row: Frontend Service -> API -> Pure-NumPy ML Engine */}
      {/* Node 1: Frontend */}
      <rect
        x="28"
        y="86"
        width="216"
        height="118"
        rx="10"
        fill="#0B0F17"
        stroke="rgba(56,189,248,0.4)"
        strokeWidth="1.2"
      />
      <text x="44" y="109" fill="#7DD3FC" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="600">
        01 · VITE FRONTEND
      </text>
      <text x="44" y="131" fill="#F8FAFC" fontSize="14" fontWeight="600" fontFamily="Outfit, sans-serif">
        React + TS + Recharts
      </text>
      <text x="44" y="150" fill="#94A3B8" fontSize="10.5" fontFamily="Plus Jakarta Sans, sans-serif">
        5-Yr Accounting Simulator &amp; PDF
      </text>
      <line x1="44" y1="164" x2="228" y2="164" stroke="rgba(255,255,255,0.08)" />
      <text x="44" y="185" fill="#6EE7B7" fontSize="10.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
        Bundle: ~3 MB → ~100 KB
      </text>

      {/* Arrow 1 -> 2 */}
      <path
        d="M 244 145 L 292 145"
        stroke="#38BDF8"
        strokeWidth="1.75"
        fill="none"
        markerEnd="url(#fs-arrow-sky)"
        className="svg-flow-line"
      />

      {/* Node 2: FastAPI + lightweight_ml.py */}
      <rect
        x="296"
        y="86"
        width="244"
        height="118"
        rx="10"
        fill="#0B0F17"
        stroke="#F59E0B"
        strokeWidth="1.5"
      />
      <text x="312" y="109" fill="#FBBF24" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="600">
        02 · FASTAPI + LIGHTWEIGHT_ML
      </text>
      <text x="312" y="131" fill="#FFFFFF" fontSize="14" fontWeight="600" fontFamily="Outfit, sans-serif">
        Pure-NumPy ML &amp; ETS Engine
      </text>
      <text x="312" y="150" fill="#94A3B8" fontSize="10.5" fontFamily="Plus Jakarta Sans, sans-serif">
        16 Lag Features · 11 Benchmark Models
      </text>
      <line x1="312" y1="164" x2="524" y2="164" stroke="rgba(255,255,255,0.08)" />
      <text x="312" y="185" fill="#FDE68A" fontSize="10.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
        1.3 GB → 167 MB · Cold: 1.2s
      </text>

      {/* Arrow 2 -> 3 */}
      <path
        d="M 540 145 L 584 145"
        stroke="#F59E0B"
        strokeWidth="1.75"
        fill="none"
        markerEnd="url(#fs-arrow-amber)"
        className="svg-flow-line"
      />

      {/* Node 3: 2030 Forecast Curve Preview */}
      <rect
        x="588"
        y="86"
        width="204"
        height="118"
        rx="10"
        fill="#0B0F17"
        stroke="rgba(52,211,153,0.45)"
        strokeWidth="1.2"
      />
      <text x="604" y="109" fill="#6EE7B7" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="600">
        03 · DEC 2030 FORECAST
      </text>
      {/* Mini Forecast Sparkline + Interval Cone */}
      <path
        d="M 606 168 L 636 163 L 666 157 L 696 150 L 728 139 L 768 122 L 768 150 L 728 158 L 696 164 L 666 168 L 636 171 L 606 172 Z"
        fill="url(#fs-emerald-area)"
      />
      <path
        d="M 606 170 L 636 167 L 666 162 L 696 156 L 728 147 L 768 134"
        fill="none"
        stroke="#34D399"
        strokeWidth="2"
      />
      <line x1="696" y1="126" x2="696" y2="176" stroke="rgba(245,158,11,0.55)" strokeDasharray="3 3" />
      <text x="604" y="191" fill="#CBD5E1" fontSize="9.5" fontFamily="JetBrains Mono, monospace">
        18-Mo Holdout + 4 Backtests
      </text>

      {/* Middle Row: 3 Analytical Intelligence Pillars */}
      {/* Pillar A: Hypothesis Lab */}
      <rect
        x="28"
        y="240"
        width="244"
        height="92"
        rx="10"
        fill="#0B0F17"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1"
      />
      <text x="44" y="263" fill="#FBBF24" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="600">
        HYPOTHESIS TESTING LAB
      </text>
      <text x="44" y="284" fill="#F8FAFC" fontSize="13" fontWeight="600" fontFamily="Outfit, sans-serif">
        6 Automated Statistical Tests
      </text>
      <text x="44" y="303" fill="#94A3B8" fontSize="10" fontFamily="Plus Jakarta Sans, sans-serif">
        Mann-Kendall · Kruskal-Wallis · HLN-DM
      </text>
      <text x="44" y="319" fill="#CBD5E1" fontSize="9.5" fontFamily="JetBrains Mono, monospace">
        ETS(M,N,M) · RF · GBR · Ridge · AR
      </text>

      {/* Pillar B: Exact SHAP & Anomaly */}
      <rect
        x="288"
        y="240"
        width="244"
        height="92"
        rx="10"
        fill="#0B0F17"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1"
      />
      <text x="304" y="263" fill="#FB923C" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="600">
        EXPLAINABLE AI &amp; DRIFT
      </text>
      <text x="304" y="284" fill="#F8FAFC" fontSize="13" fontWeight="600" fontFamily="Outfit, sans-serif">
        Exact TreeSHAP &amp; LinearSHAP
      </text>
      <text x="304" y="303" fill="#94A3B8" fontSize="10" fontFamily="Plus Jakarta Sans, sans-serif">
        Global/Local Attributions + Isolation Forest
      </text>
      <text x="304" y="319" fill="#CBD5E1" fontSize="9.5" fontFamily="JetBrains Mono, monospace">
        FX Pass-Through · COGS · OpEx Drivers
      </text>

      {/* Pillar C: Graphical RAG Analyst */}
      <rect
        x="548"
        y="240"
        width="244"
        height="92"
        rx="10"
        fill="#0B0F17"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1"
      />
      <text x="564" y="263" fill="#7DD3FC" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="600">
        GRAPHICAL RAG ANALYST
      </text>
      <text x="564" y="284" fill="#F8FAFC" fontSize="13" fontWeight="600" fontFamily="Outfit, sans-serif">
        Row-Grounded Q&amp;A &amp; Exports
      </text>
      <text x="564" y="303" fill="#94A3B8" fontSize="10" fontFamily="Plus Jakarta Sans, sans-serif">
        Ledger Retrieval + Server Gemini API
      </text>
      <text x="564" y="319" fill="#CBD5E1" fontSize="9.5" fontFamily="JetBrains Mono, monospace">
        One-Click CSV &amp; jsPDF Exec Reports
      </text>

      {/* Bottom Optimization Benchmark Bar */}
      <rect
        x="28"
        y="364"
        width="764"
        height="70"
        rx="10"
        fill="#090D16"
        stroke="rgba(245,158,11,0.28)"
        strokeWidth="1.1"
      />
      <text x="46" y="388" fill="#94A3B8" fontSize="10" fontFamily="Plus Jakarta Sans, sans-serif">
        Python Serverless Footprint
      </text>
      <text x="46" y="414" fill="#FFFFFF" fontSize="15" fontWeight="700" fontFamily="JetBrains Mono, monospace">
        1.3 GB → 167 MB
      </text>

      <line x1="280" y1="378" x2="280" y2="420" stroke="rgba(255,255,255,0.08)" />
      <text x="304" y="388" fill="#94A3B8" fontSize="10" fontFamily="Plus Jakarta Sans, sans-serif">
        Cold Import Time
      </text>
      <text x="304" y="414" fill="#FBBF24" fontSize="15" fontWeight="700" fontFamily="JetBrains Mono, monospace">
        28.6s → ~1.2s
      </text>

      <line x1="536" y1="378" x2="536" y2="420" stroke="rgba(255,255,255,0.08)" />
      <text x="560" y="388" fill="#94A3B8" fontSize="10" fontFamily="Plus Jakarta Sans, sans-serif">
        Frontend Initial JS Bundle
      </text>
      <text x="560" y="414" fill="#6EE7B7" fontSize="15" fontWeight="700" fontFamily="JetBrains Mono, monospace">
        ~3 MB → ~100 KB
      </text>
    </svg>
  );
}
