import React, { useId } from 'react';

export interface PostageStampProps {
  width?: number;
  height?: number;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function PostageStamp({
  width = 280,
  height = 220,
  children,
  className = '',
  style = {},
}: PostageStampProps) {
  // Use a unique ID for the SVG mask and scoped styles to prevent conflicts
  const uniqueId = useId().replace(/:/g, '-');
  
  // Hole specifications for the perforations
  const holeRadius = 4;
  const targetStep = 16;
  
  // Calculate evenly spaced perforations along edges
  const xHoles = Math.round(width / targetStep);
  const yHoles = Math.round(height / targetStep);
  
  const stepX = width / xHoles;
  const stepY = height / yHoles;

  const perforations = [];
  
  // Top and Bottom edge perforations
  for (let i = 0; i <= xHoles; i++) {
    const cx = i * stepX;
    perforations.push(<circle key={`t-${i}`} cx={cx} cy={0} r={holeRadius} fill="black" />);
    perforations.push(<circle key={`b-${i}`} cx={cx} cy={height} r={holeRadius} fill="black" />);
  }
  
  // Left and Right edge perforations (skipping corners to avoid overlap)
  for (let i = 1; i < yHoles; i++) {
    const cy = i * stepY;
    perforations.push(<circle key={`l-${i}`} cx={0} cy={cy} r={holeRadius} fill="black" />);
    perforations.push(<circle key={`r-${i}`} cx={width} cy={cy} r={holeRadius} fill="black" />);
  }

  // Margin for the inner content matches the exact diameter of the holes
  const margin = Math.round(holeRadius * 2); // ~8px

  return (
    <div 
      className={`stamp-container-${uniqueId} relative inline-block cursor-default ${className}`}
      style={style}
    >
      <style>{`
        .stamp-item-${uniqueId} {
          width: ${width}px;
          height: ${height}px;
          transform: rotate(-4deg);
          filter: drop-shadow(0 4px 20px rgba(0,0,0,0.10));
          transition: all 0.3s ease;
        }
        .stamp-container-${uniqueId}:hover .stamp-item-${uniqueId} {
          transform: rotate(-1deg) translateY(-2px);
          filter: drop-shadow(0 8px 25px rgba(0,0,0,0.15));
        }
      `}</style>
      
      <div className={`stamp-item-${uniqueId}`}>
        {/* SVG Base that handles the perforated mask shape */}
        <svg 
          width={width} 
          height={height} 
          className="absolute inset-0 block overflow-visible z-10 pointer-events-none"
        >
          <defs>
            <mask id={`stamp-mask-${uniqueId}`}>
              {/* White background means visible */}
              <rect width={width} height={height} fill="white" />
              {/* Black circles create the cutout holes */}
              {perforations}
            </mask>
          </defs>
          
          {/* The actual solid shape of the stamp base */}
          <rect 
            width={width} 
            height={height} 
            fill="#ffffff" 
            mask={`url(#stamp-mask-${uniqueId})`} 
          />
        </svg>
        
        {/* Content Box (The area for the actual image or child content) */}
        <div 
          className="absolute z-20"
          style={{
            top: margin,
            left: margin,
            right: margin,
            bottom: margin,
          }}
        >
          {/* Inner frame styling */}
          <div className="w-full h-full bg-[#f0f0f0] border border-[#e5e5e5] relative overflow-hidden flex flex-col items-center justify-center">
            {children}
            
            {/* Fake faint circular postmark overlay (optional authenticity detail) */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border-[1.5px] border-[#1a1a1a]/15 flex items-center justify-center pointer-events-none z-30">
              <div className="w-16 h-16 rounded-full border-[1.5px] border-[#1a1a1a]/15"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
