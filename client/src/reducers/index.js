import { combineReducers } from 'redux';

import user from './user';
import history from './history';

export default combineReducers({
    user,
    history
});