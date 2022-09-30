import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addServer, listAllServers } from '../../store/servers';
import {  getOneServer, } from '../../store/server';
import { getUsers } from '../../store/users';
import handIcon from '../CSS/images/create-server-icon.svg'
import "../CSS/ServerForm.css"

const ServerForm = ({ setShowModalCreate, setSelectedServer, setGeneralChannelId, setChannelName, setChannelTopic }) => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()

  const [page, setPage] = useState(0)
  const [name, setName] = useState(`${user.username}'s server`)
  const [server_pic, setServerPic] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const serverData = {
      name,
      server_pic
    }

    const response = await dispatch(addServer(serverData))

    if (response) {
      setSelectedServer(response.id)
      await dispatch(listAllServers())

      const serverResponse = await dispatch(getOneServer(response.id))
      if (serverResponse) {
        setGeneralChannelId(Object.values(serverResponse[0].channels)[0].id)
        setChannelName("general")
        setChannelTopic("")
      }

      await dispatch(getUsers())
      setShowModalCreate(false)
    }
  }

  return (
    <>
      <div className='server-form-outer'>
        <button className='close-modal' onClick={()=>setShowModalCreate(false)}><i className="fa-thin fa-x"/></button>
        <form onSubmit={handleSubmit} className={page < 1 ? "flex" : "hidden"}>
          {page === 0 &&
            <section className={page === 1 ? "flex" : "hidden"}>
              <div className='inner-form'>
                <div className='server-form-header'>Create a server</div>
                <div className='server-form-caption'>Your server is where you and your friends hand out. Make yours and start talking.</div>
                <div onClick={() => setPage(page + 1)} className='create-own-button'>
                  <div className='create-img'><img alt='hand-icon' src={handIcon} /></div>
                  <div className='create-text'>Create My Own</div>
                  <span className='fa solid fa-angle-right'></span>
                </div>
              </div>
            </section>
          }
          {page >= 1 &&
            <section className={page === 1 ? "flex" : "hidden"}>
              <div className='inner-form'>
                <div className='server-form-header'>Customize your server</div>
                <div className='server-form-caption'>Give your new server a personality with a name and an icon. You can always change it later.</div>
                <div>
                  <div>
                    <div className='server-form-label'>SERVER IMAGE</div>
                    <div>
                      <input
                        name='server_pic'
                        className='server-form-input'
                        placeholder='https://image.url'
                        value={server_pic}
                        onChange={(e) => setServerPic(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <div className='server-form-label'>SERVER NAME</div>
                    <div>
                      <input
                        name='name'
                        className='server-form-input'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className='bottom-form-section'>
                    <button onClick={() => setPage(page - 1)} className="back-button">Back</button>
                    <button type="submit" className='create-server-button'>Create</button>
                  </div>
                </div>
              </div>
            </section>
          }
        </form>
      </div>
    </>
  )
}

export default ServerForm
