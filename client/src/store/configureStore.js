import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import userReducers from '../reducers/userReducers'
import vehicalsReducers from '../reducers/vehicalsReducers'

const configureStore = () => {
    const store = createStore(combineReducers({
        user : userReducers,
        vehicals : vehicalsReducers
    }), applyMiddleware(thunk))

    return store
}

export default configureStore