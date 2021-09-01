import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Card, CardMedia, Container } from '@material-ui/core';

const useStylesCustom = (addnDescriptionCSS) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            cursor: 'pointer',
            border: '1px solid blue',
            marginBottom: '10px'
        },
        logo: {
            width: '30px',
            height: '30px',
            padding: '10px'
        },
        description: {
            display: 'flex',
            alignItems: 'center',
            padding: '0px 10px',
            fontWeight: '600',
            ...addnDescriptionCSS
        }
    }));
    return useStyles;
};

const ProviderButton = ({ logoSrc, onClick, label, addnDescriptionCSS }) => {
    const classes = (useStylesCustom(addnDescriptionCSS))();
    return (
        <Card 
            className={classes.root}
            onClick={onClick}
        >
            <Box>
                <img
                    className={classes.logo}
                    src={logoSrc}
                />
            </Box>
            <Box className={classes.description}>
                {label}
            </Box>
        </Card>
    );
};

export default ProviderButton;