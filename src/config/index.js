import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.18.39:3333/api'

export default axios

/* 

    api/auth/login post 
        email
        password

    api/usuarios post
        username
        email
        password
        admin 1 ou 0
        inativo false

*/
