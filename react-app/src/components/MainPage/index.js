import React, { useEffect, useState } from 'react';
import ServerNav from './ServerNav';
import '../CSS/MainPage.css';
import { useDispatch, useSelector } from 'react-redux';
import ServerPage from './ServerPage';
import NoServerPage from './NoServerPage';
import { getOneServer } from '../../store/server';
import { getDirectChats } from '../../store/directChat';
import { getUsers } from '../../store/users';

const MainPage = () => {
    const dispatch = useDispatch()
    const server = useSelector(state => state.server)
    const channels = useSelector(state => state.server.channels)
    const directChats = useSelector(state => Object.values(state.directChat))

    const id = Object.keys(server)[0]

    const [directChatId, setDirectChatId] = useState()

    let generalChannelId;

    if (channels) generalChannelId = Object.keys(channels)[0]

    useEffect(() => {
        dispatch(getUsers())
        dispatch(getDirectChats())
        dispatch(getOneServer(id))
    }, [dispatch])

    return (
        <>
            <div className='main-server-container'>
                <div className='main-left-container'>
                    <ServerNav directChatId={directChatId} setDirectChatId={setDirectChatId} />
                </div>
                <div className='main-middle-container'>
                    {channels ? (
                        <ServerPage id={id} generalChannelId={generalChannelId} />
                    ) : (
                        <NoServerPage directChatId={directChatId} setDirectChatId={setDirectChatId} />
                    )}
                </div>
            </div>
        </>
    );

};

export default MainPage;
