import axios from '../config/axios'

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
                    alert(response.data.errors)
                } else {
                    console.log(response.data)
                    localStorage.setItem('x-auth', response.data.token)
                    dispatch(setUser(response.data.user))
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
                    alert(response.data.message)
                } else {
                    localStorage.removeItem('x-auth')
                    dispatch(removeUser())
                }
            })
    }
}