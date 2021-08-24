import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import PopupOverlay from './PopupOverlay';
import LoadingOverlay from './LoadingOverlay';

// Component to apply all overlays in the app
const Overlay = ({children}) => {
    return (
        <React.Fragment>
            <LoadingOverlay>
                <PopupOverlay>
                    { children }
                </PopupOverlay>
            </LoadingOverlay>
        </React.Fragment>   
    );
};

export default Overlay;