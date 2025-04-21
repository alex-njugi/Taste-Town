import React from 'react'
import AddProducts from './AddProducts'
import DeleteProducts from './DeleteProducts'

const Admin = ({products,setproducts}) => {
  return (
    <div>
        <AddProducts/>
        <DeleteProducts/>
    </div>
  )
}

export default Admin