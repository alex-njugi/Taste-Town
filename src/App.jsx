import React from 'react'
import { Route, Routes } from 'react-router-dom'
import About from "./components/About"
import Contact from "./components/Contact"
import Home from "./components/Home"
import Menu from "./components/Menu"
import Layout from './components/Layout'
import Errorlink from './components/Errorlink'


function App() {
    return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/Menu" element={<Menu/>}/>
      </Route>
      <Route path='*' element={<Errorlink/>}/>
      
    </Routes>
  )
}

export default App
