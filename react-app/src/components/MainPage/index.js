import React, { useState, useEffect } from 'react';
import ServerNav from './ServerNav';
import '../CSS/MainPage.css';
import { useSelector } from 'react-redux';
import ServerPage from './ServerPage';
import NoServerPage from './NoServerPage';


const MainPage = () => {
    const server = useSelector(state => state.server)
    const id = Object.keys(server)[0]

    useEffect(()=>{
        // console.log('ID!!!', id)
        // console.log('SERVER!!!', server)
    })

    return (
        <>
            <div className='main-server-container'>
                <div className='main-left-container'>
                    <ServerNav />
                </div>
                <div className='main-middle-container'>
                    {server && server[id] ? (<ServerPage id={id} />) : (<NoServerPage />)}
                </div>
            </div>
        </>
    );

};

export default MainPage;
