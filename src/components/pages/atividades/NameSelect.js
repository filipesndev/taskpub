import { useState, useEffect } from 'react'
import axios from '../../../config/index'

function NameSelect(props) {

    const [list, setList] = useState([])

    useEffect(() => {
        const loadOptions = async () => {
            const resp = await axios.get('/publicadores?grupoId=' + props.grupoId)
            setList(resp.data.data)
            console.log(resp.data.data)
        }
        loadOptions()
    }, [props.grupoId])

    return (
        <>
            <label htmlFor="name1" className="form-label">Nome</label>
            <select onChange={props.onChange} value={props.value} name="publicador_id" className="form-control" id="name1">
                <option value=""></option>
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

export default NameSelect