import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import HomePage from './components/HomePage/HomePage'
import ProtectedRoute from './components/auth/ProtectedRoute';
import '../src/components/CSS/fonts.css'
import MainPage from './components/MainPage';
import { ModalProvider } from './components/context/Modal';
import { authenticate } from './store/session';
import NoServerPage from './components/MainPage/NoServerPage';
import ServerNav from './components/MainPage/ServerNav';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <ModalProvider>
      <ServerNav/>
      <BrowserRouter>
        <Switch>
          <ProtectedRoute exact path='/servers'>
            <MainPage />
          </ProtectedRoute>
          <ProtectedRoute exact path='/noServer'>
            <NoServerPage />
          </ProtectedRoute>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path='/login'>
            <LoginForm />
          </Route>
          <Route exact path='/register'>
            <SignUpForm />
          </Route>
        </Switch>
      </BrowserRouter>
    </ModalProvider>
  );
}

export default App;
