import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { faqs } from '@/src/data/constants';

const FAQItem = ({ question, answer }: { question: string, answer: string, key?: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-6 flex items-center justify-between text-left group"
      >
        <span className="text-base sm:text-lg font-sans font-medium text-white/90 group-hover:text-white transition-colors pr-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-white/30 shrink-0"
        >
          <ChevronDown size={18} className="sm:w-5 sm:h-5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-sm sm:text-base text-gray-400 leading-relaxed font-sans">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
  return (
    <motion.section 
      id="faq" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="bg-black py-12 sm:py-16 px-4 sm:px-10"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-8xl font-serif font-medium text-white mb-4 sm:mb-6 tracking-tighter">FAQ</h2>
          <p className="text-lg sm:text-xl text-gray-400 mb-6 sm:mb-8 font-sans">Have a question? We have answers.</p>
          <a href="https://t.me/mayank01me" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-sans font-medium hover:bg-gray-200 transition-colors inline-flex items-center gap-2 text-sm sm:text-base">
            Contact us <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
          </a>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FAQSection;
