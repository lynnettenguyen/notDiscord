import React from 'react';
import "../CSS/EditServerForm.css"


const EditServerForm = ({ setShowDropdown }) => {

  return (
    <div className='dropdown-container'>
        <div className='edit-server-button'>
          Edit
        </div>
        <div className='delete-server-button'>
          Delete
        </div>

    </div>
  )
}

export default EditServerForm
