import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import { setUser } from './actions/usersActions';
import axios from './config/axios';

const store = configureStore()

store.subscribe(() => {
    console.log(store.getState())
})


if(localStorage.getItem('x-auth')){
    axios.get('/customers/account',{
         headers: {
                 'x-auth': localStorage.getItem('x-auth')
         }
    })
    .then(response=>{
            const user = response.data
            store.dispatch(setUser(user))
             
    })             
}


console.log(store.getState())

const jsx = (
    <Provider store = {store} >
        <App />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));

