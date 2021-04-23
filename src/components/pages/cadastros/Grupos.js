import css from './Cadastros.module.css'
import { useState, useEffect } from 'react'
import axios from '../../../config/index'
import Swal from 'sweetalert2'
import AdicionarGrupo from './AdicionarGrupo'
import Pagination from '../../layout/Pagination'

function Grupos(props) {

    const [state, setState] = useState({
        modal: false,
        list: [],
        grupoId: false,
        totalPages: 0,
        page: 1,
        sidePages: 1,
        search: '',
        refresh: true
    })

    const onSearchChange = e => {
        const { value } = e.target
        setState(state => ({
            ...state,
            search: value,
            refresh: !value,
            page: 1
        }))
    }

    const onClickSearch = e => {
        setState(state => ({
            ...state,
            page: 1,
            refresh: true
        }))
    }

    const changePage = page => {
        setState(state => ({
            ...state,
            page,
            refresh: true
        }))
    }

    const novoGrupo = e => {
        setState({
            ...state,
            modal: true,
            grupoId: false
        })
    }

    const closeModal = e => {
        setState({
            ...state,
            modal: false,
            refresh: true
        })
    }

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
            setState({
                ...state,
                refresh: true
            })
        }
    }

    const editGrupo = (id) => {
        setState({
            ...state,
            modal: true,
            grupoId: id
        })
    }

    useEffect(() => {
        const loadGrupos = async (e) => {
            const params = {
                page: state.page,
                limit: 10,
                search: state.search,
                order: 'nome'
            }
            const resp = await axios.get('/grupos_campo', { params })
            setState(state => ({
                ...state,
                list: resp.data.data,
                totalPages: resp.data.lastPage,
                page: resp.data.page,
                refresh: false
            }))
        }
        if (state.refresh) {
            loadGrupos()   
        }
    }, [state])

    return (
        <div className={css.cadastro}>

            {
                state.modal && <AdicionarGrupo closeModal={closeModal} grupoId={state.grupoId}/>
            }

            <div className={css.topCad}>
                <h1>Cadastro de Grupos:</h1>
                <div className={'input-group mb-3 ' + css.search}>
                    <input onChange={onSearchChange} type="search" className="form-control" placeholder="Buscar..." aria-label="Procurar por nome" aria-describedby="button-addon2"/>
                    <div className="input-group-append">
                        <button onClick={onClickSearch} disabled={!state.search} className="btn btn-primary" type="button" id="button-addon2"><i className="fas fa-search"></i></button>
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
                            state.list.map( (grupo) => {
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
                <div className={css.pageSelect}>
                    <Pagination 
                            totalPages={state.totalPages}
                            page={state.page}
                            sidePages={state.sidePages}
                            onPageChange={changePage}
                        />
                </div>
            </div>
        </div>
    )
}

export default Grupos