import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import axios from "axios";
import History from "../../../history";
import TopNav from "../Navigation/TopNav";
import SideNav from "../Navigation/SideNav";
import Sppiner from "../../helpers/Spinner";
import { createNotification } from "../../CommonComponents/Notifications";
class AcceptRequest extends Component {
  state = { loading: false };
  onSubmitRefer = async values => {
    this.setState({ loading: true });
    const token = localStorage.getItem("token");

    const res = await axios.post("/activities/referToFriend", values, {
      headers: {
        "x-auth-token": token
      }
    });
    if (res.status === 200) {
      this.setState({ loading: false });
      createNotification("success", res.data.message);
      setTimeout(function() {
        History.push("/referfriend");
      }, 3000);
    }
    if (res.status !== 200) {
      this.setState({ loading: false });
    }
  };
  render() {
    return (
      <SideNav>
        <form
          action="#"
          onSubmit={this.props.handleSubmit(this.onSubmitRefer)}
          encType="multipart/form-data"
        >
          <div class="form-group">
            <div class="col-sm-12">
              <h4 class="page-title">Refer to Friend</h4>
            </div>
            <Field
              class="form-control"
              component="input"
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>
          <button className="btn btn-warning text-white">Refer</button>
        </form>
        <div>
          {this.state.loading ? (
            <Sppiner type="ThreeDots" height="50" width="50" />
          ) : (
            ""
          )}
        </div>
      </SideNav>
    );
  }
}
export default reduxForm({ form: "Respond Purchase Request" })(AcceptRequest);
