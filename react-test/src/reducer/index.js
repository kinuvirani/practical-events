import {combineReducers} from "redux";
import user from './authentication';
import event from './event';

export default combineReducers({user, event});
