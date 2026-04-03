import { motion } from 'motion/react';
import { projects } from '@/src/data/constants';

const ProjectMarquee = () => {
  const row1Projects = projects.slice(0, 4);
  const row2Projects = projects.slice(4, 8);
  
  const row1 = [...row1Projects, ...row1Projects, ...row1Projects];
  const row2 = [...row2Projects, ...row2Projects, ...row2Projects];

  return (
    <motion.section 
      id="projects" 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="bg-black pt-12 pb-24 overflow-hidden border-t border-white/5"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 mb-16 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white mb-4 tracking-tight">We Don't Just Talk.</h2>
        <p className="text-gray-300 max-w-2xl mx-auto font-sans text-lg sm:text-xl">Here's the proof.</p>
      </div>

      <div className="flex flex-col gap-12">
        {/* Row 1: Moving Left */}
        <div className="flex overflow-hidden">
          <motion.div 
            className="flex gap-8 pr-8 will-change-transform"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ 
              repeat: Infinity, 
              duration: 60, 
              ease: "linear",
              repeatType: "loop"
            }}
          >
            {row1.map((project, i) => (
              <div key={i} className="w-[280px] sm:w-[480px] flex-shrink-0 group p-1.5 sm:p-2 rounded-[24px] sm:rounded-[40px] bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-700 hover:bg-white/[0.08] hover:border-white/20">
                <div className="relative aspect-[16/9] rounded-[18px] sm:rounded-[32px] overflow-hidden border border-white/5 bg-[#0a0a0a]">
                  {project.video ? (
                    <video 
                      src={project.video} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                    />
                  ) : (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: Moving Right */}
        <div className="flex overflow-hidden">
          <motion.div 
            className="flex gap-8 pr-8 will-change-transform"
            animate={{ x: ["-33.33%", "0%"] }}
            transition={{ 
              repeat: Infinity, 
              duration: 70, 
              ease: "linear",
              repeatType: "loop"
            }}
          >
            {row2.map((project, i) => (
              <div key={i} className="w-[280px] sm:w-[480px] flex-shrink-0 group p-1.5 sm:p-2 rounded-[24px] sm:rounded-[40px] bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-700 hover:bg-white/[0.08] hover:border-white/20">
                <div className="relative aspect-[16/9] rounded-[18px] sm:rounded-[32px] overflow-hidden border border-white/5 bg-[#0a0a0a]">
                  {project.video ? (
                    <video 
                      src={project.video} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                    />
                  ) : (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectMarquee;
