import React,{createContext} from 'react';
import ReactDOM  from 'react-dom';
import App from './App';
import UserStore from './store/userStore';

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        order: new OrderStore(),
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);