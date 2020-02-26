import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import { setUser } from './actions/usersActions';
import axios from './config/axios';
import { startGetVehicals } from './actions/vehicalsAction';

const store = configureStore()

store.subscribe(() => {
    console.log(store.getState())
})


if(localStorage.getItem('x-auth')){
    axios.get('/users/account',{
         headers: {
                 'x-auth': localStorage.getItem('x-auth')
         }
    })
    .then(response=>{
            const user = response.data
            store.dispatch(setUser(user))
            store.dispatch(startGetVehicals())
    })             
}


console.log(store.getState())

const jsx = (
    <Provider store = {store} >
        <App />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));

