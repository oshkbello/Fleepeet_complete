import React, { Component, Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import {connect} from 'react-redux'
import History from "../../../history";
import { Link } from "react-router-dom";
import axios from "axios";
import Schools from "../../helpers/schools.json";
import TopNav from "../Navigation/TopNav";
import SideNav from "../Navigation/SideNav";
import Sppiner from "../../helpers/Spinner";
import { createNotification } from "../../CommonComponents/Notifications";
import { renderField } from "../../CommonComponents/RenderFormField";
import { siteUserData } from "./../../../actions/userProfile";
import { userPostProfile, logoutUser } from './../../../actions/User_Auth';
import {
  required,
  email,
  exactLength,
  passwordsMatch
} from "../../CommonComponents/FormValidations";
import { SingleFileInput } from "../../helpers/helpers";
import { empty } from "joi";

const exactLength8 = exactLength(8, "Password length must be minimum");
class EditSiteUser extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.siteUserData(id);
  }
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

    const token=localStorage.getItem('token');

    axios
      .put(`/user/editSiteUser/${this.props.match.params.id}`, values,
      {
        headers: {
          "x-auth-token": `${token}`
        }
      })
      .then(response => {
        createNotification("success", response.data.message);
        if (response.status === 200) {
          this.setState({ loading: false });
          History.push('/manageUsers');
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
        createNotification(
          "error",
          error.response.data.description,
          error.response
        );

      });
  };

  render() {
    const { handleSubmit, pristine, reset, submitting, invalid } = this.props;
    return (
        <Fragment>
            <SideNav>
            <div className="account-page" style={{ marginTop: -20 }}>
                <div className="container">
                <h3 className="account-title">Edit User Info </h3>
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
                        <label>FirstName</label>
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
                            className="btn btn-warning text-white btn-block account-btn"
                            type="submit"
                        >
                            Update
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
        </SideNav>
    </Fragment>
    );
  }
}
const mapStateToProps=(state)=>{
  if (state.loginUser.currentUser !== undefined ) {
  return {
    initialValues: state.UserProfile.siteUser,
    siteUser: state.UserProfile.siteUser,
  }
  }
}

export default connect(mapStateToProps, { siteUserData })(reduxForm({
  form: "update profile",
  enableReinitialize: true
})(EditSiteUser));
