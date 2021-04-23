import css from './AddRelatorio.module.css'
import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import NameSelect from './NameSelect'
import clsx from 'clsx'
import axios from 'axios'
import Swal from 'sweetalert2'

const initialData = {
    publicador_id: 0,
    ano_mes: new Date(),
    publicacoes: 0,
    videos: 0,
    tempo: 0,
    revisitas: 0,
    estudos: 0,
    pioneiro_aux: false,
    observacao: ''
}

function AddRelatorio(props) {

    const [active , setActive] = useState(false)
    const [data, setData] = useState(initialData)

    const onChange = e => {
        const {name, value} = e.target
        setData({
            ...data,
            [name]: value
        })
        console.log(data)
    }

    const onCheck = e => {
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
            if (props.relatorioId) {
                const fields = {
                    ...data,
                    tempo: data.tempo * 60,
                    ano_mes: data.ano_mes.toISOString().substr(0, 7)
                }
                await axios.put('/relatorios/' + props.relatorioId, fields)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Relatório adicionado!',
                        showConfirmButton: false,
                        timer: 1200
                    })
                    props.onClose()
            } else {
                const fields = {
                    ...data,
                    tempo: data.tempo * 60,
                    ano_mes: data.ano_mes.toISOString().substr(0, 7)
                }
                await axios.post('/relatorios', fields)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Relatório adicionado!',
                        showConfirmButton: false,
                        timer: 1200
                    })
                    props.onClose()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setActive(true)
    }, [])

    useEffect(() => {
        const loadRel = async () => {
            try {
                const {data} = await axios.get('/relatorios/' + props.relatorioId)
                setData({
                    publicador_id: data.publicador_id,
                    ano_mes: new Date(data.ano_mes + '-01'),
                    publicacoes: data.publicacoes,
                    videos: data.videos,
                    tempo: data.tempo / 60,
                    revisitas: data.revisitas,
                    estudos: data.estudos,
                    pioneiro_aux: !!data.pioneiro_aux,
                    observacao: data.observacao
                })
            } catch (error) {
                console.log(error)
            }
        }
        if (props.relatorioId) {
            loadRel()
        } else {
            setData(initialData)
        }
    }, [props.relatorioId])

    return (
        <>
            <div onClick={e => props.onClose()} className={css.background}></div>
            <div className={clsx(css.modal, active ? css.active : '')}>
                <form onSubmit={handleSubmit}>
                    <div className={css.modalTop}>
                        <h1>Adicionar Relatório</h1>
                    </div>
                    <div className={css.modalBottom}>
                        <div className="row">
                            
                            <div className="col-md-9">
                                <NameSelect onChange={onChange} grupoId={props.grupoId} value={data.publicador_id}/>
                            </div>
                            <div className={'col-md-3 ' + css.datePicker}>
                                <label htmlFor="date1" className="form-label">Data</label>
                                <DatePicker
                                    selected={data.ano_mes}
                                    value={data.ano_mes}
                                    onChange={date => setData({...data, ano_mes: date})}
                                    dateFormat="MM/yyyy"
                                    showMonthYearPicker
                                    showFullMonthYearPicker
                                />
                            </div>

                        </div>
                        <div className="row">

                            <div className="col">
                                <label htmlFor="pub1" className="form-label">Publicações</label>
                                <input onChange={onChange} name="publicacoes" value={data.publicacoes} type="number" className="form-control" id="pub1"/>
                            </div>
                            <div className="col">
                                <label htmlFor="vid1" className="form-label">Vídeos</label>
                                <input onChange={onChange} name="videos" value={data.videos} type="number" className="form-control" id="vid1"/>
                            </div>
                            <div className="col">
                                <label htmlFor="tempo1" className="form-label">Horas</label>
                                <input onChange={onChange} name="tempo" value={data.tempo} type="number" className="form-control" id="tempo1"/>
                            </div>
                            <div className="col">
                                <label htmlFor="rev1" className="form-label">Revisitas</label>
                                <input onChange={onChange} name="revisitas" value={data.revisitas} type="number" className="form-control" id="rev1"/>
                            </div>
                            <div className="col">
                                <label htmlFor="rev1" className="form-label">Estudos</label>
                                <input onChange={onChange} name="estudos" value={data.estudos} type="number" className="form-control" id="est1"/>
                            </div>
                            
                        </div>
                        <div className="row">

                            <div className="col-md-12">
                                <label htmlFor="obs1" className="form-label">Observação</label>
                                <input onChange={onChange} name="observacao" value={data.observacao} type="text" className="form-control" id="obs1"/>
                            </div>

                        </div>
                        <div className="row">

                            <div className={'col-md-12 ' + css.check}>
                                <label htmlFor="aux1" className="form-label">Pioneiro Auxiliar</label>
                                <input onChange={onCheck} name="pioneiro_aux" checked={data.pioneiro_aux} type="checkbox" id="aux1"/>
                            </div>

                        </div>
                        <div className={css.btnBottom}>

                            <button onClick={e => props.onClose()} className="btn btn-danger"><i className="fas fa-times"></i>Cancelar</button>
                            <button type="submit" className="btn btn-success"><i className="fas fa-check"></i>Salvar</button>

                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddRelatorio