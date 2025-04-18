import React from 'react'
import { Route, Routes } from 'react-router-dom'
import About from "./components/About"
import Contact from "./components/Contact"
import Home from "./components/Home"
import Menu from "./components/Menu"
import Layout from './components/Layout'
import Errorlink from './components/Errorlink'
import ProductDetail from './subcomponents/ProductDetails'
import { useState,useEffect } from 'react'
import Admin from './components/Admin'


function App() {
   const [products, setproducts] = useState([])
      useEffect(() => {
          fetch('https://taste-town-server.vercel.app/items')
          .then(res => res.json())
          .then(data => setproducts(data))
        
      }, [])
      

    return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/Menu" element={<Menu products={products}/>}/>
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path='/Admin' element={<Admin/>}/> 
      </Route>
      <Route path='*' element={<Errorlink/>}/>
      
    </Routes>
  )
}

export default App
