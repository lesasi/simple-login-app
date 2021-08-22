import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const CustomRoute = ({ is_public, component: Component, ...rest }) => {
    const reduxStates = useSelector((state) => {
        return {
            isAuthenticated: state.user.logged_in,
        };
    });

    if(is_public) {
        return(
            <PublicRoute 
                isAuthenticated={reduxStates.isAuthenticated}
                component={Component} 
                exact={true} 
                { ...rest }
            />
        );
    } else {
        return(
            <PrivateRoute 
                isAuthenticated={reduxStates.isAuthenticated}
                component={Component} 
                exact={true} 
                { ...rest }
            />
        );
    }
};

export default CustomRoute;