import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import HomePage from './components/HomePage/HomePage'
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import '../src/components/CSS/fonts.css'
import MainPage from './components/MainPage';
import { ModalProvider } from './components/context/Modal';
import Chat from './components/Chat'
import { authenticate } from './store/session';
import { SocketContext } from './index'
import { listAllServers } from './store/servers';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext)

  useEffect(() => {
    (async () => {
      await dispatch(listAllServers)
      await dispatch(authenticate());
      setLoaded(true);

      // socket.on('load_channel_messages', async (data) => {
        // need thunk for getting all channel messages
        // await dispatch()
      // })

      // socket.on('load_direct_messages', async (data) => {
        // need thunk for getting all direct messages
        // await dispatch()
      // })

    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <ModalProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path='/servers'>
            <MainPage />
          </Route>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path='/login'>
            <LoginForm />
          </Route>
          <Route exact path='/register'>
            <SignUpForm />
          </Route>
          <ProtectedRoute path='/users' exact={true} >
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path='/users/:userId' exact={true} >
            <User />
          </ProtectedRoute>
          <ProtectedRoute path='/chat'>
            <Chat />
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    </ModalProvider>
  );
}

export default App;
