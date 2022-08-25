import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteServer, updateServer } from '../../store/servers';
import { Modal } from '../context/Modal';
import { getChannels, getOneServer, resetServer } from '../../store/server';
import greyPencil from '../CSS/images/edit-server-pencil.svg'
import whitePencil from '../CSS/images/edit-server-pencil-white.svg'
import redBin from '../CSS/images/delete-server-bin.svg'
import whiteBin from '../CSS/images/delete-server-bin-white.svg'

import "../CSS/EditServerForm.css"


const EditServerForm = ({ setShowDropdown, id, setIsLoaded }) => {
  const dispatch = useDispatch()
  const server = useSelector(state => state.server[id])
  const serverPic = useSelector(state => state.server[id].server_pic)
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState(`${server.name}`)
  const [server_pic, setServerPic] = useState(serverPic)
  const [pencil, setPencil] = useState(greyPencil)
  const [bin, setBin] = useState(redBin)

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
      await dispatch(getOneServer(id))
      await dispatch(getChannels(id))
      setShowModal(false)
      setShowDropdown(false)
    }
  }


  return (
    <div className='dropdown-container'>
        <div className='edit-server-button' onMouseOver={()=>setPencil(whitePencil)} onMouseLeave={()=>setPencil(greyPencil)} onClick={()=>setShowModal(true)}>
          Edit <img className='server-edit-pencil' src={pencil}/>
        </div>
        <div className='delete-server-button' onMouseOver={()=>setBin(whiteBin)} onMouseLeave={()=>setBin(redBin)} onClick={handleDelete}>
          Delete Server <img className='server-delete-bin' src={bin}/>
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
