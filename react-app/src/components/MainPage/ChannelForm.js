import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChannel, removeChannel, updateChannel } from '../../store/channels';
import { listAllServers } from '../../store/servers';
import '../CSS/ChannelForm.css'
import hashtag from '../CSS/images/channel-hashtag.svg'
// import deleteBin from '../CSS/images/delete-server-bin.svg'

const ChannelForm = ({ id, setShowModal, showEditChannel, channelId, setChannelId, setShowEditChannel, setChannelName, setChannelTopic }) => {
  const channels = useSelector(state => state.channels)
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [topic, setTopic] = useState("")
  const [nameEdit, setNameEdit] = useState(channels[channelId]?.name)
  const [topicEdit, setTopicEdit] = useState(channels[channelId]?.topic)

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
      setChannelName(name)
      setChannelTopic(topic)
      dispatch(listAllServers())
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

    const response = await (dispatch(updateChannel(channelData)))

    if (response) {
      setChannelId(response.id)
      setChannelName(nameEdit)
      setChannelTopic(topicEdit)
      dispatch(listAllServers())
    }

    setShowEditChannel(false)
    setShowModal(false)
  }

  const handleChannelDelete = () => {
    const response = dispatch(removeChannel(id, channelId))
    if (response) {
      setChannelName("")
      setChannelTopic("")
      dispatch(listAllServers())
      setShowEditChannel(false)
      setShowModal(false)
    }
  }

  return (
    <>
      {showEditChannel ?
        <>
          <div className='main-channel-form'>
            <div className='channel-form-upper'>
              <div className='fa-solid fa-x channel-close' onClick={() => setShowModal(false)}></div>
              <div className='edit-channel-form-header'>Edit Channel</div>
            </div>
            <div>
              <form onSubmit={handleEditChannel}>
                <div className='channel-form-text-main'>
                  <div>
                    <div><label className='channel-form-label'>CHANNEL NAME</label></div>
                    <div className='channel-name-outer'>
                      <div className='channel-form-hash-outer'>
                        <img src={hashtag} className='channel-form-hash' alt='hashtag' />
                      </div>
                      <input
                        placeholder='new-channel'
                        value={nameEdit}
                        className='channel-name-input'
                        onChange={(e) => setNameEdit(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <div><label className='channel-form-label'>CHANNEL TOPIC</label></div>
                      <div className='channel-topic-outer'>
                        <input
                          placeholder='channel-topic'
                          className='channel-topic-input'
                          value={topicEdit}
                          onChange={(e) => setTopicEdit(e.target.value)}
                          required
                        />
                      </div>
                      <div className='bottom-channel-section'>
                        <button type='submit' className='channel-update-button'>Update</button>
                        <div className='delete-channel-outer'>
                          <button type='button' className='channel-delete-button' onClick={handleChannelDelete}><span className='delete-name'>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </> :
        <>
          <div className='main-channel-form'>
            <div className='channel-form-upper'>
              <div className='fa-solid fa-x channel-close' onClick={() => setShowModal(false)}></div>
              <div className='channel-form-header'>Create Channel</div>
            </div>
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
                    <div><label className='channel-form-label'>CHANNEL NAME</label></div>
                    <div className='channel-name-outer'>
                      <div className='channel-form-hash-outer'>
                        <img src={hashtag} className='channel-form-hash' alt='hashtag' />
                      </div>
                      <div>
                        <input
                          placeholder='channel-name'
                          className='channel-name-input'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <div><label className='channel-form-label'>CHANNEL TOPIC</label></div>
                      <div className='channel-topic-outer'>
                        <input
                          placeholder='channel-topic'
                          value={topic}
                          className='channel-topic-input'
                          onChange={(e) => setTopic(e.target.value)}
                          required
                        />
                      </div>
                      <div className='bottom-channel-section'>
                        <button onClick={() => setShowModal(false)} className='channel-cancel'>Cancel</button>
                        <button type='submit' className='create-channel-button'>Create Channel</button>
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
