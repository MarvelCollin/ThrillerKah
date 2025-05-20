import React from 'react';
import type { GalleryItem } from '../../types';

interface GalleryProps {
  revealedItems: number[];
}

const Gallery: React.FC<GalleryProps> = ({ revealedItems }) => {
  const galleryItems: GalleryItem[] = [
    { id: 1, title: "NIGHTMARE SCENE", subtitle: "Explore the darkness within", imagePath: "/images/thriller-1.jpg" },
    { id: 2, title: "HORROR FRAGMENT", subtitle: "Explore the darkness within", imagePath: "/images/thriller-2.jpg" },
    { id: 3, title: "NIGHTMARE SCENE", subtitle: "Explore the darkness within", imagePath: "/images/thriller-3.jpg" },
    { id: 4, title: "HORROR FRAGMENT", subtitle: "Explore the darkness within", imagePath: "/images/thriller-4.jpg" },
    { id: 5, title: "NIGHTMARE SCENE", subtitle: "Explore the darkness within", imagePath: "/images/thriller-5.jpg" },
    { id: 6, title: "HORROR FRAGMENT", subtitle: "Explore the darkness within", imagePath: "/images/thriller-6.jpg" }
  ];

  return (
    <section id="gallery" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-creepy font-bold mb-12 text-center">
          <span className="text-red-600">SPINE-CHILLING</span> GALLERY
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`overflow-hidden group relative cursor-pointer animate-on-scroll ${revealedItems.includes(index + 3) ? 'fade-in' : 'opacity-0'}`}
              style={{animationDelay: `${index * 150}ms`}}
            >
              <div className="aspect-w-4 aspect-h-3 bg-gray-800">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                  style={{backgroundImage: `url('${item.imagePath}')`}}
                ></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4">
                  <h3 className="text-lg font-display font-semibold tracking-wider">{item.title} {item.id}</h3>
                  <p className="text-sm text-gray-300">{item.subtitle}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery; 