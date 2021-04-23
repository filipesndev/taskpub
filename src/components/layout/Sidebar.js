import { useState, useEffect, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import css from './Sidebar.module.css'
import clsx from 'clsx'
import { AppContext } from '../../store/StoreProvider'

function Sidebar(props) {

    const [opMenu1, setOpMenu1] = useState(false)
    const [opMenu2, setOpMenu2] = useState(false)
    const [opMenu3, setOpMenu3] = useState(false)
    const refMenu1 = useRef()
    const refMenu2 = useRef()
    const refMenu3 = useRef()

    const Context = useContext(AppContext)

    useEffect(() => {
        if (opMenu1) {
            refMenu1.current.style.maxHeight = refMenu1.current.scrollHeight + 'px'
        } else {
            refMenu1.current.style.maxHeight = '0'
        }
    }, [opMenu1])

    useEffect(() => {
        const { style, scrollHeight } = refMenu2.current
        if (opMenu2) {
            style.maxHeight = scrollHeight + 'px'
        } else {
            style.maxHeight = '0'
        }
    }, [opMenu2])

    useEffect(() => {
        const { style, scrollHeight } = refMenu3.current
        if (opMenu3) {
            style.maxHeight = scrollHeight + 'px'
        } else {
            style.maxHeight = '0'
        }
    }, [opMenu3])

    return (
        <div className={clsx(css.sidebar, Context.showSidebar && css.active)}>
            <Link to="/dashboard"><h1 className={css.mainH1}>TaskPub</h1></Link>
            <ul className={css.menu}>
                <li className={clsx(css.subMenu, css.menu1)}>
                    <div className={css.subMenuH1} onClick={ e => setOpMenu1(!opMenu1) }>
                        <h1>Cadastros</h1><i className={ (opMenu1 ? css.rotate : null) + ' fas fa-chevron-right'} ></i>
                    </div>
                    <ul ref={refMenu1}>
                        <li><Link to="/cadastros/publicadores">Publicadores</Link></li>
                        <li><Link to="/cadastros/familias">Famílias</Link></li>
                        <li><Link to="/cadastros/grupos">Grupos</Link></li>
                        <li><Link to="/cadastros/privilegios">Privilegios</Link></li>
                        <li><Link to="/cadastros/users">Usuários</Link></li>
                    </ul>
                </li>
                <li className={clsx(css.subMenu, css.menu2)}>
                    <div className={css.subMenuH1} onClick={ e => setOpMenu2(!opMenu2) }>
                        <h1>Atividades</h1><i className={ (opMenu2 ? css.rotate : null) + ' fas fa-chevron-right'} ></i>
                    </div>
                    <ul ref={refMenu2}>
                        <li><Link to="/atividades/campo">Serviço de campo</Link></li>
                        <li><Link to="/atividades/reuniao">Assistencia das Reuniões</Link></li>
                    </ul>
                </li>
                <li className={clsx(css.subMenu, css.menu3)}>
                    <div className={css.subMenuH1} onClick={ e => setOpMenu3(!opMenu3) }>
                        <h1>Relatórios</h1><i className={ (opMenu3 ? css.rotate : null) + ' fas fa-chevron-right'} ></i>
                    </div>
                    <ul ref={refMenu3}>
                        
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar