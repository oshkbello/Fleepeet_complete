import React, { Component, Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import {connect} from 'react-redux'
import History from "../../../../history";
import { Link } from "react-router-dom";
import axios from "axios";
import Schools from "../../../helpers/schools.json";
import TopNav from "../../Navigation/TopNav";
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
class CreateFAQ extends Component {

  state = { Message: null, accountType: null, loading: false };
  onSubmitRegister = async values => {
    this.setState({ loading: true });

    axios
      .post("/activities/faq/create", values)
      .then(response => {
        createNotification("success", response.data.message);
        if (response.status === 200) {
          this.setState({ loading: false });
          setTimeout(function() {
              History.push("/manageFAQ");
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
                <h3 className="account-title">Create FAQ</h3>
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
                        <label>FAQ Question</label>
                        <Field
                            cols={30}
                            rows={6}
                            class="form-control"
                            component="textarea"
                            type="textarea"
                            name="question"
                            validate={required}
                        />
                        </div>
                        <div className="form-group">
                        <label>FAQ Answer</label>
                        <Field
                            cols={30}
                            rows={6}
                            class="form-control"
                            component="textarea"
                            type="textarea"
                            name="answer"
                            validate={required}
                        />
                        </div>


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
  form: "Create FAQ Form",
  enableReinitialize: true
})(CreateFAQ));
