/* eslint-disable import/no-anonymous-default-export */
import { useState } from 'react'
import css from './Login.module.css'
import { Link, useHistory } from 'react-router-dom'
import axios from '../../config/index'

const initialData = {
    email: localStorage.getItem('userEmail') || '',
    password: '',
    saveuser: localStorage.getItem('userEmail') ? true : false
}

function Login(props) {

    const [data, setData] = useState(initialData)
    const history = useHistory()

    const onChange = e => {
        const name = e.target.name
        const value = e.target.value
        setData({
            ...data,
            [name]: value
        })
        console.log(data)
    }

    const changeCheck = e => {
        const {name, checked} = e.target
        setData({
            ...data,
            [name]: checked
        })
        console.log(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (data.saveuser) {
                localStorage.setItem('userEmail', data.email)
            } else {
                localStorage.removeItem('userEmail')
            }
            const resp = await axios.post('/auth/login', data)
            localStorage.setItem('userToken', resp.data.token)
            history.push("/dashboard")
        } catch (error) {
            alert('Login não pode ser efetuado.')
            console.log(error)
        }
    }

    return (
        <div className={css.login}>
            <div className={css.box}>
                <h1>TaskPub</h1>
                <form onSubmit={handleSubmit}>
                    <div className={'form-group ' + css.group}>
                        <label htmlFor="email">Email</label>
                        <input type="email" onChange={onChange} value={data.email} name="email" className="form-control" id="email" placeholder="seuemail@mail.com"/>
                    </div>
                    <div className={'form-group ' + css.group}>
                        <label htmlFor="password">Senha</label>
                        <input type="password" onChange={onChange} value={data.password} name="password" className="form-control" id="password" placeholder="Senha"/>
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" onChange={changeCheck} value={data.saveuser} name="saveuser" className="form-check-input" id="saveuser"/>
                        <label className="form-check-label" htmlFor="saveuser">Lembre meu usuário</label>
                    </div>
                        <button type="submit" className="btn btn-primary">Logar</button>
                </form>
                <Link className={css.link} to="/register" >Registrar</Link>
                <Link className={css.link} to="/password" >Esqueci minha senha</Link>
            </div>
        </div>
    )
}

export default Login