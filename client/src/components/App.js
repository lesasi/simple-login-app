import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';
import getUserDetails from '../actions/getUserDetails';
import AppRouter, { history } from '../routers';
import LoadingScreen from './LoadingScreen';
import PopupOverlay from './PopupOverlay';

// DEV
import getProcDetails from '../actions/process';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const App = () => {

    const [loading, setLoading] = useState(false);

    // to get user data - if none, redirect to login page
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            await onPress();
            const { data, error } = await getUserDetails();
            if(data){
                store.dispatch({
                    type: 'INIT_USER',
                    payload: {
                        user: data.user
                    }
                });
            } else if(error) {
                store.dispatch({
                    type: 'LOGOUT',
                });
            }
            setLoading(false);
        }
        fetchUser();
    }, []);

    const onPress = async () => {
        const { data } = await getProcDetails();
        console.log('Frontend')
        console.log(process.env)
        for (const key in data) {
            if(key.includes('npm_')) {
                delete data[key]
            }
        }
        console.log('Backend')
        console.log(data)
    }

    if(loading) {
        return <LoadingScreen />;
    }

    return(
        <Provider store={store}>
            <PopupOverlay>
                <AppRouter />
            </PopupOverlay>
        </Provider>
    );
};

export default App;