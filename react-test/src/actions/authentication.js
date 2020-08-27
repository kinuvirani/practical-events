import api from '../services/baseServices';
import {signUp, signIn} from "./actionType";
import { notification } from 'antd';

const token =localStorage.getItem('token');

export const userSignup = (data) => {
    return (dispatch) => {
        return api.post('/user/signup', data).then((response) => {
            notification.success({ message: 'Registration successful' });
            dispatch({
                type: signUp,
                payload: response.data
            })
        }).catch((err) => {
            notification.error({ message: err.response.data.message })
        })
    };
};

export const userSignIn = (data) => {
    return (dispatch) => {
        return api.post('/user/signin', data).then((response) => {
            localStorage.setItem('token', response.data.token);
            notification.success({ message: 'Login successful' });
            dispatch({
                type: signIn,
                payload: response.data
            })
        }).catch((err) => {
            notification.error({ message: err.response.data.message })
        })
    };
};
