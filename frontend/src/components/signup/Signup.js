import React, { Component} from 'react'
import PropTypes from 'prop-types'; // ES6
import Messages from '../notifications/Messages';
import Errors from '../notifications/Errors';

import { Form, Grid, Header,  Input, Button } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import {signupActions} from '../../store/actions/signup';




class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
          email: "",
            username: '',
          password: "",
            card_id: "",
            first_name: "",
            last_name: ""
        };
      }

    onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

    onSubmit = () => {
    this.props.signupRequest(this.state);
  };

    static propTypes = {
        signupRequest: PropTypes.func,
        signup: PropTypes.shape({
            requesting: PropTypes.bool,
            successful: PropTypes.bool,
            messages: PropTypes.array,
            errors: PropTypes.array,
        }),
    };



    render() {
        const {
            signup: {
                requesting,
                successful,
                messages,
                errors,
            },
        } = this.props



        return (
            <div className="signup-form">
                <Grid textAlign='center' verticalAlign='middle'>
                    <Grid.Column>
                        <Header as='h2'
                        textAlign='center'
                        content="Sign up to create your account">
                        </Header>
                        <Form size='large'>
                            <Form.Group widths="equal">
                                <Form.Input fluid
                                    icon="user"
                                    name="first_name"
                                    iconPosition="left"
                                    placeholder="First name"
                                    onChange={this.onChange}
                                  />
                                  <Form.Input fluid
                                    icon="user"
                                    name="last_name"
                                    iconPosition="left"
                                    placeholder="Last name"
                                    onChange={this.onChange}
                                  />
                            </Form.Group>

                            <Form.Input fluid 
                                icon="vcard"
                                iconPosition="left"
                                name="card_id"
                                type="text"
                                placeholder="Your RFID Card Id"
                                onChange={this.onChange}
                                className="email">
                            </Form.Input>

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
                                icon="user"
                                iconPosition="left"
                                name="username"
                                placeholder="Username"
                                type="text"
                                onChange={this.onChange}
                                className="username">
                            </Form.Input>

                            <Form.Input fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                name="password"
                                type="password"
                                id="password"
                                className="password"
                                onChange={this.onChange}
                                label="Password" >
                            </Form.Input>
                            <Button onClick={this.onSubmit} 
                            content="SIGNUP"
                            type="submit"
                            size="large"
                            color="blue">
                            </Button>
                        </Form>
                    </Grid.Column>
                </Grid>
                <div className="auth-messages">
                      {!requesting && !!errors.length && (
                        <Errors message="Failure to signup due to:" errors={errors} />
                      )}
                      {!requesting && !!messages.length && (
                        <Messages messages={messages} />
                      )}
                      {!requesting && successful && (
                        <div>
                          Signup Successful! <Link to="/login">Click here to Login »</Link>
                        </div>
                      )}
                                {!requesting && !successful && (
                        <Link to="/login">Already a Widgeter? Login Here »</Link>
                      )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    signup: state.signup,
})

const signupRequest = signupActions.request
export default connect(mapStateToProps, {signupRequest})(withRouter(Signup))

