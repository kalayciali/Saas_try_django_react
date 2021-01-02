import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"; //connect action and auth store
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Form } from 'semantic-ui-react';

import { login } from "./LoginActions"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onLoginClick = () => {
        const userData = {
            username: this.state.username,
            password: this.state.password
        };
        this.props.login(userData, "/dashboard"); // login request
    };

    render() {
        return (
            <Form>
                <Form.Field>
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Enter username" value={this.state.username} onChange={this.onChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Your password</label>
                    <input type="password" name="password" placeholder="Enter password" value={this.state.password} onChange={this.onChange}/>
                </Form.Field>
                <Button type='submit' onClick={this.onLoginClick}>Login</Button>
                <p>
                    Don't have account? <Link to="/signup">Signup</Link>
                </p>
            </Form>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {
    login
})(withRouter(Login))
