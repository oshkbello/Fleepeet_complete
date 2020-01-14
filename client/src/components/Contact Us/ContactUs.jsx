import React, { Component, Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import History from "../../history";
import { Link } from "react-router-dom";
import axios from "axios";
import Schools from "../helpers/schools.json";
import Header from "../Header/Header";
import Breadcrumb from "../CommonComponents/BradCrumb";
import Footer from "../Footer/index";
import Sppiner from "../helpers/Spinner";
import { createNotification } from "../CommonComponents/Notifications";
import { renderField } from "../CommonComponents/RenderFormField";
import {
  required,
  email,
  exactLength,
  passwordsMatch
} from "../CommonComponents/FormValidations";
import { SingleFileInput } from "../helpers/helpers";

const exactLength8 = exactLength(8, "Password length must be minimum");

class ContactUs extends Component {
  state = { Message: null, accountType: null, loading: false };

  renderSchools() {
    var schoolsnew = [];
    Schools.colleges.map(element => {
      schoolsnew.push(element);
    });
    Schools.polytechnics.map(element => {
      schoolsnew.push(element);
    });
    Schools.universities.map(element => {
      schoolsnew.push(element);
    });
    return schoolsnew.map(element => {
      return <option value={element}>{element}</option>;
    });
  }

  onSubmitRegister = async values => {
    this.setState({ loading: true });
    const formData = new FormData();

    formData.append("subject", values.subject);
    formData.append("description", values.description);
    formData.append("email", values.email);
    console.log(values.subject);
    console.log(values.description);
    console.log(values.email);
    const data = {
      subject: values.subject,
      description: values.description,
      email: values.email
    };

    axios
      .post("/activities/contactUs", data)
      .then(response => {
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
        this.setState({ Message: error.response.data.message });
      });
  };

  render() {
    const { handleSubmit, pristine, reset, submitting, invalid } = this.props;
    return (
      <Fragment>
        <Header />
        <Breadcrumb />
        <div className="container-fluid" style={{ marginTop: 70 }}>
          <h3 className="account-title">Contact Us</h3>
          <div style={{ maxWidth: "400px", margin: "auto" }}>
            <div className="account-wrapper">
              <div className="account-logo">
                <Link to="/">
                  <img src="images/logo/flipeetLogo2.png" alt="Flipeet Logo" />
                </Link>
              </div>
              <form
                onSubmit={this.props.handleSubmit(this.onSubmitRegister)}
                encType="multipart/form-data"
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
                  <label>Subject</label>
                  <Field
                    name="subject"
                    component={renderField}
                    type="text"
                    className="form-control"
                    validate={required}
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>

                  <Field
                    cols={30}
                    rows={5}
                    class="form-control "
                    component={renderField}
                    type="textarea"
                    name="description"
                    validate={required}
                  />
                </div>

                <div className="form-group text-center">
                  <button
                    disabled={invalid || submitting}
                    className="btn btn-warning text-white btn-block account-btn"
                    type="submit"
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
              </form>
            </div>
          </div>
        </div>

        <Footer />
      </Fragment>
    );
  }
}
export default reduxForm({ form: "Contact Us Form" })(ContactUs);
