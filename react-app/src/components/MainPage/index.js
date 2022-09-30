import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ServerNav from './ServerNav';
import ServerPage from './ServerPage';
import NoServerPage from './NoServerPage';
import { getDirectChats } from '../../store/directChat';
import { getOneServer } from '../../store/server';
import { getChannels } from '../../store/channels';
import { getUsers } from '../../store/users';
import '../CSS/MainPage.css';
import { listAllServers } from '../../store/servers';

const MainPage = () => {
    const [selectedServer, setSelectedServer] = useState(0)
    const dispatch = useDispatch()
    const servers = useSelector(state => state.servers)
    const server = useSelector(state => state.server)



    const [generalChannelId, setGeneralChannelId] = useState()
    const [channelId, setChannelId] = useState();
    const [currChannel, setCurrChannel] = useState()
    const [directChatId, setDirectChatId] = useState();
    const [showFriends, setShowFriends] = useState(false);
    const [channelName, setChannelName] = useState("general");
    const [channelTopic, setChannelTopic] = useState("");
    const [channelActive, setChannelActive] = useState(false);

    // console.log('selected server', selectedServer)
    // console.log('GENERAL CHANNEL', generalChannelId)
    // console.log('CHANNEL ID', channelId)
    // console.log(currChannel, 'CURRENT CHANNEL')
    // console.log(channelName, 'CHANNEL NAME')
    // console.log(channelTopic, 'CHANNEL TOPIC')

    useEffect(() => {
        dispatch(listAllServers())
        setChannelId(generalChannelId)
        setCurrChannel(generalChannelId)

        dispatch(getOneServer(selectedServer))
        dispatch(getUsers())
        dispatch(getDirectChats())
        dispatch(getChannels(selectedServer))


    }, [dispatch, generalChannelId, selectedServer])

    return (
        <div id='main-application'>
            <div className='main-server-container'>
                <div className='main-left-container'>
                    <ServerNav setSelectedServer={setSelectedServer} setDirectChatId={setDirectChatId} setShowFriends={setShowFriends} setChannelActive={setChannelActive} setGeneralChannelId={setGeneralChannelId} setChannelName={setChannelName} setChannelTopic={setChannelTopic} />
                </div>
                <div className='main-middle-container'>
                    {selectedServer !== 0 ? (
                        <ServerPage id={selectedServer} generalChannelId={generalChannelId} setGeneralChannelId={setGeneralChannelId} channelId={channelId} setChannelId={setChannelId} channelName={channelName} setChannelName={setChannelName} channelTopic={channelTopic} setChannelTopic={setChannelTopic} channelActive={channelActive} setChannelActive={setChannelActive} currChannel={currChannel} setCurrChannel={setCurrChannel} />
                    ) : (
                        <NoServerPage directChatId={directChatId} setDirectChatId={setDirectChatId} showFriends={showFriends} setShowFriends={setShowFriends} />
                    )}
                </div>
            </div>
        </div>
    );

};

export default MainPage;
