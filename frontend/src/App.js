import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import requireAuth from "./utils/RequireAuth";
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

axios.defaults.baseURL = "http://127.0.0.1:8000";


class App extends Component {
    render() {
        return (
            <div> 
                <ToastContainer hideProgressBar={true} newestOnTop={true} />
                <Switch>
                    <Route path='/signup' component={Signup} />
                    <Route path='/login' component={Login} />
                    <Route path='/dashboard' component={requireAuth(Dashboard)} />
                    <Route exact path='/' component={Home} />
                    <Route path="*">Ups</Route>
                </Switch>
            </div>
        )
    }
}

export default App;
