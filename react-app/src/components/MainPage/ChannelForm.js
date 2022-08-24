import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../CSS/ChannelForm.css'
import hashtag from '../CSS/images/channel-hashtag.svg'

const ChannelForm = ({ setShowModal, showEditChannel }) => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const [name, setName] = useState("")



  return (
    <>
      {showEditChannel ?
        <>
          TEST FROM EDIT CHANNEL FORM

        </> :
        <>
          <div>
            <div className='channel-form-header'>Create Channel</div>
            <div className='channel-form-caption'>in Text Channels</div>
            <div>
              <form>
                <div className='channel-form-text-main'>
                  <div><img src={hashtag} alt='hashtag' /></div>
                  <div><label for='text'>Text</label></div>
                  <div>
                    <input
                      type="radio"
                      id='text'
                      name='text'
                    />
                  </div>
                  <div>
                    <div><label>CHANNEL NAME</label></div>
                    <div>
                      <img src={hashtag} alt='hashtag' />
                      <input
                        placeholder='new-channel'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <button>Cancel</button>
                      <button>Create Channel</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>

      }
    </>
  )
}

export default ChannelForm
