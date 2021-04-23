import css from './Cadastros.module.css'
import { useState, useEffect } from 'react'
import axios from '../../../config/index'
import Swal from 'sweetalert2'
import AdicionarUser from './AdicionarUser'
import Pagination from '../../layout/Pagination'


function Users(props) {

    const [state, setState] = useState({
        modal: false,
        list: [],
        userId: null,
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

    const closeModal = e => {
        setState({
            ...state,
            modal: false,
            refresh: true
        })
    }

    const novoUsuario = e => {
        setState({
            ...state,
            modal: true,
            userUd: null
        })
    }

    const delUser = async (id) => {
        const result = await Swal.fire({
            title: 'Deletar usuário?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar'
        })

        if (result.isConfirmed) {
            await axios.delete('/usuarios/' + id )
            setState({
                ...state,
                refresh: true
            })
        }
    }

    const editUser = (id) => {
        setState({
            ...state,
            modal: true,
            userUd: id
        })
    }

    useEffect(() => {
        const loadUsers = async (e) => {
            const params = {
                page: state.page,
                limit: 10,
                search: state.search,
                order: 'username'
            }
            const resp = await axios.get('/usuarios', { params })
            setState({
                ...state,
                list: resp.data.data,
                totalPages: resp.data.lastPage,
                page: resp.data.page,
                refresh: false
            })
        }
        if (state.refresh) {
            loadUsers()
        }
    }, [state])

    return (
        <div className={css.cadastro}>

            {
                state.modal && <AdicionarUser closeModal={closeModal} userId={state.userId}/>
            }

            <div className={css.topCad}>
                <h1>Cadastro de Usuários:</h1>
                <div className={'input-group mb-3 ' + css.search}>
                    <input onChange={onSearchChange} type="search" className="form-control" placeholder="Buscar..." aria-label="Procurar por nome" aria-describedby="button-addon2"/>
                    <div className="input-group-append">
                        <button onClick={onClickSearch} disabled={!state.search} className="btn btn-primary" type="button" id="button-addon2"><i className="fas fa-search"></i></button>
                    </div>
                </div>
                <button onClick={ novoUsuario } type="button" className="btn btn-success"><i className="fas fa-plus"></i>Adicionar Novo</button>
            </div>
            <div className={css.tabelaCad}>
                <table className={'table table-striped table-bordered table-hover ' + css.tabela}>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Admin</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.list.map( (user) => {
                            return (
                                <tr key={user.id}>
                                    <td className={css.tdId}>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td className={css.tdIcon}>{user.admin ? <i className={'fas fa-check ' + css.iconCheck}></i> : null}</td>
                                    <td className={css.tdBtn}>
                                        <button onClick={e => editUser(user.id)} className="btn btn-warning"><i className="fas fa-edit"></i></button>
                                        <button onClick={e => delUser(user.id)} className="btn btn-danger"><i className={'fas fa-trash ' + css.iconTrash}></i></button>
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

export default Users