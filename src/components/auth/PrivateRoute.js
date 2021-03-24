import { Redirect, Route } from 'react-router-dom'

function PrivateRoute({ path, component, ...props }) {

    const token = localStorage.getItem('userToken')

    if (!token) {
        return (
            <Redirect to="/login" />
        )
    }

    return (
        <Route path={path} component={component} />
    )
}

export default PrivateRoute