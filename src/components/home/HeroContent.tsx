import { motion } from 'motion/react';
import { Clock, ChevronRight } from 'lucide-react';
import Navbar from '../Navbar';
import { FlowButton } from '../ui/flow-button';
import forestBg from '../../assets/images/mystical-forest-bg.jpg';
import cursorIcon from '../../assets/svgs/icon-cursor.svg';
import anthropicIcon from '../../assets/svgs/icon-anthropic.svg';
import n8nIcon from '../../assets/svgs/icon-n8n.svg';
import pythonIcon from '../../assets/svgs/icon-python.svg';
import openaiIcon from '../../assets/svgs/icon-openai.svg';

const HeroContent = () => (
  <div className="relative min-h-screen flex flex-col overflow-hidden bg-black">
    {/* Background Image & Overlay */}
    <div className="absolute inset-0 z-0">
      {/* Mobile hero image */}
      <img 
        src="https://res.cloudinary.com/dkxe8h4cs/image/upload/v1775133143/ChatGPT_Image_Apr_2_2026_05_31_45_AM_qilweo.png" 
        alt="Hero background" 
        className="w-full h-full object-cover block md:hidden"
        referrerPolicy="no-referrer"
      />
      {/* Desktop hero image */}
      <img 
        src="https://res.cloudinary.com/dkxe8h4cs/image/upload/v1775132707/Whisk_u2yxegzymgz4ejm30yyizmytczm1qtljjznz0im_lcadsy.png" 
        alt="Hero background" 
        className="w-full h-full object-cover hidden md:block"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35)_0%,transparent_70%)]"></div>
      
      {/* Seamless Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
      
      {/* Subtle Film Grain */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>
    </div>

    {/* Content Wrapper */}
    <div className="relative z-50 flex flex-col min-h-screen w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
      
      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow flex flex-col justify-center items-center text-center pt-0 pb-32 md:pt-0 md:pb-44">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 mb-6 md:mb-8"
          >
            <div className="bg-white text-black rounded-full p-1">
              <Clock size={14} strokeWidth={3} />
            </div>
            <span className="text-xs font-medium text-gray-200 pr-2">200+ hours saved</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-serif text-[34px] leading-[1.1] sm:text-[54px] md:text-[65px] lg:text-[72px] font-medium sm:leading-[1.1] mb-4 md:mb-6 tracking-tight max-w-[640px] sm:max-w-3xl mx-auto text-black px-2"
          >
            We Build What Your Business Actually Needs.
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl sm:text-2xl text-black max-w-xl mb-10 md:mb-14 leading-relaxed font-sans font-medium"
          >
            A website that works for you and AI agents that never stop. We do both.
          </motion.p>

          {/* CTA Buttons - Force one row, two column format even on mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-row items-center justify-center gap-3 sm:gap-6 w-full max-w-[95vw] sm:max-w-none"
          >
            <a href="https://t.me/mayank01me" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-[56px] min-w-[150px] sm:min-w-[180px] gap-2 bg-white text-black px-6 sm:px-8 py-3.5 rounded-full font-semibold hover:bg-black hover:text-white transition-all shadow-lg hover:shadow-white/10 whitespace-nowrap text-sm sm:text-base border border-white">
              Let's chat <ChevronRight size={20} />
            </a>
            <div className="flex-shrink-0">
              <a href="#projects">
                <FlowButton text="See projects" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Trusted Brands */}
      <div className="pb-4 md:pb-8 flex flex-col items-center justify-center w-full">
        <p className="text-sm font-medium text-gray-400 mb-6 md:mb-8">Powered by Leading AI Technologies</p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 opacity-70 text-white">
          {/* Cursor */}
          <div className="flex items-center gap-2">
            <img src={cursorIcon} alt="Cursor" className="w-6 h-6 brightness-0 invert" />
            <span className="font-bold text-xl tracking-tight">Cursor</span>
          </div>
          {/* Anthropic */}
          <div className="flex items-center gap-2">
            <img src={anthropicIcon} alt="Anthropic" className="w-6 h-6 brightness-0 invert" />
            <span className="font-bold text-xl tracking-tight">Anthropic</span>
          </div>
          {/* n8n */}
          <div className="flex items-center gap-2">
            <img src={n8nIcon} alt="n8n" className="w-6 h-6 brightness-0 invert" />
            <span className="font-bold text-xl tracking-tight">n8n</span>
          </div>
          {/* Python */}
          <div className="flex items-center gap-2">
            <img src={pythonIcon} alt="Python" className="w-6 h-6 brightness-0 invert" />
            <span className="font-bold text-xl tracking-tight">Python</span>
          </div>
          {/* OpenAI */}
          <div className="flex items-center gap-2">
            <img src={openaiIcon} alt="OpenAI" className="w-6 h-6 brightness-0 invert" />
            <span className="font-bold text-xl tracking-tight">OpenAI</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HeroContent;
