import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChannels } from '../../store/server';
import '../CSS/ServerPage.css';


const ServerPage = ({ id }) => {
    const dispatch = useDispatch()
    const server = useSelector(state => state.server[id])
    const channels = useSelector(state => Object.values(state.server.channels))
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(()=> {
        if (channels) {
            setIsLoaded(true)
        }
    }, [isLoaded])

    return isLoaded && (
        <div className='ServerPage-container'>
            <div className='ServerPage-NavBar'>
                <div className='ServerPage-name'>{server.name}</div>
                <div className='ServerPage-channel-name'></div>
                <div className='ServerPage-NavBar-buttons'></div>

            </div>
            <div className='ServerPage-left-container'>
                <div className='channels-main'>
                    {channels?.map((channel, i) => {return (<div key={i} className='server-channels'>{channel.name}</div>)})}
                </div>
            </div>
            <div className='ServerPage-middle-container'>
                <div className='channel-chat'>

                </div>
            </div>
            <div className='ServerPage-right-container'>

            </div>
        </div>

    );

};

export default ServerPage;
