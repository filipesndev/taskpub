import css from './ModalAdd.module.css'
import { useState, useEffect } from 'react'
import axios from '../../../config/index'
import Swal from 'sweetalert2'

const initialData = {
    username: '',
    email: '',
    password: '',
    admin: false,
    inativo: false
}

function AdicionarUser(props) {

    const [data, setData] = useState(initialData)
    const [active, setActive] = useState(false)

    const onChange = e => {
        const {name, value} = e.target
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

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            if (props.userId) {
                await axios.put('/usuarios/' + props.userId, data)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Usuário atualizado!',
                    showConfirmButton: false,
                    timer: 1200
                })
                props.setModal(false)           
                props.loadUsers()
            } else {
                await axios.post('/usuarios', data)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Usuário adicionado!',
                    showConfirmButton: false,
                    timer: 1200
                })
                props.setModal(false)           
                props.loadUsers()
            }
        } catch (error) {
            alert('Não foi possivel cadastrar o usuário')
            console.log(error)
        }
    }

    useEffect(() => {
        setActive(true)
    }, [])

    useEffect(() => {
        const loadUser = async () => {
            try {
                const resp = await axios.get('/usuarios/' + props.userId)
                setData({
                    ...resp.data,
                    password: ''
                })
            } catch (error) {
                console.log(error)
            }
        }
        if(props.userId) {
            loadUser()
        } else {
            setData(initialData)
        }
    }, [props.userId])



    return (
        <>
            <div onClick={ e => props.setModal(false) } className={css.modalBackground}></div>
            <div className={css.modalBox + ' ' + ( active ? css.active : '')}>
                <h1>Adicionar Usuário</h1>
                <form onSubmit={handleSubmit}>
                    <input onChange={onChange} name="username" value={data.username} type="text" className="form-control" placeholder="Nome" />
                    <input onChange={onChange} name="email" value={data.email} type="email" className="form-control" placeholder="Email" />
                    <input onChange={onChange} name="password" value={data.password} type="password" className="form-control" placeholder="Senha" />
                    <div className={css.modalBoxCheck}>
                        <div className="form-group form-check">
                            <input onChange={changeCheck} name="admin" checked={data.admin} type="checkbox" className="form-check-input" id="admin"/>
                            <label className="form-check-label" htmlFor="admin">Admin</label>
                        </div>
                    </div>
                    <div className={css.modalBoxBtn}>
                        <button onClick={ e => props.setModal(false) } type="button" className="btn btn-danger"><i className="fas fa-times"></i>Cancelar</button>
                        <button type="submit" className="btn btn-success"><i className="fas fa-check"></i>Salvar</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AdicionarUser