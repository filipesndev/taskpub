import { Switch } from 'react-router-dom'
import PrivateRoute from '../auth/PrivateRoute'
import css from './Main.module.css'

import Dashboard from '../pages/Dashboard'
import Campo from '../pages/atividades/Campo'
import Reuniao from '../pages/atividades/Reuniao'
import Familias from '../pages/cadastros/Familias'
import Grupos from '../pages/cadastros/Grupos'
import Privilegios from '../pages/cadastros/Privilegios'
import Publicadores from '../pages/cadastros/Publicadores'
import Users from '../pages/cadastros/Users'
import CadastroPublicadores from '../pages/cadastros/CadastrosPublicadores'

function Main(props) {
    return (
        <div className={css.main}>
            <Switch>
                <PrivateRoute path="/dashboard" component={Dashboard}/>
                <PrivateRoute path="/atividades/campo" component={Campo}/>
                <PrivateRoute path="/atividades/reuniao" component={Reuniao}/>
                <PrivateRoute path="/cadastros/familias" component={Familias}/>
                <PrivateRoute path="/cadastros/grupos" component={Grupos}/>
                <PrivateRoute path="/cadastros/privilegios" component={Privilegios}/>
                <PrivateRoute path="/cadastros/publicadores" exact component={Publicadores}/>
                <PrivateRoute path="/cadastros/users" component={Users}/>
                <PrivateRoute path="/cadastros/publicadores/cadastrar/:id?" component={CadastroPublicadores}/>
            </Switch>
        </div>
    )
}

export default Main