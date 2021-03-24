import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Password from './components/auth/Password'
import Perdido from './components/404'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import PrivateRoute from './components/auth/PrivateRoute'
import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/password" component={Password} />
        <Route path="/404" component={Perdido} />
        <PrivateRoute path="/" component={App} exact/>
        <Redirect to="/404"/>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
