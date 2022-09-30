import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
    const [generalChannelId, setGeneralChannelId] = useState()
    const [channelId, setChannelId] = useState();
    const [directChatId, setDirectChatId] = useState();
    const [showFriends, setShowFriends] = useState(false);
    const [channelName, setChannelName] = useState("general");
    const [channelTopic, setChannelTopic] = useState("");
    const [channelActive, setChannelActive] = useState(false);

    useEffect(() => {
        dispatch(listAllServers())
        setChannelId(generalChannelId)
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
                        <ServerPage
                            id={selectedServer} setSelectedServer={setSelectedServer} generalChannelId={generalChannelId} setGeneralChannelId={setGeneralChannelId}
                            channelId={channelId} setChannelId={setChannelId}
                            channelName={channelName} setChannelName={setChannelName}
                            channelTopic={channelTopic} setChannelTopic={setChannelTopic} channelActive={channelActive} setChannelActive={setChannelActive} />
                    ) : (
                        <NoServerPage directChatId={directChatId} setDirectChatId={setDirectChatId} showFriends={showFriends} setShowFriends={setShowFriends} />
                    )}
                </div>
            </div>
        </div>
    );

};

export default MainPage;
