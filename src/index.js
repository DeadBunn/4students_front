import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from './store/userStore';
import OrderStore from './store/orderStore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Context = createContext(null);

ReactDOM.render(
    <Context.Provider
        value={{
            user: new UserStore(),
            order: new OrderStore(),
            userRole: localStorage.getItem('role'),
            pageType: 'all'
        }}
    >
        <ToastContainer />
        <App />
    </Context.Provider>,
    document.getElementById('root')
);
