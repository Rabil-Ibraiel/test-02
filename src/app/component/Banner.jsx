// components/GradientLogoStack.jsx
export default function GradientLogoStack({
  width = 320,
  height = 320,
  radius = 16,
  logoHref = "/logo.svg",
  logoSize = 180,
  gradient = ["#4f46e5", "#22d3ee"],
  gradientId = "bgGrad",
}) {
  return (
    <div className="relative" style={{ width, height }}>
      {/* parent gradient svg */}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={gradient[0]} />
            <stop offset="100%" stopColor={gradient[1]} />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" rx={radius} fill={`url(#${gradientId})`} />
      </svg>

      {/* child logo svg centered */}
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        width={logoSize}
        height={logoSize}
        viewBox={`0 0 ${logoSize} ${logoSize}`}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Logo"
      >
        {/* if your logo is a full svg file, use <image>. 
            If you have paths, paste them here instead */}
        <image
          href={logoHref}
          width={logoSize}
          height={logoSize}
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>
    </div>
  );
}
