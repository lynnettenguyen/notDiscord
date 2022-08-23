import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateServer } from '../../store/servers';
import { Modal } from '../context/Modal';

import "../CSS/EditServerForm.css"


const EditServerForm = ({ setShowDropdown, id }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const server = useSelector(state => state.server[id])
  const serverPic = useSelector(state => state.server[id].server_pic)
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState(`${server.name}`)
  const [server_pic, setServerPic] = useState(serverPic)

  // useEffect(()=>{
  //   console.log('!!!user', user)
  //   console.log('!!!serverPic', serverPic)
  //   console.log('!!!id', id)
  // }, [])




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
        <div className='delete-server-button'>
          Delete Server
        </div>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <div className='edit-server-modal-container'>
              <form onSubmit={handleSubmit} className="block">
            <section>
              <div>Customize your server</div>
              <div>Give your new server a personality with a name and an  icon. You can always change it later.</div>
              <div>
                <div>
                  <label>SERVER IMAGE</label>
                  <input
                    name='server_pic'
                    placeholder='https://image.url'
                    value={server_pic}
                    onChange={(e) => setServerPic(e.target.value)}
                  />
                </div>
                <div>
                  <label>SERVER NAME</label>
                  <input
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
