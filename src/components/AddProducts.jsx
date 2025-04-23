import React, { useState } from 'react'

const AddProducts = () => {
  const [formData, setFormData] = useState({
    productName: '',
    productPrice: '',
    productCategory: '',
    productDescription: '',
    productImage: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  
    if (formData.productPrice <= 0) {
      alert('Product price must be a positive number.')
      return
    }

    const productData = {
      name: formData.productName,
      price: parseFloat(formData.productPrice),
      category: formData.productCategory,
      description: formData.productDescription,
      image: formData.productImage
    }

    fetch('https://taste-town-server.vercel.app/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    })
    
      .then((res) => {
        if (!res.ok) throw new Error('Failed to add product') // Catch API errors
        return res.json()
      })
      .then((data) => {
        console.log('Product added:', data)
        alert('Product added successfully!')

        setFormData({
          productName: '',
          productPrice: '',
          productCategory: '',
          productDescription: '',
          productImage: ''
        })
      })
      .catch((err) => {
        console.error('Error:', err)
        alert('There was a problem adding the product.')
      })
  }
  
  return (
    <div>
      <h1>Add Products</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="productPrice">Product Price:</label>
          <input
            type="number"
            id="productPrice"
            name="productPrice"
            value={formData.productPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="productCategory">Product Category:</label>
          <input
            type="text"
            id="productCategory"
            name="productCategory"
            value={formData.productCategory}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="productDescription">Product Description:</label>
          <textarea
            id="productDescription"
            name="productDescription"
            value={formData.productDescription}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="productImage">Product Image URL:</label>
          <input
            type="url"
            id="productImage"
            name="productImage"
            value={formData.productImage}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  )
}

export default AddProducts
