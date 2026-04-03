import { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'motion/react';
import { Clock } from 'lucide-react';

const AnimatedNumber = ({ value, suffix = "", startAnimation = false }: { value: number, suffix?: string, startAnimation?: boolean }) => {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest) + suffix);

  useEffect(() => {
    if (startAnimation) {
      const controls = animate(motionValue, value, {
        duration: 2.5,
        ease: [0.16, 1, 0.3, 1],
      });
      return () => controls.stop();
    }
  }, [startAnimation, value, motionValue]);

  return <motion.span className="font-sans">{rounded}</motion.span>;
};

const MiniStatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div 
      ref={ref} 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-6 sm:py-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        {/* Left Text */}
        <div className="max-w-lg">
          <p className="text-white text-lg sm:text-xl font-sans font-medium leading-relaxed">
            You know what? Agents don't ask for breaks.
          </p>
        </div>

        {/* Right Stats */}
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 w-full md:w-auto">
          {/* Stat 1 */}
          <div className="flex flex-col border-l border-white/10 pl-6">
            <span className="text-[11px] font-bold tracking-widest text-gray-400 font-sans uppercase mb-1">Faster</span>
            <span className="text-5xl sm:text-6xl font-medium text-white font-sans tracking-tight"><AnimatedNumber value={10} suffix="x" startAnimation={isInView} /></span>
          </div>
          {/* Stat 2 */}
          <div className="flex flex-col border-l border-white/10 pl-6">
            <div className="flex items-center gap-2 mb-1">
              <Clock size={12} className="text-gray-400" />
              <span className="text-[11px] font-bold tracking-widest text-gray-400 font-sans uppercase">Hours Saved</span>
            </div>
            <span className="text-5xl sm:text-6xl font-medium text-white font-sans tracking-tight"><AnimatedNumber value={200} suffix="+" startAnimation={isInView} /></span>
          </div>
          {/* Stat 3 */}
          <div className="flex flex-col border-l border-white/10 pl-6">
            <span className="text-[11px] font-bold tracking-widest text-gray-400 font-sans uppercase mb-1">Availability</span>
            <span className="text-5xl sm:text-6xl font-medium text-white font-sans tracking-tight"><AnimatedNumber value={24} suffix="/7" startAnimation={isInView} /></span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MiniStatsSection;
