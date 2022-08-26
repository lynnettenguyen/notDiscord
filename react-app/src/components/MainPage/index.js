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
    const [check, setCheck] = useState(false)

    const id = Object.keys(server)[0]

    const [directChatId, setDirectChatId] = useState()
    const [showFriends, setShowFriends] = useState(false)

    let generalChannelId;

    if (channels) generalChannelId = Object.keys(channels)[0]

    useEffect(() => {
        dispatch(getUsers())
        dispatch(getDirectChats())
        dispatch(getOneServer(id))
    }, [dispatch])

    // useEffect(()=>{
    //     if (server) {
    //         setCheck(true)
    //     }
    // }, [channels, server])


    if (check) return (
        <div id='main-application'>
            <div className='main-server-container'>
                <div className='main-left-container'>
                    <ServerNav setDirectChatId={setDirectChatId} setShowFriends={setShowFriends} />
                </div>
                <div className='main-middle-container'>
                    <ServerPage id={id} generalChannelId={generalChannelId} />
                </div>
            </div>
        </div>
    );

    if (!check) return (
        <div id='main-application'>
        <div className='main-server-container'>
            <div className='main-left-container'>
                <ServerNav setDirectChatId={setDirectChatId} setShowFriends={setShowFriends} />
            </div>
            <div className='main-middle-container'>
                <NoServerPage directChatId={directChatId} setDirectChatId={setDirectChatId} showFriends={showFriends} setShowFriends={setShowFriends} />
            </div>
            </div>
        </div>
    );

};

export default MainPage;
