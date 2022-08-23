import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import addServerHand from '../CSS/images/create-server-icon.svg'

const ServerForm = () => {
  const [page, setPage] = useState(0)

  return (
    <>
      <form>
        <div>Create a server</div>
        <div>Your server is where you and your friends hand out. Make yours and start talking.</div>
        <button><img src={addServerHand} />Create My Own <span className='fa solid fa-angle-right'></span></button>
      </form>
    </>
  )
}

export default ServerForm
