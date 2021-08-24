import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader'

const LoadingOverlayWithStyle = ({ children, loading, loadingMessage }) => {
    const overlayCustomStyles = {
        overlay: (base) => {
            return {
                ...base,
                height: window.innerHeight
            };
        },
        spinner: (base) => {
            return {
                ...base,
                width: '200px'
            };
        }
    };

    return (
        <LoadingOverlay
            active={loading}
            spinner
            text={loadingMessage}
            styles={overlayCustomStyles}
        >
            {children}
        </LoadingOverlay>
    );
};

export default LoadingOverlayWithStyle;