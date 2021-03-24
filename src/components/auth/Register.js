import { Link } from 'react-router-dom'
import { useState } from 'react'
import css from './Register.module.css'
import axios from '../../config/index'

const initialData = {
    username: '',
    email: '',
    password: '',
    confpassword: '',
    admin: 0,
    inativo: false
}

function Register(props) {

    const [data, setData] = useState(initialData)

    const onChange = e => {
        const {name, value} = e.target
        setData({
            ...data,
            [name]: value
        })
        console.log(data)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (data.password === data.confpassword) {
            try {
                await axios.post('/usuarios', data)
                alert('Cadastro concluído com sucesso!')
                setData(initialData)
            } catch (error) {
                alert('Não foi possivel cadastrar o usuário.')
                console.log(error)
            }
        }else{
            alert('Senha não confirmada!')
        }
    }

    return (
        <div className={css.register}>
            <div className={css.box}>
                <h1>Resgistro</h1>
                <form onSubmit={handleSubmit}>
                    <div className={'form-group ' + css.group}>
                        <label htmlFor="username">Nome</label>
                        <input onChange={onChange} value={data.username} type="text" className="form-control" name="username" id="username" placeholder="Seu nome"/>
                    </div>
                    <div className={'form-group ' + css.group}>
                        <label htmlFor="email">Email</label>
                        <input onChange={onChange} value={data.email} type="email" className="form-control" name="email" id="email" placeholder="seuemail@mail.com"/>
                    </div>
                    <div className={'form-group ' + css.group}>
                        <label htmlFor="password">Senha</label>
                        <input onChange={onChange} value={data.password} type="password" className="form-control" name="password" id="password" placeholder="Senha"/>
                    </div>
                    <div className={'form-group ' + css.group}>
                        <label htmlFor="confpassword">Confirmar senha</label>
                        <input onChange={onChange} value={data.confpassword} type="password" className="form-control" name="confpassword" id="confpassword" placeholder="Senha"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Registrar</button>
                </form>
                <Link to="/login" >Login</Link>
            </div>
        </div>
    )
}

export default Register