import React from 'react';

interface AboutProps {
  revealedItems: number[];
}

const About: React.FC<AboutProps> = ({ revealedItems }) => {
  const stats = [
    { value: '10+', label: 'Years of Experience', delay: '0s' },
    { value: '50+', label: 'Award-Winning Projects', delay: '0.2s' },
    { value: '100K+', label: 'Thrilled Participants', delay: '0.4s' }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 animate-on-scroll">
            <h2 className={`text-3xl md:text-4xl font-creepy font-bold mb-6 ${revealedItems.includes(9) ? 'fade-in' : 'opacity-0'}`}
                style={{animationDelay: '100ms'}}>
              ABOUT <span className="text-red-600">THRILLER</span>KAH
            </h2>
            <p className={`text-gray-300 mb-4 ${revealedItems.includes(10) ? 'fade-in' : 'opacity-0'}`}
               style={{animationDelay: '300ms'}}>
              Welcome to the realm of psychological suspense and heart-pounding thrills. ThrillerKah creates immersive experiences that blur the line between reality and nightmare.
            </p>
            <p className={`text-gray-300 mb-6 ${revealedItems.includes(11) ? 'fade-in' : 'opacity-0'}`}
               style={{animationDelay: '500ms'}}>
              Founded by masters of suspense, our team crafts experiences that will challenge your perception and leave you questioning what's real and what's just a figment of your darkest imagination.
            </p>
            <div className={`flex gap-4 ${revealedItems.includes(12) ? 'fade-in' : 'opacity-0'}`}
                 style={{animationDelay: '700ms'}}>
              {stats.map((stat, index) => (
                <div key={index} className="border-l-2 border-red-600 pl-4 creepy-float bg-black/50 p-3 rounded-sm" style={{animationDelay: stat.delay}}>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={`lg:w-1/2 animate-on-scroll ${revealedItems.includes(13) ? 'fade-in' : 'opacity-0'}`}>
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-sm overflow-hidden">
                <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: "url('/images/about-thriller.jpg')"}}></div>
                <div className="absolute inset-0 bg-red-900/10 flicker-anim pointer-events-none"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-red-600 to-red-900 rounded-sm flex items-center justify-center creepy-float">
                <div className="text-center">
                  <div className="text-xl font-bold">EST.</div>
                  <div className="text-3xl font-black">2024</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 