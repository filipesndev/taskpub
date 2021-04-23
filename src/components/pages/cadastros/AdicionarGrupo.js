import css from './ModalAdd.module.css'
import { useState, useEffect } from 'react'
import axios from '../../../config/index'
import Swal from 'sweetalert2'

const initialData = {
    nome: ''
}

function AdicionarGrupo(props) {

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
            if (props.grupoId) {
                await axios.put('/grupos_campo/' + props.grupoId, data)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Grupo atualizado!',
                    showConfirmButton: false,
                    timer: 1200
                })
                props.closeModal()          
                props.loadGrupos()
            } else {
                await axios.post('/grupos_campo', data)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Grupo adicionado!',
                    showConfirmButton: false,
                    timer: 1200
                })
                props.closeModal()          
                props.loadGrupos()
            }
        } catch (error) {
            alert('Não foi possivel cadastrar o grupo')
            console.log(error)
        }
    }

    useEffect(() => {
        setActive(true)
    }, [])

    useEffect(() => {
        const loadGrupo = async () => {
            try {
                const resp = await axios.get('/grupos_campo/' + props.grupoId)
                setData({
                    ...resp.data
                })
            } catch (error) {
                console.log(error)
            }
        }
        if (props.grupoId) {
            loadGrupo()
        } else {
            setData(initialData)
        }
    }, [props.grupoId])

    return (
        <>
            <div onClick={ e => props.closeModal() } className={css.modalBackground}></div>
            <div className={css.modalBox + ' ' + (active ? css.active : '')}>
                <h1>Adicionar Grupo</h1>
                <form onSubmit={handleSubmit}>
                    <input onChange={onChange} name="nome" value={data.nome} type="text" className="form-control" placeholder="Nome" />
                    <div className={css.modalBoxBtn}>
                        <button onClick={ e => props.closeModal() } type="button" className="btn btn-danger"><i className="fas fa-times"></i>Cancelar</button>
                        <button type="submit" className="btn btn-success"><i className="fas fa-check"></i>Salvar</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AdicionarGrupo