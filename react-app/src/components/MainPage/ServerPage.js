import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChannels } from '../../store/server';
import '../CSS/ServerPage.css';


const ServerPage = ({ id }) => {
    const server = useSelector(state => state.server[id])
    const channels = useSelector(state => state.server.channels)

    const dispatch = useDispatch()

    useEffect(() => {
        // console.log('CHANNELS!!', channels)
        dispatch(getChannels(id))
    }, [dispatch])

    return (
        <div className='ServerPage-container'>
            <div className='ServerPage-NavBar'>
                <div className='ServerPage-name'>{server.name}</div>
                <div className='ServerPage-channel-name'></div>
                <div className='ServerPage-NavBar-buttons'></div>

            </div>
            <div className='ServerPage-left-container'>
                <div className='channels-main'>
                    {/* {channels && channels?.map((channel, i) => {return (<div key={i} className={`channel${i}`}>{channel}</div>)})} */}
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
