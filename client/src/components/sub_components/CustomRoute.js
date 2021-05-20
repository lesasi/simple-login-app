import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

import RedirectOverlay from './RedirectOverlay';

const CustomRoute = ({ component: Component, ...rest }) => {

    return <Route {...rest} component={(props) => (
        <RedirectOverlay component={Component} props={props}/>
    )} />;
};

export default CustomRoute;