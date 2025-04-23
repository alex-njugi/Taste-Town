# Taste Town

# **Online E-commerce supermarket**

This project is an online e-commerce suprmarket built with React. It allows users to explore a veriety of products and filter by category. An admin panel is included to add **new products** to the catalog and **delete existing products** from the server.Mainly focusing on working with useState,useEffect,Routing and fetching from external APIs.

---

## **Installation**

Access the live application here: [Live Link](https://taste-town-five.vercel.app/)

GitHub Repository: [Taste Town](https://github.com/Richard3wasonga/Taste-Town)

1. Clone this repository:
   ```bash
   git clone https://github.com/Richard3wasonga/Taste-Town
   ```
2. Navigate to the project directory:
   ```bash
   cd Taste-Town
   ```
3. Install all dependencies
   ```bash
   npm intsall
   ```
4. Ensure to all applicable components the server url is set to `https://taste-town-server.vercel.app/items`.

5. Run the project on browser
   ```bash
   npm run dev
   ```

---

## **How the user interface works**

### **App.jsx**
This script fetches product data from the server and passing it down to components.It also houses all the routes that enable the user to effortlessly navigate around the the website and renders the components.

```jsx
import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
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
   
  
      const router = createBrowserRouter([
        {
          path: '/',
          element: <Layout />,
          children: [
            { index: true, element: <Home /> },
            { path: 'About', element: <About /> },
            { path: 'Contact', element: <Contact /> },
            { path: 'Menu', element: <Menu products={products} /> },
            { path: 'product/:id', element: <ProductDetail /> },
            { path: 'Admin', element: <Admin products={products} setproducts={setproducts} /> }
          ]
        },
        {
          path: '*',
          element: <Errorlink />
        }
      ])
      

    return (
      <RouterProvider router={router}/>
    
  )
}

export default App

```
---

### **FilterEchange**
This is where the filter functionnality is housed, the filter button opens a side bar containg the avaialble categories and a checkbox that when checked filteres  the products and passes the filtred array to the `productCard`

```jsx
import React, { useState } from 'react';
import Productcard from './Productcard';
import FilterOption from './FilterOption';

const FilterExchange = ({ products }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleSidebar = () => {
    setShowSidebar(prev => !prev);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = selectedCategories.length === 0
    ? products
    : products.filter(product =>
        selectedCategories.includes(product.category)
      );

  return (
    <div className="filter-exchange">
      <FilterOption toggleSidebar={toggleSidebar} />

      <div className={`sidebar ${showSidebar ? 'show' : 'hide'}`}>
        <h3>Filter by Category</h3>
        {categories.map((category, id) => (
          <label key={id}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            {category}
          </label>
        ))}
        <button className='sidebtn' onClick={toggleSidebar}>Close</button>
      </div>

      <Productcard products={filteredProducts} />
    </div>
  );
};

export default FilterExchange;

```
---

### **ProductCard**
This is where each of the product are displayed in thier individual div and displayed in the menu.An onClick event listener is placed on each image, when clicked passes the clicked propduct data to navigate and is stored in state and then navigated to the `ProductDetails`

```jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'

const IndividualProduct = ({image,name,price,product}) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/product/${product._id}`,{state: {product}})
  }

  return(

    <div className='individualprod'>
        <img src={image} alt="Product Image" onClick={handleClick} />
        <h2>{name}</h2>
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
            name={product.name}
            price={product.price}
            product={product}
            
            />
        ))}

    </div>
  )
}

export default Productcard

```
---

### **ProductDetails**
This part is where a clicked product infomation that is hidden in the menu is shown.The passed data about the product is accessed using useLocation and that data used to load more infomation on the product and if user accidentally accesses this page a "product not found" message will be displayed with a button to navigate back to menu.

```jsx
import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom'

const ProductDetail = () => {
  const { state } = useLocation()
  const product = state?.product
  const navigate = useNavigate()

  const handleBackToList = () => {
    navigate('/Menu')  
  }

  if (!product) { 
    return( 
        <>
            <p>Product not found.</p>
        </>
    )
  }

  return (
    <div className='product-detail'>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>Price: ${product.price}</p>
      <p>{product.description || 'No description available.'}</p>
      <button className="back-to-list-btn" onClick={handleBackToList}>Back to Product List</button>
    </div>
  )
}

export default ProductDetail

```

---

## **How the Admin interface works**

The admin page can be accessed by clicking on the `usergear` icon.

### **DeleteProducts.jsx**
This part the is a table that displays all the server products with a a delete button for each product.When delete button is clicked an asyncronized function is used to delete products from the server and update the UI only when the server deletion is successful to make sure the UI and server are always in sync.

```jsx
import React from 'react'

const DeleteProducts = ({products,setproducts}) => {

  async function handleDelete(id) {
    try {
      const res = await fetch(`https://taste-town-server.vercel.app/items/${id}`, {
        method: 'DELETE',
      });
  
      if (!res.ok) {
        throw new Error('Failed to delete from server');
      }
  
      const filtered = products.filter(product => String(product.id) !== String(id));
      setproducts(filtered);
       
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  }
  

  return (
    <div className="admin-panel">
      <h2 className="admin-title">DELETE </h2>
      {products.length === 0 ? (
        <p className="no-products">No products available.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>
                  <button 
                    className="delete-button" 
                    onClick={() => handleDelete(product.id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  
  )
}

export default DeleteProducts

```
---

## **Feature Overview**

- Product detail page with routing.
- Dynamic filtering products by category.
- Admin panel for **adding new product** and **deleting existing products** from server.

---

## **Technologies Used**

### **Frontend**
- **React** – Frontend library for building UI components  
- **React Router DOM** – Client-side routing  
- **React Hooks** (`useState`, `useEffect`) – For managing state and side effects  
- **CSS** – Custom styling  

### **Backend (API)**
- **Node.js (hosted on Vercel)** – RESTful API for product data  
- **API Endpoint** – [`https://taste-town-five.vercel.app/items`](https://taste-town-five.vercel.app/items)

---

## **Future Improvement**

- Integration with a backend server and a real database.
- Implement user authentication for personalized experiences.
- Enhance the UI/UX for a more modern look.
- Implement Admin authentication for secure control of site.
- Implement **edit functionality** for products in the admin panel.

---
## **Authors**
- Richard Wasonga - [GitHub Profile](https://github.com/Richard3wasonga)

- Lenny Kimanthi - [GitHub Profile](https://github.com/Huncho-lenny)

- Rodney Amani - [Github Profile](https://github.com/r0dn3y7)

- Ochieng Oduor - [Github Profile](https://github.com/Ochienggg)

## **Contributors**
- Bob Oyier - [GitHub Profile](https://github.com/oyieroyier)

---

## **License**

This project is open-source and available under the MIT License.





