import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [scrollY, setScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isGlitching, setIsGlitching] = useState(false)
  const [revealedItems, setRevealedItems] = useState<number[]>([])
  const [activeSection, setActiveSection] = useState('home')
  
  const titleRef = useRef<HTMLHeadingElement>(null)
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      const sections = ['home', 'features', 'gallery', 'about', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 150 && rect.bottom >= 150
        }
        return false
      })
      
      if (current) {
        setActiveSection(current)
      }
      
      document.querySelectorAll('.animate-on-scroll').forEach((element, index) => {
        const rect = element.getBoundingClientRect()
        const isInView = rect.top <= window.innerHeight * 0.8
        
        if (isInView && !revealedItems.includes(index)) {
          setRevealedItems(prev => [...prev, index])
        }
      })
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [revealedItems])
  
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 1000)
    }, 10000)
    
    return () => clearInterval(glitchInterval)
  }, [])
  
  useEffect(() => {
    const bloodDrips = document.querySelectorAll('.blood-drip')
    bloodDrips.forEach(drip => {
      drip.classList.add('blood-drip-animation')
    })
  }, [])

  return (
    <div className="font-sans text-gray-100 bg-black min-h-screen">
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
            {['Home', 'Features', 'Gallery', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className={`relative text-sm uppercase tracking-widest hover:text-red-600 transition-colors ${activeSection === item.toLowerCase() ? 'text-red-600' : 'text-white'}`}
              >
                {item}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-red-600 transition-all duration-300 ${activeSection === item.toLowerCase() ? 'w-full' : 'w-0'}`}></span>
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
            {['Home', 'Features', 'Gallery', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className={`block py-3 text-sm uppercase tracking-widest transition-colors border-b border-gray-800 ${activeSection === item.toLowerCase() ? 'text-red-600' : 'hover:text-red-600 text-white'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </header>

      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black z-10"></div>
        <div className="absolute inset-0 bg-[url('/images/thriller-bg.jpg')] bg-center bg-cover opacity-40 hover:scale-105 transition-all duration-2000"></div>
        
        <div className="absolute top-0 w-full blood-drip"></div>
        
        <div className="container mx-auto px-4 z-20 text-center">
          <h1 
            ref={titleRef}
            className={`font-creepy text-5xl md:text-7xl font-bold mb-6 tracking-wider text-white text-shadow ${isGlitching ? 'glitch' : 'animate-pulse-slow'}`}
            data-text="WELCOME TO DARKNESS"
          >
            WELCOME TO <span className="text-red-600">DARKNESS</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed text-gray-300 fade-in">
            Experience the thrill of the unknown in our immersive thriller universe
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="group bg-gradient-to-r from-red-700 to-red-900 text-white py-3 px-8 rounded-sm transition-all duration-300 flex items-center justify-center hover:shadow-glow"
              onMouseEnter={() => setIsGlitching(true)}
              onMouseLeave={() => setIsGlitching(false)}
            >
              EXPLORE NOW
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <button className="border border-white hover:border-red-600 hover:text-red-600 text-white py-3 px-8 rounded-sm transition-colors duration-300 hover:bg-black/50">
              WATCH TRAILER
            </button>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-creepy font-bold mb-12 text-center">
            <span className="text-red-600">TERRIFYING</span> FEATURES
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Immersive Stories",
                description: "Deeply engaging narratives that will keep you on the edge of your seat.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                )
              },
              {
                title: "Haunting Visuals",
                description: "Striking imagery designed to linger in your mind long after you leave.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: "Psychological Twists",
                description: "Mind-bending turns that challenge your perception of reality.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                ref={(el) => { featureRefs.current[index] = el }}
                className={`bg-gradient-to-b from-gray-900 to-black p-8 border border-gray-800 rounded-sm hover:border-red-900 transition-colors group animate-on-scroll hover:shadow-glow ${revealedItems.includes(index) ? 'fade-in' : 'opacity-0'}`}
                style={{animationDelay: `${index * 200}ms`}}
              >
                <div className="text-red-600 mb-4 transform group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-creepy font-bold mb-12 text-center">
            <span className="text-red-600">SPINE-CHILLING</span> GALLERY
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <div 
                key={item} 
                className={`overflow-hidden group relative cursor-pointer animate-on-scroll ${revealedItems.includes(index + 3) ? 'fade-in' : 'opacity-0'}`}
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className="aspect-w-4 aspect-h-3 bg-gray-800">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                       style={{backgroundImage: `url('/images/thriller-${item}.jpg')`}}></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4">
                    <h3 className="text-lg font-display font-semibold tracking-wider">{item % 2 === 0 ? "NIGHTMARE SCENE" : "HORROR FRAGMENT"} {item}</h3>
                    <p className="text-sm text-gray-300">Explore the darkness within</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                <div className="border-l-2 border-red-600 pl-4 creepy-float bg-black/50 p-3 rounded-sm">
                  <div className="text-2xl font-bold text-white">10+</div>
                  <div className="text-sm text-gray-400">Years of Experience</div>
                </div>
                <div className="border-l-2 border-red-600 pl-4 creepy-float bg-black/50 p-3 rounded-sm" style={{animationDelay: '0.2s'}}>
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-sm text-gray-400">Award-Winning Projects</div>
                </div>
                <div className="border-l-2 border-red-600 pl-4 creepy-float bg-black/50 p-3 rounded-sm" style={{animationDelay: '0.4s'}}>
                  <div className="text-2xl font-bold text-white">100K+</div>
                  <div className="text-sm text-gray-400">Thrilled Participants</div>
                </div>
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
                {[
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
                ].map((item, index) => (
                  <div key={index} className={`flex items-center animate-on-scroll ${revealedItems.includes(16 + index) ? 'fade-in' : 'opacity-0'}`}
                      style={{animationDelay: `${index * 200}ms`}}>
                    <div className="bg-gradient-to-br from-red-800 to-red-900 p-3 rounded-sm text-white mr-4 creepy-float shadow-glow" style={{animationDelay: `${index * 0.2}s`}}>
                      {item.icon}
                    </div>
                    <span className="text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`animate-on-scroll ${revealedItems.includes(19) ? 'fade-in' : 'opacity-0'}`}>
              <form className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full bg-gray-900 border border-gray-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-red-600 focus:shadow-inner-red transition-colors"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full bg-gray-900 border border-gray-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-red-600 focus:shadow-inner-red transition-colors"
                  />
                </div>
                <div>
                  <textarea 
                    rows={4} 
                    placeholder="Your Message" 
                    className="w-full bg-gray-900 border border-gray-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-red-600 focus:shadow-inner-red transition-colors"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-red-700 to-red-900 text-white py-3 px-6 rounded-sm transition-colors duration-300 group hover:shadow-glow"
                  onMouseEnter={() => setIsGlitching(true)}
                  onMouseLeave={() => setIsGlitching(false)}
                >
                  SEND MESSAGE
                  <span className="ml-1 group-hover:ml-2 transition-all inline-block">&rarr;</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black border-t border-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <a href="#" className="text-xl font-creepy font-bold tracking-wider text-red-600">
                THRILLER<span className="text-white">KAH</span>
              </a>
            </div>
            
            <div className="flex space-x-6 mb-4 md:mb-0">
              {[
                "Facebook", "Twitter", "Instagram", "YouTube"
              ].map((item) => (
                <a key={item} href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                  {item}
                </a>
              ))}
            </div>
            
            <div className="text-gray-500 text-sm">
              © 2024 ThrillerKah. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
