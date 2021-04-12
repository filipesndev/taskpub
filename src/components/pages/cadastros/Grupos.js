import css from './Cadastros.module.css'
import { useState, useEffect } from 'react'
import axios from '../../../config/index'
import Swal from 'sweetalert2'
import AdicionarGrupo from './AdicionarGrupo'

function Grupos(props) {

    const [modal, setModal] = useState(false)
    const [list, setList] = useState([])
    const [grupoId, setGrupoId] = useState(false)

    const novoGrupo = e => {
        setModal(true)
        setGrupoId(false)
    }

    const loadGrupos = async (e) => {
        const resp = await axios.get('/grupos_campo')
        setList(resp.data.data)
    }

    useEffect(() => {
        loadGrupos()
    }, [])

    const delGrupo = async (id) => {
        const result = await Swal.fire({
            title: 'Deletar grupo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar'
        })

        if (result.isConfirmed) {
            await axios.delete('/grupos_campo/' + id )
            loadGrupos()
        }
    }

    const editGrupo = (id) => {
        setModal(true)
        setGrupoId(id)
    }

    return (
        <div className={css.cadastro}>

            {
                modal && <AdicionarGrupo modal={modal} setModal={setModal} loadGrupos={loadGrupos} grupoId={grupoId}/>
            }

            <div className={css.topCad}>
                <h1>Cadastro de Grupos:</h1>
                <div className={'input-group mb-3 ' + css.search}>
                    <input type="text" className="form-control" placeholder="Buscar..." aria-label="Procurar por nome" aria-describedby="button-addon2"/>
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button" id="button-addon2"><i className="fas fa-search"></i></button>
                    </div>
                </div>
                <button onClick={novoGrupo} type="button" className="btn btn-success"><i className="fas fa-plus"></i>Adicionar Novo</button>
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
                        list.map( (grupo) => {
                            return (
                                <tr key={grupo.id}>
                                    <td className={css.tdId}>{grupo.id}</td>
                                    <td>{grupo.nome}</td>
                                    <td className={css.tdBtn}>
                                        <button onClick={ e => editGrupo(grupo.id) } className="btn btn-warning"><i className="fas fa-edit"></i></button>
                                        <button onClick={ e => delGrupo(grupo.id) } className="btn btn-danger"><i className={'fas fa-trash ' + css.iconTrash}></i></button>
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

export default Grupos