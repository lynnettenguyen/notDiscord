import React, { useState } from 'react';
import { Modal } from '../context/Modal';

import "../CSS/EditServerForm.css"


const EditServerForm = ({ setShowDropdown, setPage }) => {
  const [showModal, setShowModal] = useState()


  return (
    <div className='dropdown-container'>
        <div className='edit-server-button' onClick={()=>setPage(1)}>
          Edit
        </div>
        <div className='delete-server-button'>
          Delete Server
        </div>
    </div>
  )
}

export default EditServerForm
