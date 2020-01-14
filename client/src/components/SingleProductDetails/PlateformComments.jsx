import React, { Component } from "react";
import axios from "axios";
import { createNotification } from "../CommonComponents/Notifications";
import { required } from "../CommonComponents/FormValidations";
import { Field, reduxForm, reset } from "redux-form";
class PlateformComments extends Component {
  onSubmitPurchaseRequest = async (values, dispatch) => {
    const token = localStorage.getItem("token");
    axios
      .post("/activities/plateformComments", values, {
        headers: {
          "x-auth-token": token
        }
      })
      .then(response => {
        createNotification("success", "Success", response.data.message);
        dispatch(reset("Plateform Comments"));
      })
      .catch(error => {
        dispatch(reset("Plateform Comments"));
        createNotification("error", error.response.data.message);
      });
  };
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div class="package">
        <div class="pheader">Comment About Flipeet</div>
        <div class="pbody">
          <form
            onSubmit={this.props.handleSubmit(this.onSubmitPurchaseRequest)}
            action="#"
          >
            <label>Description</label>
            <Field
              name="comment"
              id="nickname_field"
              component="textarea"
              type="textarea"
              className="form-control"
              validate={required}
            />
            <button
              style={{ margin: 15 }}
              type="submit"
              className="btn btn-warning"
              disabled={pristine || submitting}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default reduxForm({ form: "Plateform Comments" })(PlateformComments);
