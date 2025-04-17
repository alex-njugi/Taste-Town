import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFilter} from '@fortawesome/free-solid-svg-icons'


const FilterOption = ({toggleSidebar }) => {
  return (
    <div className='filter-options'>
        <button onClick={toggleSidebar}><FontAwesomeIcon icon={faFilter} /> Filter</button>

    </div>
  )
}

export default FilterOption