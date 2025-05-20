import React from 'react';
import type { ContactInfo } from '../../types';
import Button from '../ui/Button';

interface ContactProps {
  revealedItems: number[];
  onGlitchTrigger: () => void;
}

const Contact: React.FC<ContactProps> = ({ revealedItems, onGlitchTrigger }) => {
  const contactInfos: ContactInfo[] = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      text: "123 Nightmare Street, Dark City"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      text: "contact@thrillerkah.com"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      text: "+1 (666) 123-4567"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGlitchTrigger();
    alert('Thank you for your message! We will respond shortly.');
  };

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-creepy font-bold mb-12 text-center">
          <span className="text-red-600">JOIN</span> THE NIGHTMARE
        </h2>
        
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="animate-on-scroll">
            <h3 className={`text-xl font-semibold mb-4 ${revealedItems.includes(14) ? 'fade-in' : 'opacity-0'}`}>Get In Touch</h3>
            <p className={`text-gray-300 mb-6 ${revealedItems.includes(15) ? 'fade-in' : 'opacity-0'}`}>
              Dare to learn more about our thrilling experiences? Contact us below. If you're brave enough.
            </p>
            
            <div className="space-y-4">
              {contactInfos.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex items-center animate-on-scroll ${revealedItems.includes(16 + index) ? 'fade-in' : 'opacity-0'}`}
                  style={{animationDelay: `${index * 200}ms`}}
                >
                  <div className="bg-gradient-to-br from-red-800 to-red-900 p-3 rounded-sm text-white mr-4 creepy-float shadow-glow" style={{animationDelay: `${index * 0.2}s`}}>
                    {item.icon}
                  </div>
                  <span className="text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className={`animate-on-scroll ${revealedItems.includes(19) ? 'fade-in' : 'opacity-0'}`}>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-gray-900 border border-gray-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-red-600 focus:shadow-inner-red transition-colors"
                  required
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-gray-900 border border-gray-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-red-600 focus:shadow-inner-red transition-colors"
                  required
                />
              </div>
              <div>
                <textarea 
                  rows={4} 
                  placeholder="Your Message" 
                  className="w-full bg-gray-900 border border-gray-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-red-600 focus:shadow-inner-red transition-colors"
                  required
                ></textarea>
              </div>
              <Button 
                type="submit" 
                className="w-full group"
                onClick={onGlitchTrigger}
              >
                SEND MESSAGE
                <span className="ml-1 group-hover:ml-2 transition-all inline-block">&rarr;</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 