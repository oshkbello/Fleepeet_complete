import React from "react";
import { Field, reduxForm } from "redux-form";
import axios from "axios";
import { createNotification } from "../CommonComponents/Notifications";
class ReportSeller extends React.Component {
  state = { Message: null };
  onSubmitReportAdmin = async values => {
    values.sellerid = this.props.id;
    const token = localStorage.getItem('token');
    axios
      .post("/activities/reportSeller", values, {
        headers: {
          'x-auth-token': token
        }
      })
      .then(response => {
        createNotification("success", "Success", response.data.message);
      })
      .catch(error => {
        createNotification(
          "error",
          error.response.data.description,
          error.response.data.message
        );
      });
    // const res = await fetch("/activities/reportSeller", "POST", values);
    // this.setState({ Message: res.message });
  };
  render() {
    return (
      <div className="review-fieldset">
        <h2>Report Seller to Admin</h2>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmitReportAdmin)}
          action="#"
        >
          <div className="review_form_field">
            <div className="input__box">
              <span>Description</span>
              <Field
                name="description"
                id="nickname_field"
                component="textarea"
                cols={1}
                rows={4}
                type="textarea"
                className="form-control"
                style={{ maxWidth: '600px' }}
              />
            </div>
            <div className="review-form-actions" style={{ marginTop: 30 }}>
              <button className="btn btn-warning">Report to Admin</button>
            </div>
          </div>
        </form>
        <div>
          {this.state.Message !== null ? (
            <span className="text text-success">{this.state.Message}</span>
          ) : (
              <div></div>
            )}
        </div>
      </div>
    );
  }
}

export default reduxForm({ form: "Report Seller" })(ReportSeller);
