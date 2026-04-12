import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import xIcon from '../assets/svgs/icon-x.svg';

export default function Footer() {
  return (
    <footer className="w-full flex flex-col font-sans">
      {/* Top Section: Links & Newsletter */}
      <div className="w-full bg-black text-white py-6 px-6 sm:px-10 lg:px-16 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">
          {/* Links */}
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 sm:gap-6 text-sm font-medium text-gray-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <a href="/#services" className="hover:text-white transition-colors">Services</a>
            <a href="/#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="/#faq" className="hover:text-white transition-colors">FAQ</a>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>

          {/* Right side: Socials */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-3 w-full lg:w-auto mt-4 lg:mt-0">
            <div className="flex items-center gap-3 justify-center w-full sm:w-auto">
              <button className="w-9 h-9 shrink-0 flex items-center justify-center border border-white/20 rounded-lg hover:bg-white/10 transition-colors text-white">
                {/* X icon */}
                <img src={xIcon} alt="X" className="w-3.5 h-3.5 brightness-0 invert" />
              </button>
              <button className="w-9 h-9 shrink-0 flex items-center justify-center border border-white/20 rounded-lg hover:bg-white/10 transition-colors font-bold text-sm text-white">
                in
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Lines */}
      <div className="w-full h-1 bg-black"></div>
      <div className="w-full h-0.5 bg-black/50"></div>

      {/* Bottom Section: Image & Copyright */}
      <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[450px]">
        <img 
          src="https://res.cloudinary.com/dkxe8h4cs/image/upload/f_auto,q_auto/v1775129846/Whisk_2273de1fcb1571786784f3780bc0d8e4dr_g0fy2e.png" 
          alt="Footer landscape" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-screen" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Copyright Text */}
        <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 lg:p-16 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-white/90">
          <p className="font-bold tracking-wide">© BEACON 2026</p>
          <p className="font-bold tracking-wide">Design by BEACON</p>
        </div>
      </div>
    </footer>
  );
}
