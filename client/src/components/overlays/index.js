import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import PopupOverlay from './PopupOverlay';

// Component to apply all overlays in the app
const Overlay = ({children}) => {
    return (
        <React.Fragment>
            <PopupOverlay>
                { children }
            </PopupOverlay>
        </React.Fragment>   
    );
};

export default Overlay;