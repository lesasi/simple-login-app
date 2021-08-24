import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { auth } from './utils/firebase-config';

import reducers from './reducers';
import { getUser, logoutUser } from './actions/crud-user';
import { firebaseLogout } from './actions/auth';
import AppRouter, { history } from './routers';
import LoadingScreen from './components/LoadingScreen';
import AppOverlay from './components/overlays';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const jsx = (
    <Provider store={store}>
        <AppOverlay>
            <AppRouter />
        </AppOverlay>
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('root'));
        hasRendered = true;
    }
};

ReactDOM.render(<p>Loading...</p>, document.getElementById('root'));

auth.onAuthStateChanged(async (user) => {
    if (user) {
        try {
            const { data } = await getUser();
            store.dispatch({
                type: 'INIT_USER',
                payload: {
                    user: data.user
                }
            });
            store.dispatch({
                type: 'NEW_MESSAGE',
                payload: {
                    message: 'Logged in successfully!',
                    type: 'SUCCESS'
                }
            });
        } catch (error) {
            store.dispatch({
                type: 'LOGOUT',
            });
        }
        renderApp();
    } else {
        // if logged into backend but not firebase, logout of backend
        try {
            await logoutUser();  
        } catch (error) {
            // continue
        }
        store.dispatch({
            type: 'LOGOUT',
        });
        renderApp();
    }
});