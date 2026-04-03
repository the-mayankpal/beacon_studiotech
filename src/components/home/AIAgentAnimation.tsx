import { motion } from 'motion/react';
import React, { useState, useEffect } from 'react';

const SatelliteLabel = ({ label, x, y, delay }: { label: string; x: number; y: number; delay: number; key?: React.Key }) => (
  <foreignObject 
    x={x - 70} 
    y={y - 22.5} 
    width="140" 
    height="45" 
    className="overflow-visible"
  >
    <div
      style={{ 
        animation: `fadeInScale 0.4s ease-out forwards`,
        animationDelay: `${delay}s`,
        opacity: 0,
        transform: 'scale(0.8)',
        transformOrigin: 'center'
      }}
      className="w-full h-full flex items-center justify-center px-4 py-2 bg-white rounded-full border border-[#1a1a1a] shadow-[0_2px_10px_rgba(0,0,0,0.03)]"
    >
      <span className="text-[18px] font-sans font-semibold text-[#1a1a1a] tracking-tight whitespace-nowrap">
        {label}
      </span>
    </div>
  </foreignObject>
);

const Ring = ({ cx, cy, rx, ry, delay }: { cx: number; cy: number; rx: number; ry: number; delay: number }) => (
  <ellipse
    cx={cx}
    cy={cy}
    rx={rx}
    ry={ry}
    fill="none"
    stroke="#e5e7eb"
    strokeWidth="1.5"
    style={{
      animation: 'ringPulse 3s ease-in-out infinite',
      animationDelay: `${delay}s`,
      transformOrigin: `${cx}px ${cy}px`
    }}
  />
);

export default function AIAgentAnimation() {
  const centerImg = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800";
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.innerWidth >= 1024);
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Standard (Mobile/Tablet) vs Expanded (Desktop) coordinates
  const cfg = isDesktop ? {
    viewBox: "0 0 800 480",
    cx: 400,
    cy: 240,
    hubW: 210,
    hubH: 90,
    hDist: 255, // 225 + 30
    vDist: 175, // 145 + 30
  } : {
    viewBox: "0 0 600 400",
    cx: 300,
    cy: 200,
    hubW: 210,
    hubH: 90,
    hDist: 225, 
    vDist: 145,
  };

  const labels = [
    { id: "calls", label: "Calls", x: cfg.cx, y: cfg.cy - cfg.vDist, delay: 0.6 },
    { id: "follow-ups", label: "Follow-ups", x: cfg.cx + cfg.hDist, y: cfg.cy, delay: 0.7 },
    { id: "emails", label: "Emails", x: cfg.cx, y: cfg.cy + cfg.vDist, delay: 0.8 },
    { id: "appointments", label: "Appointments", x: cfg.cx - cfg.hDist, y: cfg.cy, delay: 0.9 },
  ];

  // Logic for lines and dots (0.6s draw time)
  // Directions must be OUTWARD from center to label
  const connectors = [
    { 
      // Top: Calls (Starts at Hub end, draws to Label end)
      x1: cfg.cx, y1: cfg.cy - cfg.hubH/2 - 10,
      x2: cfg.cx, y2: cfg.cy - cfg.vDist + 22.5 + 2,
      id: "line-top"
    },
    { 
      // Bottom: Emails
      x1: cfg.cx, y1: cfg.cy + cfg.hubH/2 + 10,
      x2: cfg.cx, y2: cfg.cy + cfg.vDist - 22.5 - 2,
      id: "line-bottom"
    },
    { 
      // Left: Appointments
      x1: cfg.cx - cfg.hubW/2 - 10, y1: cfg.cy,
      x2: cfg.cx - cfg.hDist + 70 + 2, y2: cfg.cy,
      id: "line-left"
    },
    { 
      // Right: Follow-ups
      x1: cfg.cx + cfg.hubW/2 + 10, y1: cfg.cy,
      x2: cfg.cx + cfg.hDist - 70 - 2, y2: cfg.cy,
      id: "line-right"
    },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <style>{`
        @keyframes drawLine {
          from { stroke-dashoffset: var(--length); }
          to { stroke-dashoffset: 0; }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes ringPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.02); }
        }
        @keyframes kenBurns {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        @keyframes travelDotMove {
          0% { transform: translate(var(--startX), var(--startY)); }
          42.857% { transform: translate(var(--endX), var(--endY)); }
          100% { transform: translate(var(--endX), var(--endY)); }
        }
        @keyframes travelDotOpacity {
          0% { opacity: 0; }
          2% { opacity: 1; }
          42.857% { opacity: 1; }
          45.714% { opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>

      {/* 1.22x Scale Wrapper: Only applies on desktop (>= 1024px) */}
      <div className="w-full h-full flex items-center justify-center transition-transform lg:scale-[1.22] lg:origin-center">
        {/* SVG Container */}
        <svg 
          viewBox={cfg.viewBox} 
          className="w-full h-auto max-w-[420px] mx-auto overflow-visible px-6"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Rings */}
          <Ring cx={cfg.cx} cy={cfg.cy} rx={cfg.hubW/2 + 10} ry={cfg.hubH/2 + 10} delay={0} />
          <Ring cx={cfg.cx} cy={cfg.cy} rx={cfg.hubW/2 + 20} ry={cfg.hubH/2 + 20} delay={0.2} />
          <Ring cx={cfg.cx} cy={cfg.cy} rx={cfg.hubW/2 + 30} ry={cfg.hubH/2 + 30} delay={0.4} />

          {/* Connector Lines + Traveling Dots */}
          {connectors.map((c) => {
            const length = Math.sqrt(Math.pow(c.x2 - c.x1, 2) + Math.pow(c.y2 - c.y1, 2));
            return (
              <g key={c.id}>
                {/* Main Line */}
                <line 
                  x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} 
                  stroke="#cccccc" strokeWidth="1.5" 
                  strokeDasharray={length}
                  strokeDashoffset={length}
                  style={{ 
                    '--length': `${length}px`,
                    animation: 'drawLine 0.6s ease-in-out forwards',
                  } as React.CSSProperties}
                />
                {/* Traveling Dot (4px) */}
                <circle
                  r="2"
                  fill="#1a1a1a"
                  cx="0"
                  cy="0"
                  style={{
                    '--startX': `${c.x1}px`,
                    '--startY': `${c.y1}px`,
                    '--endX': `${c.x2}px`,
                    '--endY': `${c.y2}px`,
                    animation: 'travelDotMove 3.5s ease-in-out infinite 1.2s, travelDotOpacity 3.5s linear infinite 1.2s',
                    opacity: 0,
                  } as React.CSSProperties}
                />
              </g>
            );
          })}

          {/* Labels: Positioned in dynamic coordinate space */}
          {labels.map(item => (
            <SatelliteLabel 
              key={item.id} 
              label={item.label}
              x={item.x}
              y={item.y}
              delay={item.delay}
            />
          ))}

          {/* Central Hub Pill */}
          <foreignObject x={cfg.cx - cfg.hubW/2} y={cfg.cy - cfg.hubH/2} width={cfg.hubW} height={cfg.hubH} className="overflow-visible">
            <div
              style={{
                opacity: 0,
                animation: 'fadeInScale 0.6s ease-out forwards',
              }}
              className="w-full h-full rounded-[999px] overflow-hidden border-2 border-white shadow-[0_15px_35px_rgba(0,0,0,0.1)] relative flex items-center justify-center bg-gray-100"
            >
              <img 
                src={centerImg}
                alt="AI Hub"
                style={{
                  animation: 'kenBurns 10s linear infinite',
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <h4 className="relative z-10 text-white font-sans text-[26px] font-bold tracking-tight uppercase">
                AI Agent
              </h4>
            </div>
          </foreignObject>
        </svg>
      </div>
    </div>
  );
}
