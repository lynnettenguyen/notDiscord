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
    const user = useSelector(state=> state.session.user)

    const id = Object.keys(server)[0]

    const [generalChannelId, setGeneralChannelId] = useState(channels ? Object.keys(channels)[0] : "")

    const [directChatId, setDirectChatId] = useState()
    const [showFriends, setShowFriends] = useState(false)
    const [channelName, setChannelName] = useState(channels ? channels[generalChannelId]?.name : "general")
    const [channelTopic, setChannelTopic] = useState(channels ? channels[generalChannelId]?.topic : "")


    useEffect(() => {
        dispatch(getUsers())
        dispatch(getDirectChats())
        dispatch(getOneServer(id))

    }, [dispatch])

    useEffect(() => {
        dispatch(getDirectChats())
    })

    useEffect(() => {
        if (channels) {
            setGeneralChannelId(Object.keys(channels)[0])
            setChannelName(channels[generalChannelId]?.name)
            setChannelTopic(channels[generalChannelId]?.topic)
        }
    }, [server])


    return (
        <div id='main-application'>
            <div className='main-server-container'>
                <div className='main-left-container'>
                    <ServerNav setDirectChatId={setDirectChatId} setShowFriends={setShowFriends} setChannelName={setChannelName} channelTopic={channelTopic} setChannelTopic={setChannelTopic} />
                </div>
                <div className='main-middle-container'>
                    {channels ? (
                        <ServerPage id={id} generalChannelId={generalChannelId} setGeneralChannelId={setGeneralChannelId} channelName={channelName} setChannelName={setChannelName} channelTopic={channelTopic} setChannelTopic={setChannelTopic} />
                    ) : (
                        <NoServerPage directChatId={directChatId} setDirectChatId={setDirectChatId} showFriends={showFriends} setShowFriends={setShowFriends} />
                    )}
                </div>
            </div>
        </div>
    );

};

export default MainPage;
