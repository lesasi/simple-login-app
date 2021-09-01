import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import facebookLogo from './facebook.png';
import ProviderButton from '../ProviderButton';

const FacebookProviderButton = ({ onClick, label }) => {
    return (
        <ProviderButton 
            logoSrc={facebookLogo}
            onClick={onClick}
            label={label}
        />
    );
};

export default FacebookProviderButton;