import axios from "../config/axios"
import Swal from 'sweetalert2'


export const setVehicals = (vehicals) => {
    return {
        type : 'SET_VEHICAL',
        payload : vehicals
    }
} 

export const startGetVehicals = () => {
    return (dispatch) => {
        axios.get('/users/vehicals', {
                headers : {'x-auth' : localStorage.getItem('x-auth')}
        })
        .then(response => {
            console.log('data',response.data)
            if(response.data.message){
                Swal.fire(
                    'Alert!',
                    response.data.message,
                    'error'
                  )  
            } else {
                dispatch(setVehicals(response.data))
            }
        })
    }
}

export const addVehical = (vehical) => {
    return {
        type : 'ADD_VEHICAL',
        payload : vehical
    }
}

export const startAddVehical = (formData, redirect) => {
    return (dispatch) => {
        axios.post('/users/vehicals', formData, {
            headers : {'x-auth' : localStorage.getItem('x-auth')}
        })
            .then(response => {
                if(response.data.message){
                    Swal.fire(
                        'Alert!',
                        response.data.message,
                        'error'
                      )  
                }else {
                    dispatch(addVehical(response.data))
                    redirect()
                }
            })
    }
}

export const removeVehical = (id) => {
    return {
        type : 'REMOVE_VEHICAL',
        payload : id
    }
}

export const StartRemoveVehical = (id) => {
    return (dispatch) => {
        axios.delete(`/users/vehicals/${id}`, {
            headers : {'x-auth' : localStorage.getItem('x-auth')}
        })
            .then(response => {
                dispatch(removeVehical(response.data._id))
            })
            
    } 
}