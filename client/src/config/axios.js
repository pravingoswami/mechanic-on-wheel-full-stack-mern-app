import Axios from 'axios'

const axios = Axios.create({
    baseURL : 'http://localhost:3017'
})
export default axios