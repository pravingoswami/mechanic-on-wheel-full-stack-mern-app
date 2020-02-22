const vehicalsInitialState = []

const vehicalsReducers = (state = vehicalsInitialState, action) => {
    switch(action.type){

        case 'SET_VEHICAL' : {
            return [...action.payload]
        }

        case 'ADD_VEHICAL' : {
            return [...state, action.payload]
        }

        case 'REMOVE_VEHICAL' : {
            return state.filter(vehical => vehical._id !== action.payload)
        }

        default : {
            return [...state]
        }
    }
} 

export default vehicalsReducers