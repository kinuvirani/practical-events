import React ,{Component} from 'react';
import { Redirect, Route } from "react-router-dom";

const token = localStorage.getItem('token');

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => (
            token
                ? <Component {...props} />
                : <Redirect to={'/signin'}/>
        )}
    />
);

export default PrivateRoute;
