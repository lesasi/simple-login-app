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
                <CustomRoute path="/edit-user" exact component={EditUser} />
                <CustomRoute is_public path="/login" exact component={LoginPage} />
                <CustomRoute is_public path="/create-user" exact component={CreateUser} />
            </div>
        </Router>
    );
};

export default AppRouter;