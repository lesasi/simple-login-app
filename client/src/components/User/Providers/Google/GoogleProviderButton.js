import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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