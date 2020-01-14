import React, { Component, Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import History from "../../history";
import { Link } from "react-router-dom";
import axios from "axios";
import Schools from "../helpers/schools.json";
import Header from '../Header/Header'
import Breadcrumb from "../CommonComponents/BradCrumb";
import Footer from "../Footer/index";
import { createNotification } from "../CommonComponents/Notifications";
import { renderField } from "../CommonComponents/RenderFormField";
import {
  required,
  email,
  exactLength,
  passwordsMatch
} from "../CommonComponents/FormValidations";
import { SingleFileInput } from "../helpers/helpers";
import Sppiner from '../helpers/Spinner';

const exactLength8 = exactLength(8, "Password length must be minimum");
class ResetPassword extends Component {
  state = {
    loading: false
  }
 
  state = { Message: null, accountType: null };

  onSubmitResetPassword = async values => {
    this.setState({
      loading: true
    });
    let resetToken = this.props.match.params.resetToken;
    axios
      .put(`/user/resetPassword/${resetToken}`, values)
      .then(response => {
        createNotification("success", "Success", response.data.message);
        if (response.status === 200) {
          this.setState({
            loading: false
          });
          setTimeout(function() {
            History.push("/login");
          }, 500);
        }
      })
      .catch(error => {
        this.setState({
          loading: false
        });
        createNotification(
          "error",
          error.response.data.description,
          error.response.data.message
        );
        this.setState({ Message: error.response.data.message });
      });
  };

  render() {
    const { handleSubmit, pristine, reset, submitting, invalid } = this.props;
    return (
      <Fragment>
        <Header />
        <Breadcrumb />
        <div className="main-wrapper mt-1">
          <div className="account-page" style={{ marginTop: 70 }}>
            <div className="container">
              <h3 className="account-title">Reset Your Password</h3>
              <div className="account-box">
                <div className="account-wrapper">
                  <div className="account-logo">
                    <Link to="/">
                      <img
                        src="images/logo/flipeetLogo2.png"
                        alt="Flipeet Logo"
                      />
                    </Link>
                  </div>
                  <form
                    action="#"
                    onSubmit={this.props.handleSubmit(this.onSubmitResetPassword)}
                  >
                    <div className="form-group">
                      <label>Password</label>
                      <Field
                        name="password"
                        component={renderField}
                        type="password"
                        className="form-control"
                        validate={[required, exactLength8]}
                      />
                    </div>
                    <div className="form-group">
                      <label>Conform Password</label>
                      <Field
                        name="conformPassword"
                        component={renderField}
                        type="password"
                        className="form-control"
                        validate={[required, passwordsMatch]}
                      />
                    </div>
                    <div className="form-group text-center">
                      <button
                        disabled={invalid || submitting}
                        className="btn btn-warning btn-block account-btn text-white"
                        type="submit"
                      >
                        Reset Password
                      </button>
                      {
                        this.state.loading ? < Sppiner type = 'ThreeDots'
                        marginTop = '10px'
                        height = '70'
                        width = '70' / >: ''
                      }
                    </div>
                    <div className="text-center">
                      <Link to="/login">Remembered Password?</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}
export default reduxForm({ form: "Reset Form" })(ResetPassword);
