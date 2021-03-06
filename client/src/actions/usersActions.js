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
        axios.post('/users/login', formData)
            .then(response => {
                console.log(response.data)
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
        axios.delete('/users/logout', {
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

export const editUser = (user) => {
    return {
        type : 'EDIT_USER',
        payload : user
    }
}

export const startRegisterUser = (formData, redirect) => {
    return (dispatch) => {
        axios.post('/users/register', formData)
            .then(response => {
                if(response.data.errmsg){
                    Swal.fire(
                        'Alert!',
                        response.data.errmsg,
                        'error'
                      )
                } else if(response.data.message){
                    Swal.fire(
                        'Alert!',
                        response.data.message,
                        'error'
                      )
                } else {
                    Swal.fire(
                        'Registered!!',
                        'You Successfully registered.',
                        'success'
                      ) 
                    redirect()
                }
            })
    }
}

export const startEditUser = (formData, redirect) => {
    return(dispatch) => {
        axios.put('/users/edit', formData , {
            headers : {
                'x-auth' : localStorage.getItem('x-auth')
            }
        })
        .then(response => {
            console.log(response.data)
            if(response.data.errmsg){
                Swal.fire(
                    'Alert!',
                    response.data.errmsg,
                    'error'
                  )
            } else if(response.data.message){
                Swal.fire(
                    'Alert!',
                    response.data.message,
                    'error'
                  )
            } else {
                dispatch(editUser(response.data))
                Swal.fire(
                    'Updated!!',
                    'You Successfully Updated Data.',
                    'success'
                  )  
                  console.log(response.data)
                redirect()
            }
        })
    }
}