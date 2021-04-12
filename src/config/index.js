import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.18.39:3333/api'

axios.interceptors.request.use(config => {

    if (localStorage.userToken) {
        config.headers = {
            'Authorization': 'Bearer ' + localStorage.userToken
        }
    }

    return config

})

export default axios
