import { useState, useEffect } from 'react'
import css from './AddReuniao.module.css'
import clsx from 'clsx'

function AddReuniao(props) {

    const [active, setActive] = useState(false)

    const closeModal = e => {
        props.setModal(false)
    }

    useEffect(() => {
        setActive(true)
    }, [])

    return (
        <div className={css.background}>
            <div className={clsx(css.modal, active && css.active)}>
                <div className={css.modalTop}>
                    <h1>Incluir Assistencia</h1>
                </div>
                <div className={css.modalBottom}>
                    <form>
                        <div>
                            <label htmlFor="dataReu">Data</label>
                            <input className="form-control" type="date" id="dataReu"/>
                        </div>
                        <div>
                            <label htmlFor="reuniao">Reunião</label>
                            <select className="form-control" id="reuniao" >
                                <option>Meio de Semana</option>
                                <option>Fim de Semana</option>
                                <option>Reunião Especial</option>
                                <option>Celebração</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="ass">Assistencia</label>
                            <input className="form-control" type="number" id="ass"/>
                        </div>
                        <div className={css.btnModal}>
                            <button onClick={closeModal} type="button" className="btn btn-danger"><i className="fas fa-times"></i>Cancelar</button>
                            <button type="button" className="btn btn-success"><i className="fas fa-check"></i>Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddReuniao