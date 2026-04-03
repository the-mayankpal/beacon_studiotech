import React from "react";
import { cn } from "../../lib/utils";

const phases = [
  {
    id: "01",
    phase: "PHASE 01",
    title: "We Have a Chat",
    desc: "No forms, no questionnaires. Just a quick call or message to understand what you actually need."
  },
  {
    id: "02",
    phase: "PHASE 02",
    title: "We Figure It Out",
    desc: "We map out the scope, the tech, and the timeline. No surprises, no bloated proposals."
  },
  {
    id: "03",
    phase: "PHASE 03",
    title: "You Get Onboarded",
    desc: "We set up your tools, your access, your comms. You know exactly what's happening and when."
  },
  {
    id: "04",
    phase: "PHASE 04",
    title: "We Build & Ship",
    desc: "Heads down, updates flowing, no ghosting. We build it, refine it, and don't stop until it's something worth showing off."
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="bg-black relative w-full pt-20 pb-[100vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Mobile: single col, Desktop: two cols */}
          <div className="flex flex-col lg:grid lg:grid-cols-[45%_55%] gap-16 lg:gap-8 relative">
          
          {/* Left Column: Sticky */}
          <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center py-16 lg:py-0">
            <span className="text-xs tracking-[0.25em] uppercase text-neutral-400 mb-6 font-semibold block">
              OUR PROCESS
            </span>
            <h2 className="text-5xl lg:text-7xl font-bold text-white leading-tight font-serif">
              From First Message to <span className="text-neutral-500">Final Build.</span>
            </h2>
            <p className="mt-8 text-neutral-400 text-lg max-w-sm">
              Most agencies make web development and AI automation complicated on purpose. We keep it simple, fast, and built around your business.
            </p>
          </div>

          {/* Right Column: Scroll Container */}
          <div className="w-full relative flex flex-col gap-12 lg:gap-12 lg:pt-[10vh]">
            {phases.map((item, index) => {
              // Standardized 55px increment maps beautifully regardless of mobile or desktop screen height
              const topVal = 80 + index * 55;
              const zIndex = index + 1;
              const isBlack = index % 2 !== 0; // Card 1 is White, Card 2 is Black, etc.

              return (
                <div
                  key={item.id}
                  style={{ top: `${topVal}px`, zIndex }}
                  className={cn(
                    "sticky w-full min-h-[50vh] lg:min-h-[60vh] rounded-2xl p-8 sm:p-10 shadow-2xl border flex flex-col transform-gpu will-change-transform",
                    isBlack 
                      ? "bg-[#0a0a0a] border-white/10 text-white" 
                      : "bg-[#F5F0E8] border-stone-200 text-black"
                  )}
                >
                  {/* Top Bar with Number and Arrow Button */}
                  <div className="flex items-start justify-between mb-auto">
                    <span 
                      className={cn(
                        "text-xs tracking-widest uppercase font-semibold",
                        isBlack ? "text-neutral-400" : "text-neutral-500"
                      )}
                    >
                      {item.phase}
                    </span>
                    <div 
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                        isBlack ? "bg-[#222] text-white" : "bg-neutral-200 text-black"
                      )}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Bottom Content Area */}
                  <div className="mt-auto pt-16">
                    <h3 className="text-4xl font-bold font-serif mb-6 leading-tight">
                      {item.title}
                    </h3>
                    <p 
                      className={cn(
                        "text-base leading-relaxed max-w-md",
                        isBlack ? "text-neutral-400" : "text-neutral-600"
                      )}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
