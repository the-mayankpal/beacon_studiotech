import { motion } from 'motion/react';
import Footer from '../components/Footer';
import forestBg from '../assets/images/mystical-forest-bg.jpg';
import telegramIcon from '../assets/svgs/icon-telegram.svg';
import TestimonialDemo from '../components/TestimonialDemo';
import {
  HeroContent,
  MiniStatsSection,
  ScrollRevealSection,
  FeatureShowcaseSection,
  ProjectMarquee,
  HowItWorksSection,
  FAQSection,
} from '../components/home';

export default function Home() {
  return (
    <>
      <HeroContent />
      
      {/* Mini Stats Section */}
      <div className="bg-black relative z-10">
        <MiniStatsSection />
      </div>

      <ScrollRevealSection />

      <FeatureShowcaseSection />

      <ProjectMarquee />

      <HowItWorksSection />

      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="bg-black py-16 relative z-50 mt-[-100vh]"
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-[10vh] md:pt-[20vh]">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif text-white mb-4">Don't Take Our Word for It</h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-sans">Real businesses share what it was like working with us on web development and AI automation.</p>
          </div>
          <TestimonialDemo />
        </div>
      </motion.section>

      <FAQSection />

      {/* CTA Section */}
      <motion.section 
        id="contact" 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="bg-black py-8 sm:py-16 px-4 sm:px-10 flex justify-center"
      >
        <div className="relative w-full max-w-[1400px] overflow-hidden aspect-[4/5] sm:aspect-[21/9] flex items-center justify-center rounded-sm">
          {/* Background Image */}
          <img 
            src="https://res.cloudinary.com/dkxe8h4cs/image/upload/v1775104032/withhome_a21pzs.png" 
            alt="Dark Abstract" 
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          
          {/* Very faint light gradient overlay just in case the image has dark/busy spots where text sits */}
          {/* (Faded gradient removed for clarity) */}

          {/* Film Grain Overlay (reduced for subtlety) */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-screen z-10" 
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          ></div>

          {/* Legibility Fog: Focused behind text, transparent on edges */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.7)_0%,_transparent_70%)] z-0"></div>

          {/* Content */}
          <div className="relative z-10 px-6 sm:px-16 md:px-24 max-w-3xl flex flex-col items-center text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-black mb-4 leading-tight tracking-tight">
              Still Thinking About It?
            </h2>
            <p className="text-sm sm:text-base text-gray-800 mb-8 max-w-lg leading-relaxed font-sans font-medium">
              Most of our clients were too until they just sent that first message. Takes 30 seconds. That's it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a 
                href="https://cal.com/mayank-8lz88l/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-8 py-3.5 rounded-full font-sans font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                Book a call
              </a>
              <div className="relative p-[2px] rounded-full overflow-hidden">
                <div 
                  className="absolute inset-[-1000%] bg-[conic-gradient(from_0deg,transparent_0_240deg,white_360deg)] animate-spin font-sans"
                  style={{ animationDuration: '4s' }}
                ></div>
                <a 
                  href="https://t.me/mayank01me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative bg-black/90 backdrop-blur-sm text-white px-8 py-3.5 rounded-full font-sans font-medium hover:bg-black transition-colors flex items-center justify-center gap-2 w-full h-full"
                >
                  <img src={telegramIcon} alt="Telegram" className="w-5 h-5" />
                  Telegram Chat
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </>
  );
}
