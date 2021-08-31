import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import GoogleButton from 'react-google-button'; 

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import linkUserProviderAction from '../actions/functions/linkUserProviderAction';
import LogoutContainer from './User/Logout/LogoutContainer';
import DeleteUserContainer from './User/Delete/DeleteUserContainer';

const useStyles = makeStyles((theme) => ({
    home: {
        width: '100%'
    },
    half: {
        width: '50%',
    },
    mid: {
        display: 'flex',
        marginBottom: theme.spacing(2),
        alignItems: 'center',
        flexDirection: 'column'
    },
    title: {
        fontSize: 14
    },
    pos: {
        fontSize: 10
    },
    down: {
        marginBottom: theme.spacing(2)
    },
    root: {
        marginTop: theme.spacing(2)
    }
}));

const HomePage = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [disableGoogle, setDisableGoogle] = useState(false);

    const reduxStates = useSelector((state) => {
        return {
            user: state.user
        };
    });

    const linkProvider = async (e, provider_name) => {
        e.preventDefault();
        dispatch(linkUserProviderAction(provider_name));
    }

    return(
        <div className={classes.home}>
            <div className="titlebar">
                <Link className='link' to='/edit-user'>
                    <Button
                        color="primary"
                        variant="contained"
                    >
                        Edit user
                    </Button>
                </Link>
                <DeleteUserContainer />
                <LogoutContainer />
            </div>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.down} variant="h4" component="h2">
                        User Details
                    </Typography>
                    <Typography className={classes.down} variant="body2" component="p">
                        Email: {reduxStates.user.email}
                    </Typography>
                    <Typography className={classes.down} variant="body2" component="p">
                        Name: {reduxStates.user.name}
                    </Typography>
                    <Typography className={classes.down} variant="body2" component="p">
                        Age: {reduxStates.user.age}
                    </Typography>
                </CardContent>
                <div className={classes.mid}>
                    <Typography color="textSecondary" variant="subtitle2" gutterBottom>
                        Want to link any of your other accounts?
                    </Typography>
                    <GoogleButton
                        className={classes.half}
                        onClick={(e) => linkProvider(e, 'google')}
                        label="Sign in to Google"
                    >
                        Hello
                    </GoogleButton>
                </div>
            </Card>
        </div>
    );
};

export default HomePage;