import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import githubLogo from './github.png';
import ProviderButton from '../ProviderButton';

const GithubProviderButton = ({ onClick, label }) => {
    return (
        <ProviderButton 
            logoSrc={githubLogo}
            onClick={onClick}
            label={label}
        />
    );
};

export default GithubProviderButton;