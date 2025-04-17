import React from 'react'
import { useNavigate } from 'react-router-dom'

const IndividualProduct = ({image,title,price,product}) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/product/${product._id}`,{state: {product}})
  }

  return(

    <div className='individualprod' onClick={handleClick}>
        <img src={image} alt="Product Image" />
        <h2>{title}</h2>
        <p>Price: ${price}</p>
        <button>Add to cart</button>
    </div>
  )

}

const Productcard = ({products}) => {
  console.log(products)
   
  return (
    <div className='productdiv'>
        {products.map((product,id) => (
            <IndividualProduct 
            key={id}
            image={product.image}
            price={product.price}
            product={product}
            
            />
        ))}

    </div>
  )
}

export default Productcard