import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import facebookLogo from './facebook.png';
import ProviderButton from '../ProviderButton';

const FacebookProviderButton = ({ onClick, label }) => {
    const addnDescriptionCSS = {
        color: 'white',
        backgroundColor: 'blue'
    };
    return (
        <ProviderButton 
            logoSrc={facebookLogo}
            onClick={onClick}
            label={label}
            addnDescriptionCSS={addnDescriptionCSS}
        />
    );
};

export default FacebookProviderButton;