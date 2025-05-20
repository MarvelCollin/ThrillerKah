import React, { useState } from 'react';
import type { NavItem } from '../../types';

interface HeaderProps {
  activeSection: string;
  scrollY: number;
  isGlitching: boolean;
}

const Header: React.FC<HeaderProps> = ({ activeSection, scrollY, isGlitching }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems: NavItem[] = [
    { label: 'Home', path: '#home' },
    { label: 'Features', path: '#features' },
    { label: 'Gallery', path: '#gallery' },
    { label: 'About', path: '#about' },
    { label: 'Contact', path: '#contact' }
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrollY > 50 ? 'bg-black/90 backdrop-blur-sm shadow-lg shadow-red-900/20' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" 
          className={`text-2xl font-creepy tracking-wider text-red-600 hover:text-red-500 transition-colors ${isGlitching ? 'glitch' : ''}`} 
          data-text="THRILLERKAH"
        >
          THRILLER<span className="text-white">KAH</span>
        </a>
        
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.path}
              className={`relative text-sm uppercase tracking-widest hover:text-red-600 transition-colors ${activeSection === item.label.toLowerCase() ? 'text-red-600' : 'text-white'}`}
            >
              {item.label}
              <span className={`absolute bottom-0 left-0 h-[2px] bg-red-600 transition-all duration-300 ${activeSection === item.label.toLowerCase() ? 'w-full' : 'w-0'}`}></span>
            </a>
          ))}
        </nav>
        
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-black/95 backdrop-blur-sm`}>
        <div className="container mx-auto px-4 py-4">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.path}
              className={`block py-3 text-sm uppercase tracking-widest transition-colors border-b border-gray-800 ${activeSection === item.label.toLowerCase() ? 'text-red-600' : 'hover:text-red-600 text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header; 