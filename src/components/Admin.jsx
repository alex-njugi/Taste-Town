import React from 'react'
import AddProducts from './AddProducts'
import DeleteProducts from './DeleteProducts'

const Admin = ({products,setproducts}) => {
  return (
    <div>
<AddProducts />
<DeleteProducts products={products} setproducts={setproducts} />

    </div>
  )
}

export default Admin