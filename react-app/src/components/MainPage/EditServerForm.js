import React, { useState } from 'react';
import { Modal } from '../context/Modal';

import "../CSS/EditServerForm.css"


const EditServerForm = ({ setShowDropdown }) => {
  const [showModal, setShowModal] = useState()


  return (
    <div className='dropdown-container'>
        <div className='edit-server-button' onClick={()=>setShowModal(true)}>
          Edit
        </div>
        <div className='delete-server-button'>
          Delete Server
        </div>
    </div>
  )
}

export default EditServerForm
