import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Lobby from './components/lobby/Lobby' // Ensure this path is correct

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomId" element={<Lobby />} /> {/* Add this */}
      </Routes>
    </>
  )
}

export default App
