import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Form } from 'semantic-ui-react';

import { signupNewUser } from "./SignupActions";

class Signup extends Component {
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

    onSignupClick = () => {
        const userData = {
            username: this.state.username,
            password: this.state.password
        };
        this.props.signupNewUser(userData); // send signup request
    };

    render() {
        return (
            <Form>
                <Form.Field>
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Enter username" isInvalid={this.props.createUser.usernameError} value={this.state.username} onChange={this.onChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Your password</label>
                    <input type="password" name="password" placeholder="Enter password" isInvalid={this.props.createUser.passwordError} value={this.state.password} onChange={this.onChange}/>
                </Form.Field>
                <Button type='submit' onClick={this.onSignupClick}>Sign up</Button>
                <p>
                    Already have account? <Link to="/login">Login</Link>
                </p>
            </Form>
        );
    }
}

Signup.propTypes = {
    signupNewUser: PropTypes.func.isRequired,
    createUser: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    createUser: state.createUser
});

export default connect(mapStateToProps, {
    signupNewUser
})(withRouter(Signup));
