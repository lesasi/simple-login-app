import { Router, Route, Link, useHistory } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

import CustomRoute from './CustomRoute';
import Navbar from '../components/navbar/Navbar';
import HomePage from '../components/HomePage';
import LoginPageComponent from '../components/User/Login/LoginPageComponent';
import CreateUserComponent from '../components/User/Create/CreateUserComponent';
import EditUserComponent from '../components/User/Edit/EditUserComponent';
import ChangePasswordComponent from '../components/User/Edit/ChangePasswordComponent';

export const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
  }));


const AppRouter = () => {
    const classes = useStyles();

    return(
        <Router history={history}>
            <Navbar />
            <Container component="main" maxWidth="sm">
                <div className={classes.paper}>
                    <CustomRoute path="/" exact component={HomePage}/>
                    <CustomRoute path="/edit-user" exact component={EditUserComponent} />
                    <CustomRoute path="/change-password" exact component={ChangePasswordComponent} />
                    <CustomRoute is_public path="/login" exact component={LoginPageComponent} />
                    <CustomRoute is_public path="/create-user" exact component={CreateUserComponent} />
                </div>
            </Container>
        </Router>
    );
};

export default AppRouter;