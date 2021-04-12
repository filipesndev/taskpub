import css from './Cadastros.module.css'
import { Link, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from '../../../config/index'
import Swal from 'sweetalert2'

const urlCadastro = '/cadastros/publicadores/cadastrar'

function Users(props) {

    const [list, setList] = useState([])
    const history = useHistory()
    const [search, setSearch] = useState('')

    const onSearch = e => {
        setSearch(e.target.value)
    }

    const searchSubmit = e => {
        e.preventDefault()
        
    }

    const loadPublicadores = async (e) => {
        const resp = await axios.get('/publicadores')
        setList(resp.data.data)
    }

    useEffect(() => {
        loadPublicadores()
    }, [])

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
            await axios.delete('/publicadores/' + id )
            loadPublicadores()
        }
    }


    return (
        <div className={css.cadastro}>

            <div className={css.topCad}>
                <h1>Cadastro de Publicadores:</h1>
                <form onSubmit={searchSubmit} className={'input-group mb-3 ' + css.search}>
                    <input onChange={onSearch} type="text" className="form-control" placeholder="Buscar..." aria-label="Procurar por nome" aria-describedby="button-addon2"/>
                    <button className="btn btn-primary" type="submit" id="button-addon2"><i className="fas fa-search"></i></button>
                </form>
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
                        list.map ( (publicador) => {
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
            </div>
        </div>
    )
}

export default Users