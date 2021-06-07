import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';
import getUserDetails from '../actions/getUserDetails';
import AppRouter, { history } from '../routers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const App = () => {

    const [loading, setLoading] = useState(false);

    // to get user data - if none, redirect to login page
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            const { data, error } = await getUserDetails();
            if(data){
                store.dispatch({
                    type: 'INIT_USER',
                    payload: {
                        user: data.user
                    }
                });
                setLoading(false);
            }
        }
        fetchUser();
    }, []);


    return(
        <Provider store={store}>
            <AppRouter />
        </Provider>
    );
};

export default App;