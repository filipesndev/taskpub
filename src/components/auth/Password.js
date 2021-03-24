import { Link } from 'react-router-dom'
import css from './Password.module.css'
import { useState } from 'react'

const initialData = {
    email: ''
}

function Password(props) {

    const [data, setData] = useState(initialData)

    const onChange = e => {
        const {name, value} = e.target
        setData({
            ...data,
            [name]: value
        })
        console.log(data)
    }

    const handleSubmit = e => {
        alert('Verifique a caixa de entrada do seu email para recuperação da senha.')
    }

    return (
        <div className={css.password}>
            <div className={css.box}>
                <h1>Nova senha</h1>
                <form onSubmit={handleSubmit}>
                    <div className={'form-group ' + css.group}>
                        <label htmlFor="email">Email</label>
                        <input type="email" onChange={onChange} value={data.email} name="email" className="form-control" id="email" placeholder="seuemail@mail.com"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Solicitar</button>
                </form>
                <Link to="/login" >Login</Link>
            </div>
        </div>
    )
}

export default Password