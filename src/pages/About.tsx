import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import forestBg from '../assets/images/mystical-forest-bg.jpg';
import stampImg from '../assets/images/new-york-stamp.jpg';
import PostageStamp from '../components/PostageStamp';

export default function About() {
  return (
    <div className="min-h-screen bg-black flex flex-col font-sans text-white relative">
      {/* Top Hero Section */}
      <section className="relative min-h-[40vh] flex flex-col overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dkxe8h4cs/image/upload/f_auto,q_auto/v1775132707/Whisk_u2yxegzymgz4ejm30yyizmytczm1qtljjznz0im_lcadsy.png" 
            alt="Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          
          {/* Seamless Bottom Fade */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent z-10"></div>
          
          {/* Top Navbar Legibility Gradient */}
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/70 via-black/30 to-transparent z-10"></div>
          
          {/* Subtle Film Grain */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay" 
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative z-50 flex flex-col w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <Navbar />
        </div>
      </section>

      {/* Middle Black Section */}
      <main className="relative z-10 flex-grow flex flex-col items-center pt-16 pb-32 sm:py-24 px-4 sm:px-6 bg-black overflow-hidden sm:overflow-visible">
        
        {/* Subheading (Top Text) */}
        <div className="max-w-2xl text-center mb-8">
          <p className="text-[13px] sm:text-[14px] text-gray-400 leading-relaxed tracking-wide font-sans">
            We're not an agency with 50 people and a project manager who's never touched a line of code.
          </p>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-[54px] leading-[1.3] sm:leading-[1.1] text-center max-w-3xl mb-12 sm:mb-20 text-white px-4">
          Small Team.<br className="hidden sm:block" />
          Serious Work.
        </h1>

        {/* Card with Body Text */}
        <div className="relative w-full max-w-[680px] mb-24 sm:mb-0">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 pb-20 sm:p-14 shadow-2xl border border-white/10 relative z-10">
            
            <div className="space-y-6 sm:space-y-8 text-[14px] sm:text-[17px] leading-[1.7] text-gray-300 font-sans">
              <p>
                Beacon Studio is a two-person studio focused on web development and AI automation for service-based businesses. We build custom websites that convert and AI agents that handle the work you don't have time for follow-ups, bookings, client communication, review collection. The stuff that falls through the cracks when you're busy actually running your business.
              </p>
              
              <p>
                Most businesses we talk to have the same problem. Either they have a website that looks outdated and does nothing, or they're manually handling every single client interaction themselves. Sometimes both. We fix both.
              </p>
              
              <p>
                Our work is built from scratch every time. No templates, no copy-paste solutions, no shortcuts that come back to bite you six months later. Everything is designed and developed specifically for your business, your customers, and your market.
              </p>
              
              <p>
                We work remotely with service businesses across the world clinics, agencies, consultants, local businesses that are serious about growth. Small enough to move fast. Focused enough to actually care about the outcome.
              </p>

              <p>
                We keep the team small on purpose. Because smaller means you're talking to the people actually doing the work not a middleman who passes your brief down the chain.
              </p>
            </div>

          </div>

          {/* Stamp Image / Photo Frame */}
          <div className="absolute -bottom-28 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:-bottom-16 sm:-right-16 z-20">
            <div className="scale-75 sm:scale-100 origin-bottom sm:origin-center drop-shadow-xl">
              <PostageStamp width={240} height={160}>
                <img 
                  src="https://res.cloudinary.com/dkxe8h4cs/image/upload/f_auto,q_auto/v1775132358/Whisk_53654758f192ebd981f4334d0c8b6da6dr_n7e4d2.png" 
                  alt="New York Stamp" 
                  className="w-full h-full object-cover"
                />
              </PostageStamp>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
