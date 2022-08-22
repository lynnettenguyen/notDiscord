import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { allServers, listAllServers } from '../../store/servers';

const ServerNav = () => {
  const dispatch = useDispatch()
  const servers = useSelector((state) => Object.values(state.servers))
  console.log(servers)

  useEffect(() => {
    dispatch(listAllServers())
  }, [])

  return (
    <>
      <div>TEST1</div>
      <div>
        {servers?.map((server, i) => {
          return (
            <>
              <div>{server.name}</div>
            </>
          )
        })}
      </div>
    </>
  )
}

export default ServerNav
