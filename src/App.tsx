import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, useLocation } from 'react-router';
import Lenis from 'lenis';
import Home from './pages/Home';
import About from './pages/About';
import Privacy from './pages/Privacy';

function MainApp() {
  const { pathname, hash } = useLocation();
  const lenisRef = useRef<Lenis | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Small timeout to ensure everything is settled
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
      infinite: false,
    });
    
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      if (hash) {
        // If there's a hash, scroll to the element after a short delay to ensure DOM is ready
        setTimeout(() => {
          lenisRef.current?.scrollTo(hash, { immediate: true });
        }, 100);
      } else {
        // Otherwise scroll to top
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    }
  }, [pathname, hash]);

  return (
    <div className={`bg-black font-sans text-white min-h-screen flex flex-col ${!isLoaded ? 'overflow-hidden' : ''}`}>
      <AnimatePresence mode="wait">
        {!isLoaded && (
          <motion.div 
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-6">
              {/* Spinning Logo Mark */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full"
              />
              {/* Beacon Text */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-white font-serif text-2xl tracking-[0.2em] font-medium"
              >
                BEACON
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="flex flex-col flex-grow"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </motion.div>
    </div>
  );
}

export default function App() {
  return <MainApp />;
}
