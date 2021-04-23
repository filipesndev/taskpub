import css from './Campo.module.css'
import clsx from 'clsx'
import GruposSelect from './GruposSelect'
import DatePicker from 'react-datepicker'
import { useEffect, useState } from 'react'
import axios from '../../../config/index'
import AddRelatorio from './AddRelatorio'
import Swal from 'sweetalert2'

function Campo(props) {

    const [list, setList] = useState([])
    const [modal, setModal] = useState(false)
    const [relatorioId, setRelatorioId] = useState(0)

    const [pioneiroAux, setPioneiroAux] = useState({})
    const [pioneiroReg, setPioneiroReg] = useState({})
    const [publicador, setPublicador] = useState({})

    const [data, setData] = useState({
        startDate: new Date(),
        grupoId: '',
        refresh: false
    }) 

    const refresh = () => {
        setData({
            ...data,
            refresh: true
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        refresh()
    }

    const onCloseModal = () => {
        setModal(false)
        refresh()
    }

    const editRelatorio = (id) => {
        setModal(true)
        setRelatorioId(id)
    }

    const delRelatorio = async (id) => {
        const result = await Swal.fire({
            title: 'Deletar Relatório?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar'
        })
        if (result.isConfirmed) {
            await axios.delete('/relatorios/' + id )
            refresh()
        }
    }

    useEffect(() => {
        const loadRelatorios = async () => {
            const params = {
                grupoId: data.grupoId,
                anoMes: data.startDate.toISOString().slice(0, 7)
            }
            const resp = await axios.get('/relatorios', { params })
            setList(resp.data)
            
            const pub = {
                publicacoes: 0,
                videos: 0,
                tempo: 0,
                revisitas: 0,
                restudos: 0
            }
            const pAux = {...pub}
            const pReg = {...pub}
            resp.data.forEach(rel => {
                const obj = rel.pioneiro_aux ? pAux :
                            rel.publicador.pioneiro_reg ? pReg : pub
                obj.publicacoes = obj.publicacoes + rel.publicacoes
                obj.videos += rel.videos
                obj.tempo += rel.tempo
                obj.revisitas += rel.revisitas
                obj.estudos += rel.estudos
            });
            setPioneiroAux({...pAux})
            setPioneiroReg({...pReg})
            setPublicador({...pub})
        }

        if (data.refresh) {
            loadRelatorios()
            setData({
                ...data,
                refresh: false
            })
        }
        
    }, [data])
    
    return (
        <div className={css.campo}>

            {
                modal && <AddRelatorio onClose={onCloseModal} grupoId={data.grupoId} relatorioId={relatorioId}/>
            }

            <h1>Relatórios do serviço de campo</h1>  
            <div className={css.campoTop}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className={css.datePicker}>
                            <label>Selecionar mês/ano</label>
                            <DatePicker
                                selected={data.startDate}
                                onChange={date => setData({
                                    ...data,
                                    startDate: date
                                })}
                                dateFormat="MM/yyyy"
                                showMonthYearPicker
                                showFullMonthYearPicker
                            />
                        </div>
                        <div className={css.campoTopSel}>
                            <GruposSelect onChange={e => {
                                setData({
                                    ...data,
                                    grupoId: e.target.value
                                })
                            }}/>
                        </div>
                        <div className={css.campoTopBtn}>
                            <button type="submit" className="btn btn-primary"><i className="fas fa-search"></i>Pesquisar</button>
                        </div>
                    </div>
                </form>
                <div className={css.campoTopBtn}>
                    <button onClick={e => {setModal(true)}} disabled={!data.grupoId} className="btn btn-success"><i className="fas fa-plus"></i>Adicionar relatório</button> 
                </div>
            </div>


            <div className={css.campoMiddle}>
                <table className={'table table-striped table-bordered table-hover ' + css.tabela}>
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Publicações</th>
                            <th scope="col">Vídeos</th>
                            <th scope="col">Horas</th>
                            <th scope="col">Revisitas</th>
                            <th scope="col">Estudos</th>
                            <th scope="col">Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map( (item) => {
                                return (
                                    <tr key={item.publicador.id}>
                                        <td>{item.publicador.nome}</td>
                                        <td>{item.publicacoes}</td>
                                        <td>{item.videos}</td>
                                        <td>{item.tempo / 60}</td>
                                        <td>{item.revisitas}</td>
                                        <td>{item.estudos}</td>
                                        <td>
                                            <button onClick={ e => editRelatorio(item.id) } className="btn btn-warning"><i className="fas fa-edit"></i></button>
                                            <button onClick={ e => delRelatorio(item.id)} className="btn btn-danger"><i className={'fas fa-trash ' + css.iconTrash}></i></button>     
                                        </td>
                                    </tr>
                                )
                            } )
                        }
                    </tbody>
                </table>
            </div>

            <div className={css.campoBottom}>
                <h1>Totais</h1>
                <div className={css.campoBottomRow}>
                    <h2>Publicadores</h2>
                    <div>
                        <div className={clsx(css.card, css.card1)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-paperclip"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>{publicador.publicacoes || 0}</h4>
                                <h3>Publicações</h3>
                            </div>
                        </div>
                        <div className={clsx(css.card, css.card2)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-video"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>{publicador.videos || 0}</h4>
                                <h3>Vídeos</h3>
                            </div>
                        </div>
                        <div className={clsx(css.card, css.card3)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-clock"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>{publicador.tempo / 60 || 0}</h4>
                                <h3>Horas</h3>
                            </div>
                        </div>
                        <div className={clsx(css.card, css.card4)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-phone-alt"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>{publicador.revisitas || 0}</h4>
                                <h3>Revisitas</h3>
                            </div>
                        </div>
                        <div className={clsx(css.card, css.card5)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-book"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>{publicador.estudos || 0}</h4>
                                <h3>Estudos</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={css.campoBottomRow}>
                    <h2>Pioneiros Auxiliares</h2>
                    <div>
                        <div className={clsx(css.card, css.card1)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-paperclip"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>{pioneiroAux.publicacoes || 0}</h4>
                                <h3>Publicações</h3>
                            </div>
                        </div>
                        <div className={clsx(css.card, css.card2)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-video"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>{pioneiroAux.videos || 0}</h4>
                                <h3>Vídeos</h3>
                            </div>
                        </div>
                        <div className={clsx(css.card, css.card3)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-clock"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>{pioneiroAux.tempo / 60 || 0}</h4>
                                <h3>Horas</h3>
                            </div>
                        </div>
                        <div className={clsx(css.card, css.card4)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-phone-alt"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>{pioneiroAux.revisitas || 0}</h4>
                                <h3>Revisitas</h3>
                            </div>
                        </div>
                        <div className={clsx(css.card, css.card5)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-book"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>{pioneiroAux.estudos || 0}</h4>
                                <h3>Estudos</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={css.campoBottomRow}>
                    <h2>Pioneiros Regulares</h2>
                    <div>
                        <div className={clsx(css.card, css.card1)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-paperclip"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>{pioneiroReg.publicacoes || 0}</h4>
                                <h3>Publicações</h3>
                            </div>
                        </div>
                        <div className={clsx(css.card, css.card2)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-video"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>{pioneiroReg.videos || 0}</h4>
                                <h3>Vídeos</h3>
                            </div>
                        </div>
                        <div className={clsx(css.card, css.card3)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-clock"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>{pioneiroReg.tempo / 60 || 0}</h4>
                                <h3>Horas</h3>
                            </div>
                        </div>
                        <div className={clsx(css.card, css.card4)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-phone-alt"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>{pioneiroReg.revisitas || 0}</h4>
                                <h3>Revisitas</h3>
                            </div>
                        </div>
                        <div className={clsx(css.card, css.card5)}>
                            <div className={css.cardLeft}>
                                <i className="fas fa-book"></i>
                            </div>
                            <div className={css.cardRight}>
                                <h4>{pioneiroReg.estudos || 0}</h4>
                                <h3>Estudos</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Campo