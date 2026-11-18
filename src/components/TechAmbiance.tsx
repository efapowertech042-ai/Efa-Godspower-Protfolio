export function TechAmbiance() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#05070B]"
    >
      {/* Darker Deep Carbon-Obsidian Base Gradient */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(160deg, #04060A 0%, #090D16 46%, #06090F 78%, #040508 100%)',
        }}
      />

      {/* Subtler, Darker Relational Atmospheric Lighting: Burnished Amber & Warm Copper */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            'radial-gradient(ellipse 65% 55% at 78% 18%, rgba(245, 158, 11, 0.085), transparent 68%)',
            'radial-gradient(ellipse 55% 50% at 14% 28%, rgba(234, 88, 12, 0.065), transparent 65%)',
            'radial-gradient(ellipse 60% 52% at 70% 86%, rgba(234, 88, 12, 0.055), transparent 68%)',
            'radial-gradient(ellipse 52% 46% at 24% 88%, rgba(217, 119, 6, 0.06), transparent 65%)',
          ].join(', '),
        }}
      />

      {/* Darker Precision Architectural Coordinate Grid */}
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(148, 163, 184, 0.038) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.038) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse 88% 82% at 50% 42%, #000 30%, rgba(0,0,0,0.35) 72%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 88% 82% at 50% 42%, #000 30%, rgba(0,0,0,0.35) 72%, transparent 100%)',
        }}
      />

      {/* Darker Subtle Computational Vector Arcs */}
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.12]"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="1120" cy="240" r="320" stroke="url(#globalAmberRing)" strokeWidth="1" />
        <circle
          cx="1120"
          cy="240"
          r="460"
          stroke="url(#globalAmberRing)"
          strokeWidth="0.75"
          strokeDasharray="6 10"
        />
        <circle cx="240" cy="760" r="280" stroke="url(#globalCopperRing)" strokeWidth="0.85" />
        <path
          d="M-80 640 C 310 470, 660 540, 1020 310 C 1200 195, 1350 155, 1520 115"
          stroke="url(#globalMetallicArc)"
          strokeWidth="1.2"
        />
        <path
          d="M-60 710 C 350 560, 710 610, 1080 390 C 1250 285, 1380 245, 1520 220"
          stroke="url(#globalMetallicArc)"
          strokeWidth="0.8"
          strokeOpacity="0.55"
        />
        <defs>
          <linearGradient id="globalAmberRing" x1="800" y1="0" x2="1420" y2="560" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBBF24" stopOpacity="0.45" />
            <stop offset="1" stopColor="#EA580C" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="globalCopperRing" x1="0" y1="500" x2="520" y2="900" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FB923C" stopOpacity="0.35" />
            <stop offset="1" stopColor="#F59E0B" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="globalMetallicArc" x1="0" y1="680" x2="1440" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EA580C" stopOpacity="0.08" />
            <stop offset="0.5" stopColor="#F59E0B" stopOpacity="0.42" />
            <stop offset="1" stopColor="#FBBF24" stopOpacity="0.16" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
