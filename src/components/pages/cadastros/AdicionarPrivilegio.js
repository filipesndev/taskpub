import css from './ModalAdd.module.css'
import { useState, useEffect } from 'react'
import axios from '../../../config/index'
import Swal from 'sweetalert2'

const initialData = {
    descricao: ''
}

function AdicionarPrivilegio(props) {

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

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            if (props.privId) {
                await axios.put('/privilegios/' + props.privId, data)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Privilégio atualizado!',
                    showConfirmButton: false,
                    timer: 1200
                })
                props.setModal(false)
                props.loadPrivilegios()
            } else {
                await axios.post('/privilegios', data)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Privilégio adicionado!',
                    showConfirmButton: false,
                    timer: 1200
                })
                props.setModal(false)
                props.loadPrivilegios()
            }
        } catch (error) {
            alert('Não foi possivel adicionar o privilégio')
            console.log(error)
        }
    }

    useEffect(() => {
        setActive(true)
    }, [])

    useEffect(() => {
        const loadPriv = async () => {
            try {
                const resp = await axios.get('/privilegios/' + props.privId)
                setData({
                    ...resp.data
                })
            } catch (error) {
                console.log(error)
            }
        }
        if (props.privId) {
            loadPriv()
        } else {
            setData(initialData)
        }
    }, [props.privId])

    return (
        <>
            <div onClick={ e => props.setModal(false) } className={css.modalBackground}></div>
            <div className={css.modalBox + ' ' + (active ? css.active : '' ) }>
                <h1>Adicionar Privilégio</h1>
                <form onSubmit={handleSubmit}>
                    <input onChange={onChange} name="descricao" value={data.descricao} type="text" className="form-control" placeholder="Nome" />
                    <div className={css.modalBoxBtn}>
                        <button onClick={ e => props.setModal(false) } type="button" className="btn btn-danger"><i className="fas fa-times"></i>Cancelar</button>
                        <button type="submit" className="btn btn-success"><i className="fas fa-check"></i>Salvar</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AdicionarPrivilegio