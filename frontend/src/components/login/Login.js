
import React, { Component} from 'react'
import PropTypes from 'prop-types'; // ES6
import Messages from '../notifications/Messages';
import Errors from '../notifications/Errors';

import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import {loginActions} from '../../store/actions/login';
import { Form, Grid, Header, Input, Button } from 'semantic-ui-react';




class Login extends Component {

    constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
     onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

    onSubmit = () => {
    this.props.loginRequest(this.state.email, this.state.password);
  };

    static propTypes = {
        loginRequest: PropTypes.func,
        login: PropTypes.shape({
            requesting: PropTypes.bool,
            successful: PropTypes.bool,
            messages: PropTypes.array,
            errors: PropTypes.array,
        }),
    };


    render() {
        const {
            login: {
                requesting,
                successful,
                messages,
                errors,
            },
        } = this.props

        return (
            <div className="login-form">
                <Grid textAlign='center' verticalAlign='middle'>
                    <Grid.Column>
                        <Header as='h2'
                        textAlign='center'
                        content="Sign in to your account">
                        </Header>

                        <Form size='large'>
                            <Form.Input fluid
                            icon="mail"
                            iconPosition="left"
                            name="email"
                            type="text"
                            placeholder="Email address"
                            onChange={this.onChange}
                            className="email">
                            </Form.Input>

                            <Form.Input fluid
                            icon="lock"
                            iconPosition="left"
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={this.onChange}
                            className="password">
                            </Form.Input>
                            <Button type="submit"
                            color="blue"
                            fluid
                            size="large"
                            content="Sign In"
                            onClick={this.onSubmit}>
                            </Button>
                        </Form>
                </Grid.Column>
            </Grid>
            <div className="auth-messages">
          {!requesting && !!errors.length && (
            <Errors message="Failure to login due to:" errors={errors} />
          )}
          {!requesting && !!messages.length && (
            <Messages messages={messages} />
          )}
            {requesting && <div>Logging in...</div>}
          {!requesting && !successful && (
            <Link to="/signup">Need to Signup? Click Here </Link>
          )}
            </div>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    login: state.login,
})

const loginRequest = loginActions.request
export default connect(mapStateToProps, {loginRequest})(withRouter(Login))

