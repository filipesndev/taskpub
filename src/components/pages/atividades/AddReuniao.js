import { useState, useEffect } from 'react'
import css from './AddReuniao.module.css'
import clsx from 'clsx'
import axios from '../../../config/index'
import Swal from 'sweetalert2'
import DatePicker from 'react-datepicker'

const initialData = {
    tipo: '',
    data_reuniao: '',
    assistencia: ''
}

function AddReuniao(props) {

    const [active, setActive] = useState(false)
    const [data, setData] = useState(initialData)

    const closeModal = e => {
        props.setModal(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (props.reuniaoId) {
            try {
                await axios.put('/reunioes/' + props.reuniaoId, data)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Assistencia atualizada!',
                    showConfirmButton: false,
                    timer: 1200
                })
                setData(initialData)
                closeModal()
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                await axios.post('/reunioes', data)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Assistencia adicionada!',
                    showConfirmButton: false,
                    timer: 1200
                })
                setData(initialData)
                closeModal()
            } catch (error) {
                console.log(error)
            }
        }
    }

    const onChange = e => {
        const {name, value} = e.target
        setData({
            ...data,
            [name]: value
        })
        console.log(data)
    }

    useEffect(() => {
        const loadReuniao = async () => {
            try {
                const resp = await axios.get('/reunioes/' + props.reuniaoId)
                setData({
                    ...resp.data,
                    data_reuniao: new Date(resp.data.data_reuniao)
                })
            } catch (error) {
                console.log(error)
            }
        }
        if (props.reuniaoId) {
            loadReuniao()
        } else {
            setData(initialData)
        }
        setActive(true)
    }, [props.reuniaoId])

    return (
        <>
            <div onClick={closeModal} className={css.background}></div>
            <div className={clsx(css.modal, active && css.active)}>
                <div className={css.modalTop}>
                    <h1>Incluir Assistencia</h1>
                </div>
                <div className={css.modalBottom}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="dataReu">Data</label>
                            <DatePicker
                                selected={data.data_reuniao}
                                onChange={date => setData({
                                    ...data,
                                    data_reuniao: date
                                })}
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>
                        <div>
                            <label htmlFor="reuniao">Reuni??o</label>
                            <select onChange={onChange} name="tipo" value={data.tipo} className="form-control" id="reuniao" >
                                <option value={''}></option>
                                <option value={'MS'}>Meio de Semana</option>
                                <option value={'FS'}>Fim de Semana</option>
                                <option value={'RE'}>Reuni??o Especial</option>
                                <option value={'CE'}>Celebra????o</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="ass">Assistencia</label>
                            <input onChange={onChange} name="assistencia" value={data.assistencia} className="form-control" type="number" id="ass"/>
                        </div>
                        <div className={css.btnModal}>
                            <button onClick={closeModal} type="button" className="btn btn-danger"><i className="fas fa-times"></i>Cancelar</button>
                            <button type="submit" className="btn btn-success"><i className="fas fa-check"></i>Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
        
    )
}

export default AddReuniao