import React, { useEffect } from 'react';
import ServerNav from './ServerNav';
import '../CSS/MainPage.css';
import { useDispatch, useSelector } from 'react-redux';
import ServerPage from './ServerPage';
import NoServerPage from './NoServerPage';
import { getOneServer } from '../../store/server';


const MainPage = () => {
    const dispatch = useDispatch()
    const server = useSelector(state => state.server)
    const channels = useSelector(state => state.server.channels)
    const id = Object.keys(server)[0]

    console.log('all channels from index', channels)
    // console.log('first channel general', Object.keys(channels))

    useEffect(()=>{
        dispatch(getOneServer(id))
    }, [dispatch])

    return (
        <>
            <div className='main-server-container'>
                <div className='main-left-container'>
                    <ServerNav />
                </div>
                <div className='main-middle-container'>
                    {channels ? (<ServerPage id={id} />) : (<NoServerPage />)}
                </div>
            </div>
        </>
    );

};

export default MainPage;
