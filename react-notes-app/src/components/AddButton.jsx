import React from 'react'
import { Link } from 'react-router-dom';
import {ReactComponent as AddBtn} from '../assests/add.svg';
const AddButton = () => {
  return (
    <Link to="/note/new" className='floating-button'>
        <AddBtn />
    </Link>
        
    
  )
}

export default AddButton