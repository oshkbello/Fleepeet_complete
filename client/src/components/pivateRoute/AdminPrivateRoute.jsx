import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createNotification } from '../CommonComponents/Notifications';
const jwt = require('jsonwebtoken');



const AdminPrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            auth.currentUser.role === 'admin'
                ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/dashboard" />
                )
        }
    />


);
AdminPrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => (
    {
        auth: state.loginUser
    }
);
export default connect(mapStateToProps)(AdminPrivateRoute);