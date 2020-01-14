import React, { Component, Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import {connect} from 'react-redux'
import History from "../../../../history";
import { Link } from "react-router-dom";
import axios from "axios";
import Schools from "../../../helpers/schools.json";
import SideNav from "../../Navigation/SideNav";
import Sppiner from "../../../helpers/Spinner";
import { createNotification } from "../../../CommonComponents/Notifications";
import { renderField } from "../../../CommonComponents/RenderFormField";
import { userPostProfile, logoutUser } from '../../../../actions/User_Auth';
import {
  required,
  email,
  exactLength,
  passwordsMatch
} from "../../../CommonComponents/FormValidations";
import { SingleFileInput } from "../../../helpers/helpers";
import { empty } from "joi";

const exactLength8 = exactLength(8, "Password length must be minimum");
class UpdateProfile extends Component {
  
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

    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("password", values.password);
    formData.append("email", values.email);
    formData.append("conformPassword", values.conformPassword);
    formData.append("city", values.city);
    formData.append("school", values.school);
    formData.append("role", values.role);
    formData.append("accountType", values.accountType);
    if(values.profile_image){
      formData.append("profile_image", values.profile_image[0]);

    }
    console.log(formData);
    axios
      .post("/user/register", formData)
      .then(response => {
        createNotification("success", response.data.message);
        if (response.status === 200) {
          this.setState({ loading: false });
          setTimeout(function() {
            History.push("/dashboard");
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
            <SideNav />
        
            <div class="content container-fluid">
                <div className="main-wrapper mt-1">
            <div className="account-page" style={{ marginTop: 30 }}>
                <div className="container">
                <h3 className="account-title">Create Admin Account</h3>
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
                        onSubmit={this.props.handleSubmit(this.onSubmitRegister)}
                        encType="multipart/form-data"
                    >
                        <div className="form-group">
                        <label>First Name</label>
                        <Field
                            name="firstName"
                            component={renderField}
                            type="text"
                            className="form-control"
                            validate={required}
                        />
                        </div>
                        <div className="form-group">
                        <label>Last Name</label>
                        <Field
                            name="lastName"
                            component={renderField}
                            type="text"
                            className="form-control"
                            validate={required}
                        />
                        </div>
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
                        <label>Profile Image</label>
                        <Field
                            name="profile_image"
                            component={SingleFileInput}
                            type="file"
                            id="profile_image"
                            className="form-control"
                        />
                        </div>
                        <div className="form-group">
                        <label>City</label>
                        <Field
                            name="city"
                            component="input"
                            type="text"
                            className="form-control"
                            validate={required}
                        />
                        </div>
                        <div className="form-group">
                        <label>User Role</label>
                        <Field
                            name="role"
                            component="select"
                            className="form-control"
                            validate={required}
                        >
                            <option />
                            <option value="admin">admin</option>
                            <option value="user">user</option>
                        </Field>
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
                        <div className="form-group">
                        <label>Confirm Password</label>
                        <Field
                            name="conformPassword"
                            component={renderField}
                            type="password"
                            className="form-control"
                            validate={[required, passwordsMatch]}
                        />
                        </div>
                        <div className="form-group">
                        <label>Account Type</label>
                        <Field
                            name="accountType"
                            component="select"
                            className="form-control"
                            onChange={e => {
                            this.setState({ accountType: e.target.value });
                            }}
                            validate={required}
                        >
                            <option />
                            <option value="student">Student</option>
                            <option value="non-student">Non-Student</option>
                        </Field>
                        </div>
                        {this.state.accountType === "student" ? (
                        <div className="form-group">
                            <label>School</label>
                            <Field
                            name="school"
                            component="select"
                            label="Select School"
                            type="select"
                            className="form-control"
                            >
                            <option />
                            {this.renderSchools()}
                            </Field>
                        </div>
                        ) : null}

                        <div className="form-group text-center">
                        <button
                            disabled={invalid || submitting}
                            className="btn btn-primary btn-block account-btn"
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
            </div>
            </div>
        </div>
    </Fragment>
    );
  }
}
const mapStateToProps=(state)=>{
  if (state.loginUser.currentUser !== undefined ) {
  return {
    user: state.loginUser.currentUser,
  }
  }
}

export default connect(mapStateToProps, { logoutUser })(reduxForm({
  form: "Create Admin Form profile",
  enableReinitialize: true
})(UpdateProfile));
