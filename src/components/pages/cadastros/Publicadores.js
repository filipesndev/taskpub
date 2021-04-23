import css from './Cadastros.module.css'
import { Link, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from '../../../config/index'
import Swal from 'sweetalert2'
import Pagination from '../../layout/Pagination'

const urlCadastro = '/cadastros/publicadores/cadastrar'

function Users(props) {

    const history = useHistory()
    const [state, setState] = useState({
        list: [],
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

    useEffect(() => {
        const loadPublicadores = async (e) => {
            const params = {
                page: state.page,
                limit: 10,
                search: state.search,
                order: 'nome'
            }
            const resp = await axios.get('/publicadores', { params })
            setState(state => ({
                ...state,
                list: resp.data.data,
                totalPages: resp.data.lastPage,
                page: resp.data.page,
                refresh: false
            }))
        }
        if (state.refresh) {
            loadPublicadores()
        }
    }, [state])

    const privilegios = (publicador) => {
        return (
            <ul className={css.ulPrivilegios}>
                {!!publicador.ungido && <li className="badge rounded-pill bg-success">Ungido</li>}
                {!!publicador.chefe_familia && <li className="badge rounded-pill bg-primary">Ch.Família</li>}
                {!!publicador.anciao && <li className="badge rounded-pill bg-danger">Ancião</li>}
                {!!publicador.servo_min && <li className="badge rounded-pill bg-danger">SM</li>}
                {!!publicador.pioneiro_reg && <li className="badge rounded-pill bg-info">PR</li>}
                {!!publicador.pioneiro_aux && <li className="badge rounded-pill bg-info">PA</li>}
                {!!publicador.superint_grupo && <li className="badge rounded-pill bg-warning">SG</li>}
                {!!publicador.ajudanter_grupo && <li className="badge rounded-pill bg-warning">AG</li>}
            </ul>
        )
    }

    const delPub = async (id) => {
        const result = await Swal.fire({
            title: 'Deletar Publicador?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar'
        })

        if (result.isConfirmed) {
            try {
                await axios.delete('/publicadores/' + id )
            } catch (error) {
                await Swal.fire({
                    title: 'Não foi possivel excluir o publicador.',
                    icon: 'error',
                })
            }
            setState({
                ...state,
                refresh: true
            })
        }
    }


    return (
        <div className={css.cadastro}>

            <div className={css.topCad}>
                <h1>Cadastro de Publicadores:</h1>
                <div className={'input-group mb-3 ' + css.search}>
                    <input onChange={onSearchChange} type="search" className="form-control" placeholder="Buscar..." aria-label="Procurar por nome" aria-describedby="button-addon2"/>
                    <button onClick={onClickSearch} disabled={!state.search} className="btn btn-primary" type="buttom" id="button-addon2"><i className="fas fa-search"></i></button>
                </div>
                <Link to={urlCadastro}><button type="button" className="btn btn-success"><i className="fas fa-plus"></i>Adicionar Novo</button></Link>
            </div>
            <div className={css.tabelaCad}>
                <table className={'table table-striped table-bordered table-hover ' + css.tabela}>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Família</th>
                        <th scope="col">Grupo</th>
                        <th scope="col">Privilégio</th>
                        <th scope="col">Inativo</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.list.map ( (publicador) => {
                            return (
                                <tr key={publicador.id}>
                                    <td className={css.tdId}>{publicador.id}</td>
                                    <td>{publicador.nome}</td>
                                    <td>{publicador.familia.nome}</td>
                                    <td>{publicador.grupo_campo.nome}</td>
                                    <td>{privilegios(publicador)}</td>
                                    <td className={css.tdIcon}>{publicador.situacao === 'IN' ? <i className={'fas fa-check ' + css.iconCheck}></i> : <i className={'fas fa-times ' + css.iconTimes}></i>}</td>
                                    <td className={css.tdBtn}>
                                        <button onClick={ e => history.push(urlCadastro + '/' + publicador.id + '?v=t')}className="btn btn-info"><i className="fas fa-eye"></i></button>
                                        <button onClick={ e => history.push(urlCadastro + '/' + publicador.id)} className="btn btn-warning"><i className="fas fa-edit"></i></button>
                                        <button onClick={ e => delPub(publicador.id) } className="btn btn-danger"><i className={'fas fa-trash ' + css.iconTrash}></i></button>
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