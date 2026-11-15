import { FACTOR_LABELS, type ScienceProfile } from '../data/analogueData';

interface RadarChartProps {
  targetLabel: string;
  targetProfile: ScienceProfile;
  earthLabel: string;
  earthProfile: ScienceProfile;
}

const AXES: (keyof ScienceProfile)[] = [
  'geomorphology',
  'mineralogy',
  'thermalAridity',
  'solarPowerAnalogue',
  'operationsLogistics',
];

export function RadarChart({
  targetLabel,
  targetProfile,
  earthLabel,
  earthProfile,
}: RadarChartProps) {
  const size = 320;
  const center = size / 2;
  const maxRadius = 104;
  const levels = [25, 50, 75, 100];

  const getPoint = (axisIndex: number, value: number) => {
    const angle = (Math.PI * 2 * axisIndex) / AXES.length - Math.PI / 2;
    const radius = (value / 100) * maxRadius;
    return {
      x: center + Math.cos(angle) * radius,
      y: center + Math.sin(angle) * radius,
    };
  };

  const buildPolygonPoints = (profile: ScienceProfile) =>
    AXES.map((key, idx) => {
      const pt = getPoint(idx, profile[key]);
      return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
    }).join(' ');

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-auto w-full max-w-[320px]"
        role="img"
        aria-label={`Radar chart comparing ${targetLabel} and ${earthLabel} across five analogue parameters using sample demonstration values`}
      >
        {/* Polygonal grid rings */}
        {levels.map((level) => {
          const pts = AXES.map((_, idx) => {
            const p = getPoint(idx, level);
            return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
          }).join(' ');
          return (
            <polygon
              key={level}
              points={pts}
              fill="none"
              stroke="#1E293B"
              strokeWidth={1}
            />
          );
        })}

        {/* Radial axes */}
        {AXES.map((key, idx) => {
          const outer = getPoint(idx, 100);
          const labelPt = getPoint(idx, 126);
          const textAnchor =
            Math.abs(labelPt.x - center) < 10
              ? 'middle'
              : labelPt.x > center
              ? 'start'
              : 'end';

          return (
            <g key={key}>
              <line
                x1={center}
                y1={center}
                x2={outer.x}
                y2={outer.y}
                stroke="#1E293B"
                strokeWidth={1}
              />
              <text
                x={labelPt.x}
                y={labelPt.y}
                textAnchor={textAnchor}
                dominantBaseline="central"
                className="fill-slate-300 font-mono text-[10px] uppercase tracking-wider"
              >
                {FACTOR_LABELS[key].short}
              </text>
            </g>
          );
        })}

        {/* Target World Polygon (Cyan) */}
        <polygon
          points={buildPolygonPoints(targetProfile)}
          fill="rgba(34, 211, 238, 0.18)"
          stroke="#22D3EE"
          strokeWidth={2}
        />

        {/* Earth Analogue Polygon (Purple) */}
        <polygon
          points={buildPolygonPoints(earthProfile)}
          fill="rgba(168, 85, 247, 0.16)"
          stroke="#A855F7"
          strokeWidth={2}
          strokeDasharray="4 3"
        />

        {/* Vertex dots */}
        {AXES.map((key, idx) => {
          const tPt = getPoint(idx, targetProfile[key]);
          const ePt = getPoint(idx, earthProfile[key]);
          return (
            <g key={`dots-${key}`}>
              <circle cx={tPt.x} cy={tPt.y} r={3} fill="#22D3EE" />
              <circle cx={ePt.x} cy={ePt.y} r={3} fill="#A855F7" />
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="mt-2 flex flex-wrap items-center justify-center gap-5 text-xs">
        <div className="flex items-center gap-2 text-slate-200">
          <span className="inline-block h-0.5 w-4 bg-cyan-400" aria-hidden="true" />
          <span className="truncate max-w-[160px]">{targetLabel}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-200">
          <span
            className="inline-block h-0.5 w-4 border-t-2 border-dashed border-purple-400"
            aria-hidden="true"
          />
          <span className="truncate max-w-[160px]">{earthLabel}</span>
        </div>
      </div>
    </div>
  );
}
