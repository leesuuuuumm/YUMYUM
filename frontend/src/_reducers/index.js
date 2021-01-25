import { combineReducers } from 'redux';
import user from './userReducer';
import feed from './feedReducer';


const rootReducer = combineReducers({
    user,
    feed,
});

export default rootReducer;