import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <p>
                    <Link to="/login/">Login</Link>
                </p>
                <p>
                    <Link to="/signup">Sign up</Link>
                </p>
                <p>
                    <Link to="/dashboard">Dashboard</Link>
                </p>
            </div>
        )
    }
}

export default Home;
