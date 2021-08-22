import { Router, Route, Link, useHistory } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';

import CustomRoute from './CustomRoute';
import HomePage from '../components/HomePage';
import LoginPage from '../components/User/LoginPage';
import CreateUser from '../components/User/Create/CreateUser';
import EditUser from '../components/User/EditUser';

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
             <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <CustomRoute path="/" exact component={HomePage}/>
                    {/* <CustomRoute path="/edit-user" exact component={EditUser} /> */}
                    <CustomRoute is_public path="/login" exact component={LoginPage} />
                    <CustomRoute is_public path="/create-user" exact component={CreateUser} />
                </div>
            </Container>
        </Router>
    );
};

export default AppRouter;