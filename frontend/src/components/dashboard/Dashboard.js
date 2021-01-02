import React from 'react';
import {Icon, Image, Menu} from 'semantic-ui-react';
import logo from '../../assets/images/logo.jpg';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logout } from "../login/LoginActions";

export class Dashboard extends React.Component {
    onLogout = () => {
        this.props.logout();
    };

    render() {
        const { user } = this.props.auth;
        return (
            <div>
                <Menu>
                    <Menu.Item header className='logo'>
                        <Link to='/dashboard/'><Image src={logo} size='tiny'></Image></Link>
                    </Menu.Item>
                    <Menu.Menu className='nav-container' position='right'>
                        <Menu.Item>
                            <p>User: <b>{user.username}</b></p>
                        </Menu.Item>
                        <Menu.Item>
                            <Link onClick={this.onLogout}>Logout</Link>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <div>
                    <h1>Dashboard</h1>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {
    logout
})(withRouter(Dashboard));


