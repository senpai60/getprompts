import React from 'react'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'

function App() {
  return (
    <div className='bg-zinc-950 text-zinc-200 open-sans'>
      <Navbar/>
      <Home/>
    </div>
  )
}

export default App