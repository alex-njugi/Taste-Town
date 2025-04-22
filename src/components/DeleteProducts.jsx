import React from 'react'

const DeleteProducts = () => {
  return (
    <div className='delete-products'>
      <h1>Delete Products</h1>
      <p>Are you sure you want to delete this product?</p>
      <button className='delete-btn'>Delete</button>
      <button className='cancel-btn'>Cancel</button>
      <p>Product deleted successfully!</p>
      <p>Product not found.</p>
      
    </div>
  )
}

export default DeleteProducts