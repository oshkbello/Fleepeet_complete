import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createNotification } from '../CommonComponents/Notifications';
const jwt = require('jsonwebtoken');



const PrivateRoute = ({ component: Component, auth, ...rest }) => (
 <Route
   {...rest}
   render={props =>
      // auth.isAuthenticated === true
     localStorage.token
       ? (
       <Component {...props} />
     ) : (
       <Redirect to="/login" />
     )
   }
 />


);
PrivateRoute.propTypes = {
 auth: PropTypes.object.isRequired
};

const mapStateToProps = state => (
  {
    auth: state.loginUser
  }
);
export default connect(mapStateToProps)(PrivateRoute);