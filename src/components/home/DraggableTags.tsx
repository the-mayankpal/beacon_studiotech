import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'motion/react';
import { ArrowUpRight, PenNib, ChartBar, Globe, Code, Layout as LayoutIcon, X } from '@phosphor-icons/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// Helper to convert hex to rgba
function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const tagsData = [
  {
    id: "landing",
    icon: ArrowUpRight,
    label: "Landing Pages",
    bg: "#F97316",
    text: "#7C2D12",
    initialPosition: { x: "15%", y: "12%" },
    rotation: -6,
    description: "Pages built to convert visitors into actual paying customers."
  },
  {
    id: "ui",
    icon: PenNib,
    label: "UI Design",
    bg: "#EC4899",
    text: "#831843",
    initialPosition: { x: "58%", y: "8%" },
    rotation: 4,
    description: "Interfaces designed for real users, not just to look good in a mockup."
  },
  {
    id: "dashboards",
    icon: ChartBar,
    label: "Dashboards",
    bg: "#6366F1",
    text: "#312E81",
    initialPosition: { x: "62%", y: "50%" },
    rotation: -3,
    description: "Your data made readable and actionable at a glance."
  },
  {
    id: "custom",
    icon: Globe,
    label: "Custom Websites",
    bg: "#EF4444",
    text: "#7F1D1D",
    initialPosition: { x: "8%", y: "58%" },
    rotation: 7,
    description: "Built from scratch, no templates, no shortcuts, no compromises."
  },
  {
    id: "webapps",
    icon: Code,
    label: "Web Apps",
    bg: "#6B7280",
    text: "#111827",
    initialPosition: { x: "52%", y: "72%" },
    rotation: -5,
    description: "From MVP to production, built to scale with your business."
  },
  {
    id: "multipage",
    icon: LayoutIcon,
    label: "Multi-page Sites",
    bg: "#EAB308",
    text: "#713F12",
    initialPosition: { x: "28%", y: "38%" },
    rotation: 3,
    description: "Structured and scalable, grows as your business grows."
  }
];

export default function DraggableTags() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden",
        "h-[320px] md:h-[360px] lg:h-[420px]"
      )}
      style={{
        borderLeft: '1px solid #e5e5e5'
      }}
    >
      {/* Background Dots */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#e0e0e0 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {containerSize.width > 0 && tagsData.map((tag, i) => (
        <TagItem 
          key={tag.id} 
          tag={tag} 
          index={i}
          containerSize={containerSize}
          isExpanded={expandedId === tag.id}
          setExpandedId={setExpandedId}
        />
      ))}
    </div>
  );
}

function TagItem({ tag, index, containerSize, isExpanded, setExpandedId }: any) {
  const tagRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const zIndex = useMotionValue(1);

  const pointerDownPos = useRef<{ x: number, y: number } | null>(null);
  const hasAnimatedEntry = useRef(false);
  const [baseWidth, setBaseWidth] = useState<number | null>(null);

  // Initialize and resize cleanly
  useEffect(() => {
    if (!tagRef.current || !containerSize.width) return;
    
    // Short layout settle buffer
    const timer = setTimeout(() => {
      if (!tagRef.current) return;
      
      const finalLeftPct = parseFloat(tag.initialPosition.x) / 100;
      const finalTopPct = parseFloat(tag.initialPosition.y) / 100;
      
      const finalX = containerSize.width * finalLeftPct;
      const finalY = containerSize.height * finalTopPct;

      if (!hasAnimatedEntry.current) {
        const tagWidth = tagRef.current.offsetWidth;
        const tagHeight = tagRef.current.offsetHeight;
        setBaseWidth(tagWidth);
        
        // Start perfectly centered
        const startX = (containerSize.width / 2) - (tagWidth / 2);
        const startY = (containerSize.height / 2) - (tagHeight / 2);

        x.set(startX);
        y.set(startY);
        
        animate(x, finalX as any, { type: "spring", stiffness: 200, damping: 22, mass: 1, delay: index * 0.08 } as any);
        animate(y, finalY as any, { type: "spring", stiffness: 200, damping: 22, mass: 1, delay: index * 0.08 } as any);
        hasAnimatedEntry.current = true;
      } else {
        // Adjust layout responsively on resize cleanly natively preserving UI layouts
        animate(x, finalX as any, { type: "spring", stiffness: 300, damping: 30, mass: 1 } as any);
        animate(y, finalY as any, { type: "spring", stiffness: 300, damping: 30, mass: 1 } as any);
      }
    }, 10);
    return () => clearTimeout(timer);
  }, [containerSize, tag.initialPosition.x, tag.initialPosition.y, x, y, index]);

  // Carrom rigid boundaries tracking inside active drag bounds physically
  const enforceBoundaries = useCallback(() => {
    if (!tagRef.current || !containerSize.width) return;
    
    const tagWidth = tagRef.current.offsetWidth;
    const tagHeight = tagRef.current.offsetHeight;
    
    const maxX = containerSize.width - tagWidth;
    const maxY = containerSize.height - tagHeight;
    const minX = 0;
    const minY = 0;

    const currentX = x.get();
    const currentY = y.get();

    const bounceConfig: any = { type: "spring", stiffness: 500, damping: 25, mass: 0.8 };

    // Fire bounding impact impulses cleanly when exceeded
    if (currentX < minX) {
      animate(x, minX as any, bounceConfig);
    } else if (currentX > maxX) {
      animate(x, maxX as any, bounceConfig);
    }

    if (currentY < minY) {
      animate(y, minY as any, bounceConfig);
    } else if (currentY > maxY) {
      animate(y, maxY as any, bounceConfig);
    }
  }, [containerSize, x, y]);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerDownPos.current = { x: e.clientX, y: e.clientY };
    animate(scale, 1.06 as any, { duration: 0.15 } as any);
    zIndex.set(50);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    animate(scale, 1 as any, { duration: 0.15 } as any);
    zIndex.set(isExpanded ? 40 : 1);
    
    // Impact cushion collision bound if dropped wildly outside
    enforceBoundaries();
    
    // Rigid intent detection matching spec distance 5px limits statically configured
    if (pointerDownPos.current) {
      const dx = e.clientX - pointerDownPos.current.x;
      const dy = e.clientY - pointerDownPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 5) {
        setExpandedId(isExpanded ? null : tag.id);
      }
    }
    
    pointerDownPos.current = null;
  };
  
  // Rebind UI stack layouts without re-rendering tracking maps directly
  useEffect(() => {
    zIndex.set(isExpanded ? 40 : 1);
  }, [isExpanded, zIndex]);

  const Icon = tag.icon;

  return (
    <motion.div
      ref={tagRef}
      style={{ x, y, scale, zIndex, position: 'absolute' }}
      drag
      dragElastic={0}
      dragMomentum={false}
      onDrag={enforceBoundaries}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={cn(
        "cursor-grab active:cursor-grabbing touch-none flex flex-col items-start justify-center",
        isExpanded ? "z-50" : "z-auto"
      )}
    >
      {/* Visual Unified Envelope */}
      <motion.div 
        initial={false}
        animate={{
          backgroundColor: tag.bg,
          color: tag.text,
          boxShadow: `4px 3px 12px ${hexToRgba(tag.bg, 0.4)}`,
          rotate: isExpanded ? 0 : tag.rotation,
          borderRadius: isExpanded ? 16 : 14
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative overflow-hidden flex flex-col pointer-events-auto"
        style={baseWidth ? {
          minWidth: baseWidth,
          maxWidth: isExpanded ? baseWidth * 1.1 : baseWidth
        } : {}}
      >
        {/* Header content (Flex-between layout to natively slot X button on right edge) */}
        <div 
          className={cn(
            "flex items-center justify-between w-full whitespace-nowrap select-none font-extrabold text-left tracking-tight relative",
            "text-[12px] px-[15px] py-[9px]",
            "md:text-[16px] md:px-[21px] md:py-[12px]",
            "lg:text-[20px] lg:px-[25px] lg:py-[15px]"
          )}
        >
          {/* Left icon and text group rigidly packed */}
          <div className="flex items-center gap-[6px] md:gap-[9px] flex-shrink-0">
            <Icon size="1em" weight="bold" color={tag.text} />
            <span>{tag.label}</span>
          </div>
          
          {/* Close button securely in flow */}
          <AnimatePresence>
            {isExpanded && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedId(null);
                }}
                className="ml-auto cursor-pointer p-[2px] touch-auto opacity-60 hover:opacity-100 transition-opacity flex-shrink-0 rounded-none bg-transparent border-none"
                style={{ color: tag.text }}
              >
                <X size={14} weight="bold" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Expanded Description Body strictly disjointed */}
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -4 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -4 }}
              transition={{
                height: {
                  duration: 0.3,
                  ease: [0.04, 0.62, 0.23, 0.98]
                },
                opacity: { duration: 0.2 },
                y: { duration: 0.2 }
              }}
              className="overflow-hidden w-full touch-auto"
            >
              <div className="px-[16px] pb-[16px] pt-[4px] select-none flex flex-col">
                <p 
                  className="w-full text-[13px] font-normal" 
                  style={{ 
                    color: hexToRgba(tag.text, 0.7),
                    lineHeight: 1.6 
                  }}
                >
                  {tag.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
