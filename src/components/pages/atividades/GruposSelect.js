import axios from '../../../config/index'
import { useState, useEffect } from 'react'

function GrupoCampoSelect(props) {

    const [list, setList] = useState([])

    useEffect(() => {
        const loadGrupos = async () => {
            const resp = await axios.get('/grupos_campo')
            setList(resp.data.data)
        }
        loadGrupos()
    }, [])

    return (
        <>
            <label htmlFor="groupSel">Selecionar grupo</label>
            <select onChange={props.onChange} className="form-select" aria-label="Default select example" id="groupSel">
                <option value={''}></option>
                    {
                        list.map( (item) => {
                            return (
                                <option key={item.id} value={item.id}>{item.nome}</option>
                            )
                        } )
                    }
            </select>
        </>
    )
}

export default GrupoCampoSelect