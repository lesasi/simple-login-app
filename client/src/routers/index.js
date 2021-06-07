import { Router, Route, Link, useHistory } from 'react-router-dom';
import { createBrowserHistory } from "history";

import CustomRoute from './CustomRoute';

import HomePage from '../components/HomePage';
import LoginPage from '../components/LoginPage';
import CreateUser from '../components/CreateUser';
import EditUser from '../components/EditUser';

export const history = createBrowserHistory();

const AppRouter = () => {
    return(
        <Router history={history}>
            <div className='main-content'>
                <CustomRoute path="/" exact component={HomePage}/>
                <CustomRoute is_public path="/login" exact component={LoginPage} />
                <CustomRoute path="/create-user" exact component={CreateUser} />
                <CustomRoute path="/edit-user" exact component={EditUser} />
            </div>
        </Router>
    );
};

export default AppRouter;