import axios from '../../../config/index'
import { useEffect, useState } from 'react'

function UfSelect(props) {

    const [list, setList] = useState([])

    const loadGrupoSelect = async () => {
        const resp = await axios.get('/grupos_campo')
        setList(resp.data.data)
    }

    useEffect(() => {
        loadGrupoSelect()
    }, [])

    return (
        <div className="form-group">
            <label htmlFor="grupo">Grupo</label>
            <select onChange={props.onChange} name="grupo_campo_id" value={props.data.grupo_campo_id} className="form-control" id="grupo" disabled={props.view}>
                <option value={''}></option>
                {
                    list.map( (item) => {
                        return (
                            <option key={item.id} value={item.id}>{item.nome}</option>
                        )
                    } )
                }
            </select>
        </div>
    )
}

export default UfSelect