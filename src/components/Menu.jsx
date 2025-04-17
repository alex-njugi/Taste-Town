import React from 'react'
import FilterExchange from '../subcomponents/FilterExchange'

const Menu = ({products}) => {
  return (
    <div>Menu
      <FilterExchange products={products}/>
    </div>
  )
}

export default Menu