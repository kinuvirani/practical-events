import api from '../services/baseServices';
import {eventList} from "./actionType";
import { notification } from 'antd';
import qs from 'qs';

export const getEventList = (token, data) => {
    return (dispatch) => {
        let queryUrl='/event';
        if (data !== undefined) {
            const query = qs.stringify(data);
            queryUrl = `${queryUrl}?${query}`;
            console.log('api url=====', queryUrl);
        }
        return api.get(queryUrl, {headers: {Authorization: `Basic ${token}`}}).then((response) => {
            dispatch({
                type: eventList,
                payload: response.data
            })
        }).catch((err) => {
            notification.error({ message: err.response.data.message })
        })
    };
};

