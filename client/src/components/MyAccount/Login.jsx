import React, { Component, Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { userPostFetch } from "../../actions/User_Auth";
import History from "../../history";
import { Link } from "react-router-dom";
import { createNotification } from "../CommonComponents/Notifications";
import axios from "axios";
import { renderField } from "../CommonComponents/RenderFormField";
import {
  required,
  email,
  exactLength
} from "../CommonComponents/FormValidations";
import Header from "../Header/Header";
import Breadcrumb from "../CommonComponents/BradCrumb";
import Footer from "../Footer/index";
import Sppiner from "../helpers/Spinner";
const exactLength8 = exactLength(8, "Password length must be minimum");

class Login extends Component {
  state = { loading: false };
  onSubmitLogin = async values => {
    this.setState({ loading: true });
    axios
      .post("/user/login", values)
      .then(response => {
        this.props.userPostFetch(response.data);
        createNotification("success", response.data.message);
        if (response.status === 200) {
          this.setState({ loading: false });
          setTimeout(function() {
            History.push("/");
          }, 500);
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        createNotification(
          "error",
          error.response.data.description,
          error.response.data.message
        );
      });
  };

  render() {
    const { handleSubmit, pristine, reset, submitting, invalid } = this.props;
    return (
      <Fragment>
        <Header />
        <Breadcrumb />
        <div class="main-wrapper" style={{ marginTop: 50 }}>
          <div class="account-page">
            <div class="container">
              <h3 class="account-title">Login</h3>
              <div class="account-box">
                <div class="account-wrapper">
                  <div class="account-logo" style={{ marginTop: 25 }}>
                    <Link href="index.html">
                      <img
                        src="images/logo/flipeetLogo2.png"
                        alt="Flipeet Logo"
                      />
                    </Link>
                  </div>
                  <form
                    onSubmit={this.props.handleSubmit(this.onSubmitLogin)}
                    action="#"
                  >
                    <div className="form-group">
                      <label>Email</label>
                      <Field
                        name="email"
                        component={renderField}
                        type="email"
                        className="form-control"
                        validate={[required, email]}
                      />
                    </div>
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

                    <div class="form-group text-center">
                      <button
                        class="btn btn-warning btn-block account-btn text-white"
                        type="submit"
                        disabled={invalid || submitting}
                      >
                        Login
                      </button>
                      {this.state.loading ? (
                        <Sppiner
                          type="ThreeDots"
                          marginTop="10px"
                          height="70"
                          width="70"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <div class="text-center">
                      <Link to="/forgot-password">Forgot your password?</Link>
                      <br />
                      <Link to="/register">Register Account?</Link>
                      <br />
                      <Link to="/active-account">Send Activation Email?</Link>
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

const component = connect(null, { userPostFetch })(Login);

export default reduxForm({ form: "Login Form" })(component);
