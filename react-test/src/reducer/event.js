import {eventList} from '../actions/actionType';
import {list} from '../common';

const init = {
    list: []
};

export default (state=init, action) => {
    switch (action.type) {
        case eventList:
            return {
                ...state,
                list: action.payload
            };
        default:
            return state
    }
}

