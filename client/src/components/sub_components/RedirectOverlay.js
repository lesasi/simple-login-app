import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { useHistory } from "react-router-dom";

const RedirectOverlay = ({ component: Component, props }) => {
    return <Component { ...props }/>
};

export default RedirectOverlay;