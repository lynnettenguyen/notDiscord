import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import addServerHand from '../CSS/images/create-server-icon.svg'
import "../CSS/ServerForm.css"

const ServerForm = () => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()

  const [page, setPage] = useState(0)
  const [serverName, setServerName] = useState(`${user.username}'s server`)
  const [serverImage, setServerImage] = useState("")


  const handleSubmit = async (e) => {
    e.preventdefault()
  }

  return (
    <>
      <div className='server-form-outer'>
        <form onSubmit={handleSubmit} className={page < 1 ? "block" : "hidden"}>
          {page == 0 &&
            <section className={page === 1 ? "block" : "hidden"}>
              <div className='server-form-header'>Create a server</div>
              <div className='server-form-caption'>Your server is where you and your friends hand out. Make yours and start talking.</div>
              <button type="button" onClick={() => { setPage(page + 1) }} className='create-own-button'>
                <img src={addServerHand} />Create My Own
                <span className='fa solid fa-angle-right'></span>
              </button>
            </section>
          }
          {page >= 1 &&
            <section className={page === 1 ? "block" : "hidden"}>
              <div>Customize your server</div>
              <div>Give your new server a personality with a name and an  icon. You can always change it later.</div>
              <div>
                <div>
                  <label>SERVER IMAGE</label>
                  <input
                    placeholder='https://image.url'
                    value={serverImage}
                    onChange={(e) => setServerImage(e.target.value)}
                  />
                </div>
                <div>
                  <label>SERVER NAME</label>
                  <input
                    value={serverName}
                    onChange={(e) => setServerName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <div><button type="button" onClick={() => { setPage(page - 1) }} className="back-button">Back</button></div>
                <div><button type="submit">Create</button></div>
              </div>
            </section>
          }
        </form>
      </div>
    </>
  )
}

export default ServerForm
