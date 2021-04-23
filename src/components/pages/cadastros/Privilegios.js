import css from './Cadastros.module.css'
import { useState, useEffect } from 'react'
import axios from '../../../config/index'
import Swal from 'sweetalert2'
import AdicionarPrivilegio from './AdicionarPrivilegio'
import Pagination from '../../layout/Pagination'


function Privilegios(props) {

    const [state, setState] = useState({
        modal: false,
        list: [],
        privId: null,
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

    const closeModal = e => {
        setState({
            ...state,
            modal: false,
            refresh: true
        })
    }

    const novoPrivilegio = e => {
        setState({
            ...state,
            modal: true,
            privId: null
        })
    }

    const delPrivilegio = async (id) => {
        const result = await Swal.fire({
            title: 'Deletar privilégio?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar'
        })

        if (result.isConfirmed) {
            await axios.delete('/privilegios/' + id )
            setState({
                ...state,
                refresh: true
            })
        }
    }

    const editPrivlegio = (id) => {
        setState({
            ...state,
            modal: true,
            privId: id
        })
    }

    const changePage = page => {
        setState(state => ({
            ...state,
            page,
            refresh: true
        }))
    }

    useEffect(() => {
        const loadPrivilegios = async (e) => {
            const params = {
                page: state.page,
                limit: 10,
                search: state.search,
                order: 'descricao'
            }
            const resp = await axios.get('/privilegios', { params })
            setState({
                ...state,
                list: resp.data.data,
                totalPages: resp.data.lastPage,
                page: resp.data.page,
                refresh: false
            })
        }
        if (state.refresh) {
            loadPrivilegios()
        }
    }, [state])

    return (
        <div className={css.cadastro}>

            {
                state.modal && <AdicionarPrivilegio closeModal={closeModal} privId={state.privId}/>
            }

            <div className={css.topCad}>
                <h1>Cadastro de Privilégios:</h1>
                <div className={'input-group mb-3 ' + css.search}>
                    <input onChange={onSearchChange} type="search" className="form-control" placeholder="Buscar..." aria-label="Procurar por nome" aria-describedby="button-addon2"/>
                    <div className="input-group-append">
                        <button onClick={onClickSearch} className="btn btn-primary" disabled={!state.search}  type="button" id="button-addon2"><i className="fas fa-search"></i></button>
                    </div>
                </div>
                <button onClick={ novoPrivilegio } type="button" className="btn btn-success"><i className="fas fa-plus"></i>Adicionar Novo</button>
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
                        state.list.map( (privilegio) => {
                            return (
                                <tr key={privilegio.id}>
                                    <td className={css.tdId}>{privilegio.id}</td>
                                    <td>{privilegio.descricao}</td>
                                    <td className={css.tdBtn}>
                                        <button onClick={ e => editPrivlegio(privilegio.id)} className="btn btn-warning"><i className="fas fa-edit"></i></button>
                                        <button onClick={ e => delPrivilegio(privilegio.id) }  className="btn btn-danger"><i className={'fas fa-trash ' + css.iconTrash}></i></button>
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

export default Privilegios