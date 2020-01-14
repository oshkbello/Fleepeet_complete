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

class ActiveAccount extends Component {
  state = { loading: false };
  onSubmitActiveAccount = async values => {
    this.setState({ loading: true });
    axios
      .post("/user/active-account", values)
      .then(response => {
        this.props.userPostFetch(response.data);
        createNotification("success", "Success", response.data.message);

        if (response.status === 200) {
          this.setState({ loading: false });
          // setTimeout(function() {
          //   History.push("/");
          // }, 500);
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
              <h3 class="account-title">Active Your Account</h3>
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
                    onSubmit={this.props.handleSubmit(
                      this.onSubmitActiveAccount
                    )}
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

                    <div class="form-group text-center">
                      <button
                        class="btn btn-warning text-white btn-block account-btn"
                        type="submit"
                        disabled={invalid || submitting}
                      >
                        Submit
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
                      <Link to="/login">Login to account?</Link>
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

const component = connect(null, {
  userPostFetch
})(ActiveAccount);

export default reduxForm({ form: "Active Account Form" })(component);
