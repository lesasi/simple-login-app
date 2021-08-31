import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Card, CardMedia, Container } from '@material-ui/core';

import googleLogo from './google.png';
import ProviderButton from '../ProviderButton';

const GoogleProviderButton = ({ onClick, label }) => {
    return (
        <ProviderButton 
            logoSrc={googleLogo}
            onClick={onClick}
            label={label}
        />
    );
};

export default GoogleProviderButton;