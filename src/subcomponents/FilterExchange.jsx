import React,{useEffect,useState} from 'react'
import Productcard from './Productcard'

const FilterExchange = ({roducts}) => {
    const [products, setproducts] = useState([])
    useEffect(() => {
        fetch('https://taste-town-server.vercel.app/items')
        .then(res => res.json())
        .then(data => setproducts(data))
      
    }, [])
    
    
  return (
    <div>
        <Productcard products={products}/>
    </div>
  )
}

export default FilterExchange