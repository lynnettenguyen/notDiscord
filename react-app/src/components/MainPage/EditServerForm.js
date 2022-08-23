import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { deleteServer, updateServer } from '../../store/servers';
import { Modal } from '../context/Modal';

import "../CSS/EditServerForm.css"
import { resetServer } from '../../store/server';


const EditServerForm = ({ setShowDropdown, id, setIsLoaded }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const server = useSelector(state => state.server[id])
  const serverPic = useSelector(state => state.server[id].server_pic)
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState(`${server.name}`)
  const [server_pic, setServerPic] = useState(serverPic)

  const handleDelete = async () => {
    const response = await dispatch(deleteServer(id))
    setShowDropdown(false)
    setIsLoaded(false)
    if (response) {
      dispatch(resetServer())
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const serverData = {
      id,
      name,
      server_pic
    }
    const response = await dispatch(updateServer(serverData))
    if (response) {
      setShowModal(false)
      setShowDropdown(false)
    }
  }


  return (
    <div className='dropdown-container'>
        <div className='edit-server-button' onClick={()=>setShowModal(true)}>
          Edit
        </div>
        <div className='delete-server-button' onClick={handleDelete}>
          Delete Server
        </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
          <div className='edit-server-modal-container'>
            <form onSubmit={handleSubmit} className="block">
            <section>
              <div>
                <div>
                  <label>SERVER NAME</label>
                  <input
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label>SERVER IMAGE</label>
                  <input
                    name='server_pic'
                    placeholder='https://image.url'
                    value={server_pic}
                    onChange={(e) => setServerPic(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div><button type="submit">Update Server</button></div>
                </div>
            </section>
            </form>
          </div>
          </Modal>
        )}
    </div>
  )
}

export default EditServerForm
