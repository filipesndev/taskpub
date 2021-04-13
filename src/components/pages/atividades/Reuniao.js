import css from './Reuniao.module.css'
import clsx from 'clsx'
import AddReuniao from './AddReuniao'
import { useState, useEffect } from 'react'
import axios from '../../../config/index'
import Swal from 'sweetalert2'

const tipoReuniao = {
    FS: 'Fim de Semana',
    MS: 'Meio de Semana',
    CE: 'Celebração',
    RE: 'Reunião Especial'
}

function Reuniao(props) {

    const [modal, setModal] = useState(false)
    const [list, setList] = useState([])
    const [ano, setAno] = useState('2021')
    const [totais, setTotais] = useState({})
    const [medias, setMedias] = useState({})
    const [refresh, setRefresh] = useState(false)
    const [reuniaoId, setReuniaoId] = useState(false)

    const novaReuniao = e => {
        setModal(true)
    }

    const yearChange = e => {
        setAno(e.target.value)
    }

    const delReuniao = async (id) => {
        const result = await Swal.fire({
            title: 'Deletar Reunião?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar'
        })
        if (result.isConfirmed) {
            await axios.delete('/reunioes/' + id )
            setRefresh(true)
        }
    }

    const editReuniao = (id) => {
        setModal(true)
        setReuniaoId(id)
    }

    useEffect(() => {
        const loadReuniao = async () => {
            const params = {
                inicio: `${ano}-01-01`,
                fim: `${ano}-12-31`
            }
            const resp = await axios.get('/reunioes', { params })
            setList(resp.data.data)
            const totais = {
                MS: 0,
                FS: 0,
            }
            const quant = {
                MS: 0,
                FS: 0
            }
            resp.data.data.forEach(reuniao => {
                totais[reuniao.tipo] = totais[reuniao.tipo] + reuniao.assistencia
                quant[reuniao.tipo] = quant[reuniao.tipo] + 1
            });
            setTotais(totais)
            setMedias({
                MS: totais.MS / quant.MS,
                FS: totais.FS / quant.FS
            })
            console.log(resp.data.data)
        }
        loadReuniao()
    }, [ano, modal, refresh])

    return (
        <div className={css.reuniao}>
            <h1>Assistencia das reuniões</h1>
            <div className={css.reuniaoTop}>
                <div>
                    <label htmlFor="yearSel">Selecionar ano:</label>
                    <select onChange={yearChange} className="form-select" aria-label="Default select example" id="yearSel">
                        <option value='2021'>2021</option>
                        <option value='2020'>2020</option>
                        <option value='2019'>2019</option>
                        <option value='2018'>2018</option>
                        <option value='2017'>2017</option>
                    </select>
                </div>
                <button onClick={novaReuniao} type="button" className="btn btn-success"><i className="fas fa-plus"></i>Incluir</button>
            </div>

            {
                modal && <AddReuniao modal={modal} setModal={setModal} reuniaoId={reuniaoId}/>
            }

            <div className={css.reuniaoMiddle}>
                <div className={css.tabelaReuniao}>
                    <table className={'table table-striped table-bordered table-hover ' + css.tabela}>
                        <thead>
                            <tr>
                                <th scope="col">Data</th>
                                <th scope="col">Reunião</th>
                                <th scope="col">Assistência</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                list.map( (item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td className={css.date}>{item.data_reuniao.substr(0,10)}</td>
                                            <td className={css.date}>{tipoReuniao[item.tipo]}</td>
                                            <td className={css.ass}>{item.assistencia}</td>
                                            <td className={css.action}>
                                                <button onClick={ e => editReuniao(item.id)} className="btn btn-warning"><i className="fas fa-edit"></i></button>
                                                <button onClick={ e => delReuniao(item.id)} className="btn btn-danger"><i className={'fas fa-trash ' + css.iconTrash}></i></button>     
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={css.reuniaoBottom}>
                <div className={clsx('card', css.cardBottom, css.cb1)}>
                    <div className="card-body">
                        Total Meio de Semana: {totais.MS || 0}
                    </div>
                </div>
                <div className={clsx('card', css.cardBottom, css.cb2)}>
                    <div className="card-body">
                        Média Meio de Semana: {parseInt( medias.MS ) || 0}
                    </div>
                </div>
                <div className={clsx('card', css.cardBottom, css.cb3)}>
                    <div className="card-body">
                        Total Fim de Semana: {totais.FS || 0}
                    </div>
                </div>
                <div className={clsx('card', css.cardBottom, css.cb4)}>
                    <div className="card-body">
                        Média Fim de Semana: {parseInt( medias.FS ) || 0}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reuniao