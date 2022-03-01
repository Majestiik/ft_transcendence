import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./redux"
import thunk from 'redux-thunk';
import App from './App';
import "./styles/index.scss"
import { getUsers } from './redux/actions/users.actions';
import { io, Socket } from 'socket.io-client';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))); // enelever composeWithDevTools for production
store.dispatch(getUsers());

const socket = io("http://" + window.location.hostname + ":3001/", { transports : ['websocket'] });
export const SocketContext = createContext(socket);
socket.on('connect', () => {
	console.log("connected");
	console.log("http://" + window.location.hostname + ":3001/");
});

ReactDOM.render(
		<Provider store={store}>
		<SocketContext.Provider value={socket}>
			<App/>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js"></script>
		</SocketContext.Provider>
		</Provider>,
  document.getElementById('root')
);

