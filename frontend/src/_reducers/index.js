import { combineReducers } from 'redux';
import user from './userReducer';
import feed from './feedReducer';
import map from './mapReducer';


const rootReducer = combineReducers({
    user,
    feed,
    map,
});

export default rootReducer;