import React from 'react';
import type { SocialLink } from '../../types';

const Footer: React.FC = () => {
  const socialLinks: SocialLink[] = [
    { platform: 'Facebook', url: '#' },
    { platform: 'Twitter', url: '#' },
    { platform: 'Instagram', url: '#' },
    { platform: 'YouTube', url: '#' }
  ];

  return (
    <footer className="bg-black border-t border-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#" className="text-xl font-creepy font-bold tracking-wider text-red-600">
              THRILLER<span className="text-white">KAH</span>
            </a>
          </div>
          
          <div className="flex space-x-6 mb-4 md:mb-0">
            {socialLinks.map((link) => (
              <a 
                key={link.platform} 
                href={link.url} 
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                {link.platform}
              </a>
            ))}
          </div>
          
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ThrillerKah. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
