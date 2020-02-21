import axios from '../config/axios'
import Swal from 'sweetalert2'

export const setUser = (user) => {
    return {
        type : 'SET_USER',
        payload : user
    }
}

export const startLoginUser = (formData, redirect) => {
    return (dispatch) => {
        axios.post('/customers/login', formData)
            .then(response => {
                if(response.data.errors){
                    Swal.fire(
                        'Alert!',
                        response.data.errors,
                        'error'
                      )                  
                } else {
                    console.log(response.data)
                    localStorage.setItem('x-auth', response.data.token)
                    dispatch(setUser(response.data.user))
                    Swal.fire(
                        'logged in!!',
                        'You Successfully logged in.',
                        'success'
                      )  
                    redirect()
                }
            })
    }
}

export const removeUser = () => {
    return {
        type : "REMOVE_USER"
    } 
}

export const startLogoutUser = () => {
    return (dispatch) => {
        axios.delete('customers/logout', {
            headers : {'x-auth' : localStorage.getItem('x-auth')}
        })
            .then(response => {
                if(response.data.message){
                    Swal.fire(
                        'Alert!',
                        response.data.message,
                        'error'
                      )
                } else {
                    localStorage.removeItem('x-auth')
                    dispatch(removeUser())
                    Swal.fire(
                        'logged out!!',
                        'You Successfully logged out.',
                        'success'
                      )  
                }
            })
    }
}