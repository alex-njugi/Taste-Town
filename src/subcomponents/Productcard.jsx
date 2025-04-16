import React from 'react'

const IndividualProduct = ({image,title,price}) => {
  return(

    <div className='individualprod'>
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
            
            />
        ))}

    </div>
  )
}

export default Productcard