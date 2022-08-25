import React, { useEffect } from 'react';
import ServerNav from './ServerNav';
import '../CSS/MainPage.css';
import { useDispatch, useSelector } from 'react-redux';
import ServerPage from './ServerPage';
import NoServerPage from './NoServerPage';
import { getOneServer } from '../../store/server';
import ChannelPage from './ChannelPage';


const MainPage = () => {
    const dispatch = useDispatch()
    const server = useSelector(state => state.server)
    const channels = useSelector(state => state.server.channels)
    const id = Object.keys(server)[0]

    let generalChannelId;

    if (channels) generalChannelId = Object.keys(channels)[0]

    useEffect(() => {
        dispatch(getOneServer(id))
    }, [dispatch])

    return (
        <>
            <div className='main-server-container'>
                <div className='main-left-container'>
                    <ServerNav />
                </div>
                <div className='main-middle-container'>
                    {channels ? (
                        <>
                        <ServerPage id={id} generalChannelId={generalChannelId} />
                        </>
                    ) : (
                        <NoServerPage />
                    )}
                </div>
            </div>
        </>
    );

};

export default MainPage;
