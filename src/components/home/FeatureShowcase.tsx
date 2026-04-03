import { ReactNode } from 'react';
import { motion } from 'motion/react';
import AIAgentAnimation from './AIAgentAnimation';
import DraggableTags from './DraggableTags';

const ModernServiceCard = ({ 
  title, 
  subtitle, 
  description, 
  linkText, 
  stats,
  visual
}: { 
  title: string, 
  subtitle: string, 
  description: string, 
  linkText: string, 
  stats: { value: string, label: string }[],
  visual: ReactNode
}) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto mb-20 sm:mb-32 last:mb-0">
      {/* Main Card */}
      <div className="bg-[#f9f9f9] rounded-sm flex flex-col-reverse lg:flex-row border border-gray-200/50 mb-1">
        {/* Left Content */}
        <div className="w-full lg:w-[45%] p-6 sm:px-12 lg:px-14 lg:py-[60px] flex flex-col justify-center bg-white border-r border-gray-100">
          <div>
            <h3 className="text-xl sm:text-4xl font-sans font-medium text-black leading-tight mb-1 tracking-tight">
              {title}
            </h3>
            <p className="text-xl sm:text-4xl font-sans font-medium text-gray-400 leading-tight mb-3 sm:mb-5 tracking-tight">
              {subtitle}
            </p>
            <p className="text-xs sm:text-base text-gray-600 leading-relaxed max-w-sm font-sans">
              {description}
            </p>
          </div>
        </div>

        {/* Right Visual */}
        <div className="w-full lg:w-[55%] bg-[#f9f9f9] relative min-h-[280px] sm:min-h-[350px] lg:min-h-full flex items-center justify-center py-6 lg:py-0">
          {/* Dotted Background */}
          <div 
            className="absolute inset-0 opacity-[0.4]" 
            style={{ 
              backgroundImage: `radial-gradient(#d1d1d1 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          ></div>
          
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            {visual}
          </div>
        </div>
      </div>

      {/* Stats Below */}
      <div className="grid grid-cols-3 gap-1">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#f9f9f9] p-3 sm:p-10 lg:py-8 lg:px-10 rounded-sm flex flex-col justify-center min-h-[100px] sm:min-h-[160px] lg:min-h-0">
            <span className="text-xl sm:text-5xl lg:text-5xl font-sans font-medium text-black mb-1 sm:mb-4 lg:mb-2 tracking-tighter">
              {stat.value}
            </span>
            <p className="text-[10px] sm:text-sm text-gray-500 font-sans leading-snug max-w-[240px]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const FeatureShowcaseSection = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="bg-black pt-12 sm:pt-16 pb-10 sm:pb-14 px-6 sm:px-10 lg:px-16"
    >
      <div className="text-center mb-24 sm:mb-32">
        <span className="text-[10px] font-bold text-white/40 tracking-[0.3em] uppercase mb-4 block font-sans">Our Focus</span>
        <h2 className="text-4xl sm:text-6xl lg:text-8xl font-serif text-white tracking-tight leading-none">
          We do just <span className="text-white/40 italic">two things.</span>
        </h2>
      </div>

      {/* Card 1: Web Development */}
      <ModernServiceCard 
        title="High-performance web development"
        subtitle="from landing pages to multi-page ecosystems"
        description="We engineer enterprise-grade platforms and digital experiences that serve as the foundation for global brands, combining technical precision with aesthetic excellence."
        linkText="View our architecture"
        stats={[
          { value: "100%", label: "Responsive and performance optimized" },
          { value: "SEO", label: "Built-in search engine optimization" },
          { value: "Fast", label: "Lightning quick load times for better conversion" }
        ]}
        visual={<DraggableTags />}
      />

      {/* Card 2: AI Agents & Automations */}
      <ModernServiceCard 
        title="AI Agents & Automations"
        subtitle="solving complex problems with intelligent systems"
        description="We design and deploy custom AI agents and automation workflows tailored to your specific business requirements. We focus on understanding your unique challenges to deliver measurable impact."
        linkText="Explore AI solutions"
        stats={[
          { value: "200+", label: "Hours saved for dentists and real estate firms" },
          { value: "24/7", label: "Autonomous operation without human intervention" },
          { value: "Custom", label: "Tailored to your specific business requirements" }
        ]}
        visual={<AIAgentAnimation />}
      />
    </motion.section>
  );
};

export default FeatureShowcaseSection;
