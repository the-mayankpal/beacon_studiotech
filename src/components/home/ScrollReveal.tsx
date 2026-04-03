import { useRef, useMemo, memo } from 'react';
import { useScroll, useTransform, useSpring } from 'motion/react';
import { motion } from 'motion/react';
import { SCROLL_REVEAL_TEXT } from '../../data/constants';

interface CharProps {
  children: string;
  progress: any;
  range: [number, number];
}

const Char = memo(({ children, progress, range }: CharProps) => {
  const opacity = useTransform(progress, range, [0.1, 1]); // Keep a tiny bit of visibility for structure
  const filter = useTransform(progress, range, ["blur(4px)", "blur(0px)"]);
  const y = useTransform(progress, range, [10, 0]);

  return (
    <motion.span 
      style={{ opacity, filter, y }} 
      className="text-white inline-block will-change-[transform,opacity,filter]"
    >
      {children === " " ? "\u00A0" : children}
    </motion.span>
  );
});

const ScrollRevealSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Use a spring for smoother scroll interaction
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const words = useMemo(() => SCROLL_REVEAL_TEXT.split(" "), []);
  const totalChars = SCROLL_REVEAL_TEXT.length;

  const wordData = useMemo(() => {
    let charIndexCounter = 0;
    return words.map((word) => {
      const wordChars = word.split("");
      const wordStartOffset = charIndexCounter;
      charIndexCounter += wordChars.length + 1; // +1 for the space
      return { wordChars, wordStartOffset };
    });
  }, [words]);

  return (
    <section 
      ref={containerRef} 
      className="relative z-30 bg-black h-[400vh]" // Reduced from 600vh to feel more punchy
      id="about-mission"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6 sm:px-12 md:px-20 bg-black">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-medium leading-[1.4] flex flex-wrap justify-center gap-x-[0.2em] gap-y-2 sm:gap-y-4">
            {wordData.map((data, wordIndex) => {
              return (
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                  {data.wordChars.map((char, charIndex) => {
                    const globalCharIndex = data.wordStartOffset + charIndex;
                    
                    // Logic: Start reveal after a 10% buffer and finish at 90%
                    // This ensures the user definitely "lands" before it starts
                    const start = 0.1 + (globalCharIndex / totalChars) * 0.8;
                    const end = 0.1 + ((globalCharIndex + 1) / totalChars) * 0.8;
                    
                    return (
                      <Char 
                        key={charIndex} 
                        progress={smoothProgress} 
                        range={[start, end]}
                      >
                        {char}
                      </Char>
                    );
                  })}
                  {/* Space between words */}
                  <span className="inline-block">&nbsp;</span>
                </span>
              );
            })}
          </h2>
        </div>
        

      </div>
    </section>
  );
};

export default ScrollRevealSection;
