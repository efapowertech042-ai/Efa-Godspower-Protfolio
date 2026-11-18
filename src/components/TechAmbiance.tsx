export function TechAmbiance() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0C121E]"
    >
      {/* Luminous Slate-Charcoal Base Gradient */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(155deg, #0B101B 0%, #151F30 46%, #111927 78%, #0B101A 100%)',
        }}
      />

      {/* Brighter Relational Atmospheric Lighting: Burnished Amber & Warm Copper */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            'radial-gradient(ellipse 68% 58% at 78% 18%, rgba(245, 158, 11, 0.17), transparent 68%)',
            'radial-gradient(ellipse 56% 52% at 14% 28%, rgba(234, 88, 12, 0.13), transparent 65%)',
            'radial-gradient(ellipse 62% 54% at 70% 86%, rgba(234, 88, 12, 0.11), transparent 68%)',
            'radial-gradient(ellipse 54% 48% at 24% 88%, rgba(251, 191, 36, 0.11), transparent 65%)',
          ].join(', '),
        }}
      />

      {/* Precision Architectural Coordinate Grid */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(203, 213, 225, 0.065) 1px, transparent 1px), linear-gradient(to bottom, rgba(203, 213, 225, 0.065) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse 90% 84% at 50% 42%, #000 35%, rgba(0,0,0,0.45) 75%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 84% at 50% 42%, #000 35%, rgba(0,0,0,0.45) 75%, transparent 100%)',
        }}
      />

      {/* Computational Vector Arcs */}
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.26]"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="1120" cy="240" r="320" stroke="url(#globalAmberRing)" strokeWidth="1.1" />
        <circle
          cx="1120"
          cy="240"
          r="460"
          stroke="url(#globalAmberRing)"
          strokeWidth="0.85"
          strokeDasharray="6 10"
        />
        <circle cx="240" cy="760" r="280" stroke="url(#globalCopperRing)" strokeWidth="0.95" />
        <path
          d="M-80 640 C 310 470, 660 540, 1020 310 C 1200 195, 1350 155, 1520 115"
          stroke="url(#globalMetallicArc)"
          strokeWidth="1.35"
        />
        <path
          d="M-60 710 C 350 560, 710 610, 1080 390 C 1250 285, 1380 245, 1520 220"
          stroke="url(#globalMetallicArc)"
          strokeWidth="0.9"
          strokeOpacity="0.65"
        />
        <defs>
          <linearGradient id="globalAmberRing" x1="800" y1="0" x2="1420" y2="560" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBBF24" stopOpacity="0.55" />
            <stop offset="1" stopColor="#EA580C" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="globalCopperRing" x1="0" y1="500" x2="520" y2="900" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FB923C" stopOpacity="0.45" />
            <stop offset="1" stopColor="#F59E0B" stopOpacity="0.06" />
          </linearGradient>
          <linearGradient id="globalMetallicArc" x1="0" y1="680" x2="1440" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EA580C" stopOpacity="0.12" />
            <stop offset="0.5" stopColor="#F59E0B" stopOpacity="0.52" />
            <stop offset="1" stopColor="#FBBF24" stopOpacity="0.24" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
