import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChannel, removeChannel, editChannel } from '../../store/server';
import '../CSS/ChannelForm.css'
import hashtag from '../CSS/images/channel-hashtag.svg'

const ChannelForm = ({ id, setShowModal, showEditChannel, channelId, setChannelId, setShowEditChannel }) => {
  const channels = useSelector(state => state.server.channels)
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [topic, setTopic] = useState("")
  const [nameEdit, setNameEdit] = useState(`${channels[channelId]?.name}`)
  const [topicEdit, setTopicEdit] = useState(`${channels[channelId]?.topic}`)

  const handleCreateChannel = async (e) => {
    e.preventDefault()

    const channelData = {
      server_id: id,
      name,
      topic
    }

    const response = await (dispatch(addChannel(channelData)))

    if (response) {
      setChannelId(response.id)
    }

    setShowModal(false)
  }

  const handleEditChannel = async (e) => {
    e.preventDefault()

    const channelData = {
      id: channelId,
      server_id: id,
      name: nameEdit,
      topic: topicEdit
    }

    const response = await (dispatch(editChannel(channelData)))

    if (response) {
      setChannelId(response.id)
    }

    setShowEditChannel(false)
    setShowModal(false)
  }

  const handleChannelDelete = (id, channelId) => {
    dispatch(removeChannel(id, channelId))
    setShowEditChannel(false)
    setShowModal(false)
  }

  return (
    <>
      {showEditChannel ?
        <>
          <div>
            <div className='channel-form-header'>Edit Channel</div>
            <div>
              <button className="fa-thin fa-x" onClick={() => setShowModal(false)}></button>
              <form onSubmit={handleEditChannel}>
                <div className='channel-form-text-main'>
                  <div>
                    <div><label>CHANNEL NAME</label></div>
                    <div>
                      <img src={hashtag} alt='hashtag' />
                      <input
                        placeholder='new-channel'
                        value={nameEdit}
                        onChange={(e) => setNameEdit(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <div><label>CHANNEL TOPIC</label></div>
                      <div>
                        <input
                          placeholder='channel-topic'
                          value={topicEdit}
                          onChange={(e) => setTopicEdit(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <button type='submit'>Update</button>
                        <button onClick={() => handleChannelDelete(id, channelId)}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </> :
        <>
          <div>
            <div className='channel-form-header'>Create Channel</div>
            <div className='channel-form-caption'>in Text Channels</div>
            <div>
              <form onSubmit={handleCreateChannel}>
                <div className='channel-form-text-main'>
                  {/* <div><img src={hashtag} alt='hashtag' /></div> */}
                  {/* <div><label for='text'>Text</label></div> */}
                  {/* <div>
                    <input
                      type="radio"
                      id='text'
                      name='text'
                    />
                  </div> */}
                  <div>
                    <div><label>CHANNEL NAME</label></div>
                    <div>
                      <img src={hashtag} alt='hashtag' />
                      <input
                        placeholder='new-channel'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <div><label>CHANNEL TOPIC</label></div>
                      <div>
                        <input
                          placeholder='channel-topic'
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <button onClick={() => setShowModal(false)}>Cancel</button>
                        <button type='submit'>Create Channel</button>
                      </div>
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
