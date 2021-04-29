import css from './Cadastros.module.css'
import { useState, useEffect } from 'react'
import axios from '../../../config/index'
import Swal from 'sweetalert2'
import AdicionarFamilia from './AdicionarFamilia'
import Pagination from '../../layout/Pagination'

function Familias(props) {

    const [state, setState] = useState({
        modal: false,
        list: [],
        familiaId: null,
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
    
    const novaFamilia = e => {
        setState(state => ({
            ...state,
            modal: true,
            familiaId: null
        }))
    }

    const setModal = e => {
        setState(state => ({
            ...state,
            modal: false,
            refresh: true
        }))
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
            try {
                await axios.delete('/familias/' + id )
            } catch (error) {
                await Swal.fire({
                    title: 'Não foi possivel excluir a família.',
                    icon: 'error',
                })
            }
            setState(state => ({
                ...state,
                refresh: true
            }))
        }
    }

    useEffect(() => { 
        const loadFamilias = async (e) => {
            const params = {
                page: state.page,
                limit: 10,
                search: state.search,
                order: 'nome'
            }
            const resp = await axios.get('/familias', { params })
            setState(state => ({
                ...state,
                list: resp.data.data,
                totalPages: resp.data.lastPage,
                page: resp.data.page,
                refresh: false
            }))
        }
        if (state.refresh) {
            loadFamilias()
        }
    }, [state])

    const editFamilia = (id) => {
        setState(state => ({
            ...state,
            modal: true,
            familiaId: id
        }))
    }

    return (
        <div className={css.cadastro}>

            {
                state.modal && <AdicionarFamilia modal={state.modal} setModal={setModal} familiaId={state.familiaId}/>
            }

            <div className={css.topCad}>
                <h1>Cadastro de Famílias:</h1>
                <div className={'input-group mb-3 ' + css.search}>
                    <input onChange={onSearchChange} type="search" className="form-control" placeholder="Buscar..." aria-label="Procurar por nome" aria-describedby="button-addon2"/>
                    <div className="input-group-append">
                        <button onClick={onClickSearch} disabled={!state.search} className="btn btn-primary" type="button" id="button-addon2"><i className="fas fa-search"></i></button>
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
                            state.list.map( (familia) => {
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

export default Familias