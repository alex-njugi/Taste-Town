import React,{useState} from 'react'
import Productcard from './Productcard'
import FilterOption from './FilterOption'



const FilterExchange = ({products}) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(prev => !prev);
  };
   return (
    <div className="filter-exchange">
        <FilterOption toggleSidebar={toggleSidebar}/>

      <div className={`sidebar ${showSidebar ? 'show' : 'hide'}`}>
        <h3>Filter Sidebar</h3>
        <p>Put filter options here</p>
        <button onClick={toggleSidebar}>Close</button>
      </div>

        <Productcard products={products}/>
    </div>
  )
}

export default FilterExchange