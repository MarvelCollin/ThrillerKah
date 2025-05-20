import { useEffect } from 'react'
import './App.css'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Features from './components/sections/Features'
import Gallery from './components/sections/Gallery'
import About from './components/sections/About'
import Contact from './components/sections/Contact'
import { useScrollAnimation } from './hooks/useScrollAnimation'
import { useGlitchEffect } from './hooks/useGlitchEffect'

function App() {
  const { revealedItems, activeSection, scrollY } = useScrollAnimation()
  const { isGlitching, triggerGlitch } = useGlitchEffect()
  
  useEffect(() => {
    const bloodDrips = document.querySelectorAll('.blood-drip')
    bloodDrips.forEach(drip => {
      drip.classList.add('blood-drip-animation')
    })
  }, [])

  return (
    <div className="font-sans text-gray-100 bg-black min-h-screen">
      <Header
        activeSection={activeSection}
        scrollY={scrollY}
        isGlitching={isGlitching}
      />
      
      <Hero
        isGlitching={isGlitching}
        onGlitchTrigger={triggerGlitch}
      />
      
      <Features
        revealedItems={revealedItems}
      />
      
      <Gallery
        revealedItems={revealedItems}
      />
      
      <About
        revealedItems={revealedItems}
      />
      
      <Contact
        revealedItems={revealedItems}
        onGlitchTrigger={triggerGlitch}
      />
      
      <Footer />
    </div>
  )
}

export default App
