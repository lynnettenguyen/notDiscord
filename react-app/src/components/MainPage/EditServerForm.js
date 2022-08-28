import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteServer, listAllServers, updateServer } from '../../store/servers';
import { Modal } from '../context/Modal';
import { getChannels, resetServer } from '../../store/servers';
import greyPencil from '../CSS/images/edit-server-pencil.svg'
import whitePencil from '../CSS/images/edit-server-pencil-white.svg'
import redBin from '../CSS/images/delete-server-bin.svg'
import whiteBin from '../CSS/images/delete-server-bin-white.svg'
import "../CSS/EditServerForm.css"

const EditServerForm = ({ setShowDropdown, serverId, setIsLoaded }) => {
  const dispatch = useDispatch()
  const server = useSelector(state => state.servers[serverId])
  const serverPic = useSelector(state => state.servers[serverId].server_pic)
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState(`${server.name}`)
  const [server_pic, setServerPic] = useState(serverPic)
  const [pencil, setPencil] = useState(greyPencil)
  const [bin, setBin] = useState(redBin)

  const handleDelete = async () => {
    const response = await dispatch(deleteServer(serverId))

    setShowDropdown(false)
    setIsLoaded(false)

    if (response) {
      dispatch(resetServer())
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const serverData = {
      id: serverId,
      name,
      server_pic
    }

    const response = await dispatch(updateServer(serverData))

    if (response) {
      // await dispatch(getOneServer(serverId))
      await dispatch(listAllServers(serverId))
      await dispatch(getChannels(serverId))
      setShowModal(false)
      setShowDropdown(false)
    }
  }

  return (
    <div className='dropdown-container'>
      <div className='edit-server-button' onMouseOver={() => setPencil(whitePencil)} onMouseLeave={() => setPencil(greyPencil)} onClick={() => setShowModal(true)}>
        Edit <img className='server-edit-pencil' alt='edit' src={pencil} />
      </div>
      <div className='delete-server-button' onMouseOver={() => setBin(whiteBin)} onMouseLeave={() => setBin(redBin)} onClick={handleDelete}> Delete Server
        <img className='server-delete-bin' alt='delete' src={bin} />
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className='edit-server-modal-container'>
            <form onSubmit={handleSubmit} className="block">
              {/* <section> */}
                <div>
                  <div className='edit-server-modal-server-name'>
                    <label className='edit-server-modal-main-label'>Edit Server</label>
                    <label className='edit-server-modal-server-label'>SERVER NAME</label>
                    <div className='edit-server-modal-input-server-name-outer'>
                      <input
                        name='name'
                        className='edit-server-modal-input-server-name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='edit-server-modal-server-image'>
                    <label className='edit-server-modal-image-label'>SERVER IMAGE</label>
                    <div className='edit-server-modal-input-server-image-outer'>
                      <input
                        name='server_pic'
                        className='edit-server-modal-input-server-image'
                        placeholder='https://image.url'
                        value={server_pic}
                        onChange={(e) => setServerPic(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className='edit-server-buttons-container'>
                  <button onClick={() => {setShowModal(false); setShowDropdown(false)}} className='edit-server-modal-cancel-button'>Cancel</button>
                  <button type="submit" className='edit-server-modal-submit-button'>Update Server</button>
                </div>
              {/* </section> */}
            </form>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default EditServerForm
