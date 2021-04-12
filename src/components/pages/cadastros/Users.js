import css from './Cadastros.module.css'
import { useState, useEffect } from 'react'
import axios from '../../../config/index'
import Swal from 'sweetalert2'
import AdicionarUser from './AdicionarUser'


function Users(props) {

    const [modal, setModal] = useState(false)
    const [list, setList] = useState([])
    const [userId, setUserId] = useState(null)

    const novoUsuario = e => {
        setModal(true)
        setUserId(null)
    }

    const loadUsers = async (e) => {
        const resp = await axios.get('/usuarios')
        setList(resp.data.data)
    }

    useEffect(() => {
        loadUsers()
    }, [])

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
            loadUsers()
        }
    }

    const editUser = (id) => {
        setModal(true)
        setUserId(id)
    }


    return (
        <div className={css.cadastro}>

            {
                modal && <AdicionarUser modal={modal} setModal={setModal} loadUsers={loadUsers} userId={userId}/>
            }

            <div className={css.topCad}>
                <h1>Cadastro de Usuários:</h1>
                <div className={'input-group mb-3 ' + css.search}>
                    <input type="text" className="form-control" placeholder="Buscar..." aria-label="Procurar por nome" aria-describedby="button-addon2"/>
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button" id="button-addon2"><i className="fas fa-search"></i></button>
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
                        list.map( (user) => {
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
            </div>
        </div>
    )
}

export default Users