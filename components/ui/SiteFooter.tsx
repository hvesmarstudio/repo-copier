import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Instagram } from 'lucide-react';

export const SiteFooter: React.FC = () => {
  return (
    <footer className="bg-[#EAEAEA] py-12 md:py-16 px-6 md:px-12 lg:px-20 border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
        <div className="flex flex-col items-center md:items-start gap-3">
          <Logo className="w-32 md:w-36 h-auto" />
          <p className="text-sm md:text-base text-gray-500">Designing intelligence, not just installing it.</p>
        </div>
        
        <div className="flex gap-4 md:gap-6">
          <a 
            href="https://www.instagram.com/aitoma.ai?igsh=MWgzeXN0cDE0eTd2ZQ==" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-sm"
            aria-label="Follow us on Instagram"
          >
            <Instagram size={18} className="md:w-5 md:h-5" />
          </a>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-sm md:text-base text-gray-500">
          <Link to="/privacy-policy" className="hover:text-black transition-colors">Privacy Policy</Link>
          <Link to="/terms-and-conditions" className="hover:text-black transition-colors">Terms & Conditions</Link>
          <span>© 2024 Aitoma Intelligence Lab</span>
        </div>
      </div>
    </footer>
  );
};
