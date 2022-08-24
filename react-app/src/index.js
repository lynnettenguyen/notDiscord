import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store';
import './index.css';
import { socket, SocketContext } from './components/context/Socket';


const store = configureStore();


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <SocketContext.Provider value={socket}> */}
        <App />
      {/* </SocketContext.Provider> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
