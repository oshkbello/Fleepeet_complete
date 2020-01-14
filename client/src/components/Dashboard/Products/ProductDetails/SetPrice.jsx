import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import axios from "axios";
class SetPrice extends Component {
  state = { Message: null };

  onSubmitBookComment = async values => {
    values.bookid = this.state.product._id;
    console.log(values);
    const token = localStorage.getItem("token");
    const res = await axios.post("/book/commentBook", values, {
      headers: {
        "x-auth-token": `${token}`
      }
    });
    this.setState({ Message: res.data.message });  
  };
  render() {
    return (
      <div className="tab-pane show active" id="setPrice">
        <div className="product-content">
          <p>Set Book Price</p>
          <form
            onSubmit={this.props.handleSubmit(this.onSubmitBookComment)}
            action="#"
          >
            <div className="review_form_field">
              <div className="input__box">
                <span>Book Price</span>
                <Field
                  name="name"
                  id="nickname_field"
                  component="input"
                  type="number"
                  className="form-control"
                  min={0}
                />
              </div>

              <div className="review-form-actions">
                <button className="btn btn-warning text-white">Set Price</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const component = connect(
  null,
  {}
)(SetPrice);

export default reduxForm({ form: "SetBook Price" })(component);
