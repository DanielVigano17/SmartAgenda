import { useState } from 'react'
import './CSS/App.css'
import Header from './Header'
import Nav from './Nav'
import Pomo from './Pomo'

function App() {


  return (
    <div className='grid-container'>

     <Nav />
     
     <div className='content'>

     <Header />
    <Pomo />
     </div>
     
    </div>
  )
}

export default App
