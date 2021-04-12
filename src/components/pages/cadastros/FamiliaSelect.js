import axios from '../../../config/index'
import { useEffect, useState } from 'react'

function UfSelect(props) {

    const [list, setList] = useState([])

    const loadFamiliaSelect = async () => {
        const resp = await axios.get('/familias')
        setList(resp.data.data)
    }

    useEffect(() => {
        loadFamiliaSelect()
    }, [])

    return (
        <div className="form-group">
            <label htmlFor="familia">Família</label>
            <select onChange={props.onChange} name="familia_id" value={props.data.familia_id} className="form-control" id="familia" disabled={props.view}>
                <option value={''}></option>
                {
                    list.map( (item) => {
                        return (
                            <option key={item.id} value={item.id}>{item.nome}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}

export default UfSelect