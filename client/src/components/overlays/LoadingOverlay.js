import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LoadingOverlayWithStyle from './LoadingOverlayWithStyle';

const CustomLoadingOverlay = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const reduxStates = useSelector((state) => {
        return {
            loading: state.utils.loading,
            loadingMessage: state.utils.loadingMessage
        };
    });

    useEffect(() => {
        if(reduxStates.loading) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [reduxStates.loading]);

    return (
        <LoadingOverlayWithStyle
            loading={loading}
            loadingMessage={reduxStates.loadingMessage}
        >
            {children}
        </LoadingOverlayWithStyle>
    );
};

export default CustomLoadingOverlay;