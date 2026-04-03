import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoImg from '../assets/logo.png';

export default function Navbar({ theme = 'dark' }: { theme?: 'dark' | 'light' }) {
  const isLight = theme === 'light';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);
  
  return (
    <nav className="relative flex items-center justify-between py-6 sm:py-8 font-sans z-50">
      <div className={`flex items-center gap-3 text-xl font-bold tracking-wider ${isLight ? 'text-black' : 'text-white'}`}>
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-white p-1 flex items-center justify-center transition-transform group-hover:scale-110 duration-500">
            <img src={logoImg} alt="Beacon Logo" className="w-full h-full object-contain" />
          </div>
          <span>BEACON</span>
        </Link>
      </div>
      
      <div className={`hidden md:flex items-center space-x-10 text-sm font-sans font-medium ${isLight ? 'text-gray-600' : 'text-gray-200'}`}>
        <Link to="/about" className={`transition-colors ${isLight ? 'hover:text-black' : 'hover:text-white'}`}>About</Link>
        <a href="/#services" className={`transition-colors ${isLight ? 'hover:text-black' : 'hover:text-white'}`}>Services</a>
        <a href="/#projects" className={`transition-colors ${isLight ? 'hover:text-black' : 'hover:text-white'}`}>Projects</a>
        <a href="/#faq" className={`transition-colors ${isLight ? 'hover:text-black' : 'hover:text-white'}`}>FAQ</a>
      </div>

      <div className="flex items-center space-x-4 sm:space-x-8 font-sans">
        <a href="https://t.me/mayank01me" target="_blank" rel="noopener noreferrer" className={`hidden sm:block ${isLight ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-100'} px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-sans font-medium transition-colors`}>
          Contact Us
        </a>

        {/* Mobile Hamburger Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`sm:hidden flex items-center justify-center w-10 h-10 rounded-full border ${isLight ? 'border-black/20 text-black' : 'border-white/20 text-white'} transition-colors z-[100] relative overflow-hidden focus:outline-none`}
          style={{ WebkitTapHighlightColor: 'transparent' }}
          aria-label="Toggle Menu"
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.3 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </button>
      </div>

      {/* Mobile Full-Screen Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-black z-[90] flex flex-col items-center justify-center p-6"
            data-lenis-prevent
          >
            {/* Subtle background pattern or gradient for the menu */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-white/10"></div>
            
            <div className="relative z-10 flex flex-col items-center space-y-6 sm:space-y-8 w-full max-w-sm">
              {[
                { name: 'About', path: '/about', isLink: true },
                { name: 'Services', path: '/#services', isLink: false },
                { name: 'Projects', path: '/#projects', isLink: false },
                { name: 'FAQ', path: '/#faq', isLink: false }
              ].map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ 
                    delay: 0.1 + index * 0.05, 
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="w-full text-center"
                >
                  {item.isLink ? (
                    <Link 
                      to={item.path} 
                      onClick={() => setIsMenuOpen(false)} 
                      className="block text-3xl sm:text-4xl font-serif font-medium text-white hover:text-white/60 transition-colors tracking-tight py-2"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a 
                      href={item.path} 
                      onClick={() => setIsMenuOpen(false)} 
                      className="block text-3xl sm:text-4xl font-serif font-medium text-white hover:text-white/60 transition-colors tracking-tight py-2"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      {item.name}
                    </a>
                  )}
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ 
                  delay: 0.35, 
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="pt-6 w-full flex justify-center"
              >
                <a
                  href="https://t.me/mayank01me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black px-10 py-4 rounded-full font-sans font-medium text-base hover:bg-gray-200 transition-colors w-full max-w-[240px] text-center"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Us
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
