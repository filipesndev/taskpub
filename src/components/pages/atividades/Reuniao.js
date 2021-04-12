import css from './Reuniao.module.css'
import clsx from 'clsx'
import AddReuniao from './AddReuniao'
import { useState, useEffect } from 'react'
import axios from '../../../config/index'

function Reuniao(props) {

    const [modal, setModal] = useState(false)
    const [list, setList] = useState([])
    const [ano, setAno] = useState(0)

    const novaReuniao = e => {
        setModal(true)
    }

    const yearChange = e => {
        setAno(e.target.value)
    }

    useEffect(() => {
        const loadReuniao = async () => {
            const params = {
                inicio: `${ano}-01-01`,
                fim: `${ano}-12-31`
            }
            const resp = await axios.get('/reunioes', { params })
            setList(resp.data.data)
            console.log(resp.data.data)
        }
        loadReuniao()
    }, [ano])

    return (
        <div className={css.reuniao}>
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
                modal && <AddReuniao modal={modal} setModal={setModal} />
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
                        <tr>
                            <td className={css.date}>10/10/10</td>
                            <td className={css.date}>Meio</td>
                            <td className={css.ass}>180</td>
                            <td className={css.action}>
                                <button className="btn btn-warning"><i className="fas fa-edit"></i></button>
                                <button className="btn btn-danger"><i className={'fas fa-trash ' + css.iconTrash}></i></button>     
                            </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>

            <div className={css.reuniaoBottom}>
                <div className={clsx('card', css.cardBottom, css.cb1)}>
                    <div className="card-body">
                        Total Meio de Semana: 12345
                    </div>
                </div>
                <div className={clsx('card', css.cardBottom, css.cb2)}>
                    <div className="card-body">
                        Média Meio de Semana: 12345
                    </div>
                </div>
                <div className={clsx('card', css.cardBottom, css.cb3)}>
                    <div className="card-body">
                        Total Fim de Semana: 12345
                    </div>
                </div>
                <div className={clsx('card', css.cardBottom, css.cb4)}>
                    <div className="card-body">
                        Média Fim de Semana: 12345
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reuniao