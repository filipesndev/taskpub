import css from './Cadastros.module.css'
import { useState, useEffect } from 'react'
import axios from '../../../config/index'
import Swal from 'sweetalert2'
import AdicionarFamilia from './AdicionarFamilia'

function Familias(props) {

    const [modal, setModal] = useState(false)
    const [list, setList] = useState([])
    const [familiaId, setFamiliaId] = useState(null)
    
    const novaFamilia = e => {
        setModal(true)
        setFamiliaId(null)
    }

    const loadFamilias = async (e) => {
        const resp = await axios.get('/familias')
        setList(resp.data.data)
    }

    const delFamilia = async (id) => {
        const result = await Swal.fire({
            title: 'Deletar família?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar'
        })

        if (result.isConfirmed) {
            await axios.delete('/familias/' + id )
            loadFamilias()
        }
    }

    useEffect(() => {
        loadFamilias()
    }, [])

    const editFamilia = (id) => {
        setModal(true)
        setFamiliaId(id)
    }

    return (
        <div className={css.cadastro}>

            {
                modal && <AdicionarFamilia modal={modal} setModal={setModal} loadFamilias={loadFamilias} familiaId={familiaId}/>
            }

            <div className={css.topCad}>
                <h1>Cadastro de Famílias:</h1>
                <div className={'input-group mb-3 ' + css.search}>
                    <input type="text" className="form-control" placeholder="Buscar..." aria-label="Procurar por nome" aria-describedby="button-addon2"/>
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button" id="button-addon2"><i className="fas fa-search"></i></button>
                    </div>
                </div>
                <button onClick={novaFamilia} type="button" className="btn btn-success"><i className="fas fa-plus"></i>Adicionar Novo</button>
            </div>
            <div className={css.tabelaCad}>
                <table className={'table table-striped table-bordered table-hover ' + css.tabela}>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map( (familia) => {
                            return (
                                <tr key={familia.id}>
                                    <td className={css.tdId}>{familia.id}</td>
                                    <td>{familia.nome}</td>
                                    <td className={css.tdBtn}>
                                        <button onClick={ e => editFamilia(familia.id) } className="btn btn-warning"><i className="fas fa-edit"></i></button>
                                        <button onClick={ e => delFamilia(familia.id) } className="btn btn-danger"><i className={'fas fa-trash ' + css.iconTrash}></i></button>
                                    </td>
                                </tr>
                            )
                        } )
                    }
                </tbody>
                </table>
            </div>
        </div>
    )
}

export default Familias