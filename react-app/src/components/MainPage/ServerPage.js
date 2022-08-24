import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import EditServerForm from './EditServerForm'
import downArrow from '../CSS/images/down-arrow.svg'
import plusIcon from '../CSS/images/discord-add-icon.svg'
import hashtag from '../CSS/images/channel-hashtag.svg'
import editGear from '../CSS/images/edit-channel-gear.svg'
import Chat from '../Chat';
import ChannelPage from './ChannelPage';
import { Modal } from '../context/Modal';
import ChannelForm from './ChannelForm';

import '../CSS/ServerPage.css';
import '../CSS/EditServerForm.css'






const ServerPage = ({ id, generalChannelId }) => {
    const server = useSelector(state => state.server[id])
    const users = useSelector(state => Object.values(state.users))
    const channels = useSelector(state => Object.values(state.server.channels))
    const generalChannel = channels[0]
    const [isLoaded, setIsLoaded] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [channelId, setChannelId] = useState()
    const [showModal, setShowModal] = useState(false)
    const [showEditChannel, setShowEditChannel] = useState(false)

    // console.log("channel id from server page", channelId)

    console.log("generalChannelId", generalChannelId)

    useEffect(() => {
        if (channels) {
            setIsLoaded(true)
        }
    }, [isLoaded, channels])

    const editServer = () => {
        setShowDropdown(!showDropdown)
    }

    return isLoaded && (
        <div className='ServerPage-container'>
            <div className='ServerPage-NavBar'>
                <div className='ServerPage-name'>{server.name}<button className='server-name-button' onClick={editServer}><i className="fas fa-angle-down"></i></button></div>
                <div className='ServerPage-channel-name'></div>
                <div className='ServerPage-NavBar-buttons'></div>
                {showDropdown && (<EditServerForm setShowDropdown={setShowDropdown} id={id} setIsLoaded={setIsLoaded} />)}
            </div>
            <div className='ServerPage-content-container'>
                <div className='ServerPage-left-container'>
                    <div className='channel-header'>
                        <div className='down-arrow-icon'><img src={downArrow} /></div>
                        <div className='channels-header'>CHANNELS</div>
                        <div className='add-channel-button'>
                            <img src={plusIcon} className='add-channel-icon' onClick={() => { setShowModal(true) }} />
                            {showModal && (
                                <Modal onClose={() => { setShowModal(false); setShowEditChannel(false) }}>
                                    <ChannelForm setShowModal={setShowModal} showEditChannel={showEditChannel} />
                                </Modal>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className='channels-main'>
                            {channels?.map((channel, i) => {
                                return (
                                    <div key={i} className='server-channels' onClick={() => { setChannelId(channel.id) }}>
                                        <div>
                                            <img src={hashtag} />
                                            {channel.name} {channel.id}
                                            <div className='edit-channel-button'>
                                                <img src={editGear} onClick={() => { setShowModal(true); setShowEditChannel(true) }} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className='ServerPage-middle-container'>
                    <div className='channel-chat'>

                        <ChannelPage generalChannelId={generalChannelId} channelId={channelId} />

                        <Chat channelId={channelId} />
                    </div>
                </div>
                <div className='ServerPage-right-container'>
                    {users?.map((user, i) => { return (<div key={i} className='server-users'>{user.username}</div>) })}
                </div>
            </div>
        </div>
    );
};

export default ServerPage;
