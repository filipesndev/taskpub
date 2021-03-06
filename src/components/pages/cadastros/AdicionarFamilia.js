import css from './ModalAdd.module.css'
import { useState, useEffect } from 'react'
import axios from '../../../config/index'
import Swal from 'sweetalert2'

const initialData = {
    nome: ''
}

function AdicionarFamilia(props) {

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
            if (props.familiaId) {
                await axios.put('/familias/' + props.familiaId, data)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Família atualizada!',
                    showConfirmButton: false,
                    timer: 1200
                })
                props.setModal(false)
            } else {
                await axios.post('/familias', data)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Família adicionado!',
                    showConfirmButton: false,
                    timer: 1200
                })
                props.setModal(false)
            }
        } catch (error) {
            alert('Não foi possivel cadastrar a família')
            console.log(error)
        }
    }

    useEffect(() => {
        setActive(true)
    }, [])

    useEffect(() => {
        const loadFam = async () => {
            try {
                const resp = await axios.get('/familias/' + props.familiaId)
                setData({
                    ...resp.data
                })
            } catch (error) {
                console.log(error)
            }
        }
        if (props.familiaId) {
            loadFam()
        } else {
            setData(initialData)
        }
    }, [props.familiaId])

    return (
        <>
            <div onClick={ e => props.setModal(false) } className={css.modalBackground}></div>
            <div className={css.modalBox + ' ' + (active ? css.active : '')}>
                <h1>Adicionar Família</h1>
                <form onSubmit={handleSubmit}>
                    <input onChange={onChange} name="nome" value={data.nome} type="text" className="form-control" id="nome" placeholder="Nome" />
                    <div className={css.modalBoxBtn}>
                        <button onClick={ e => props.setModal(false) } type="button" className="btn btn-danger"><i className="fas fa-times"></i>Cancelar</button>
                        <button type="submit" className="btn btn-success"><i className="fas fa-check"></i>Salvar</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AdicionarFamilia