import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ServerNav from './ServerNav';
import ServerPage from './ServerPage';
import NoServerPage from './NoServerPage';
import { getDirectChats } from '../../store/directChat';
import { getChannels, getOneServer } from '../../store/server';
import { getUsers } from '../../store/users';
import '../CSS/MainPage.css';

const MainPage = () => {
    const dispatch = useDispatch()
    const server = useSelector(state => state.server)
    const channels = useSelector(state => state.server.channels)

    const id = Object.keys(server)[0]

    const [generalChannelId, setGeneralChannelId] = useState(channels ? Object.keys(channels)[0] : "")

    const [directChatId, setDirectChatId] = useState();
    const [showFriends, setShowFriends] = useState(false);
    const [channelName, setChannelName] = useState(channels ? channels[generalChannelId]?.name : "general");
    const [channelTopic, setChannelTopic] = useState(channels ? channels[generalChannelId]?.topic : "");
    const [channelActive, setChannelActive] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const func = async () => {
            await dispatch(getUsers())
            await dispatch(getDirectChats())
            await dispatch(getOneServer(id))
            await dispatch(getChannels(id))
        }
        func()
    }, [dispatch])



    useEffect(() => {
        if (channels) {
            setGeneralChannelId(Object.keys(channels)[0])
            setChannelName(channels[generalChannelId]?.name)
            setChannelTopic(channels[generalChannelId]?.topic)
            setLoaded(true)
        }
    }, [server])

    return (
        <div id='main-application'>
            <div className='main-server-container'>
                <div className='main-left-container'>
                    <ServerNav setDirectChatId={setDirectChatId} setShowFriends={setShowFriends} setChannelName={setChannelName} channelTopic={channelTopic} setChannelTopic={setChannelTopic} setChannelActive={setChannelActive} setGeneralChannelId={setGeneralChannelId} />
                </div>
                <div className='main-middle-container'>
                    {channels ? (
                        <ServerPage id={id} generalChannelId={generalChannelId} setGeneralChannelId={setGeneralChannelId} channelName={channelName} setChannelName={setChannelName} channelTopic={channelTopic} setChannelTopic={setChannelTopic} channelActive={channelActive} setChannelActive={setChannelActive} />
                    ) : (
                        <NoServerPage directChatId={directChatId} setDirectChatId={setDirectChatId} showFriends={showFriends} setShowFriends={setShowFriends} />
                    )}
                </div>
            </div>
        </div>
    );

};

export default MainPage;
