import React ,{Component} from 'react';
import { Redirect, Route} from "react-router-dom";

const token = localStorage.getItem('token');

const LoginRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => (
            token
                ? <Redirect to={{pathname:'/'}}/>
                : <Component {...props} />
        )}
    />
);

export default LoginRoute;
