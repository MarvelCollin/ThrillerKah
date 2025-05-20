import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// We still import App.css for logo animations
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-900 text-white">
      <div className="flex gap-8 mb-8">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo h-24 p-6" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react h-24 p-6" alt="React logo" />
        </a>
      </div>
      <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Vite + React + Tailwind
      </h1>
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg mb-8">
        <button 
          onClick={() => setCount((count) => count + 1)}
          className="mb-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-medium transition-colors"
        >
          count is {count}
        </button>
        <p className="text-gray-300 mt-4">
          Edit <code className="bg-gray-700 px-2 py-1 rounded">src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-gray-400">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
