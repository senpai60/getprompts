import React from 'react'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import DisplayPrompt from './pages/DisplayPrompt'
import { Route, Router, Routes } from 'react-router'

function App() {
  return (
    
    <div className='bg-zinc-950 text-zinc-200 open-sans'>
      <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/:pinId' element={<DisplayPrompt/>} />
     </Routes>
    </div>
  )
}

export default App