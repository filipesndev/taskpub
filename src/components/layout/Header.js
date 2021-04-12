import { useContext } from 'react'
import css from './Header.module.css'
import Avatar from 'react-avatar'
import { AppContext } from '../../store/StoreProvider'

function Header(props) {

    const {toogleSidebar} = useContext(AppContext)

    return (
        <div className={css.header}>
            <button onClick={toogleSidebar} className={css.button}><i className="fas fa-bars"></i></button>
            <div className={css.user}>
                <Avatar name="Filipe Eduardo" size="60" round={true} />
            </div>
        </div>
    )
}

export default Header