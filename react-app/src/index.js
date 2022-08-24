import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store';
import './index.css';

const store = configureStore();

export const socket = null;
export const SocketContext = React.createContext();


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketContext.Provider value={socket}>
        <App />
      </SocketContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
