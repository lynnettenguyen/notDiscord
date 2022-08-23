import React from 'react';
import ServerNav from './ServerNav';
import '../CSS/MainPage.css';
import { useSelector } from 'react-redux';
import ServerPage from './ServerPage';
import NoServerPage from './NoServerPage';


const MainPage = () => {
    const server = useSelector(state => state.server)
    const channels = useSelector(state => state.server.channels)
    const id = Object.keys(server)[0]

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
