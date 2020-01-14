import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { editBreadCrumbImage } from "../../../../actions/adminActions";
import { SingleFileInput } from "../../../helpers/helpers";
class BreadCrumbImages extends Component {
  onSubmitRegister = async values => {
    this.props.editBreadCrumbImage(values);
  };
  render() {
    return (
      <div className="content container-fluid">
        <div className="row">
          <div className="col-sm-7 col-4">
            <h4 className="page-title">BreadCrumb Image</h4>
          </div>

          <div className="col-sm-5 col-8 text-right m-b-30">
            <form
              action="#"
              onSubmit={this.props.handleSubmit(this.onSubmitRegister)}
              id="requestsend"
              encType="multipart/form-data"
            >
              <div className="form-group">
                <label>
                  <i className="fa fa-plus"></i> Edit BreadCrumb Images{" "}
                </label>
                <Field
                  name="breadcrumbImage"
                  type="file"
                  component={SingleFileInput}
                  className="btn btn-primary btn-rounded form-control"
                ></Field>
              </div>
              <button type="submit" className="btn btn-warning text-white">
                Upload
              </button>
            </form>
          </div>
        </div>
        <div className="card-box">
          <div className="row">
            <div className="col-md-12">
              <div className="profile-view">
                <div>
                  <div className="row">
                    <div className="col-md-12">
                      <ul >
                        <div>
                          <div className="content container-fluid">
                            <div className="row">
                              <div className="col-sm-12">
                                <h4 className="page-title">Gallery</h4>
                              </div>
                            </div>
                            <div className="row">
                              {this.props.image ? (
                                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 m-b-20">
                                  <img
                                    className="img-thumbnail"
                                    src={this.props.image}
                                    alt=""
                                  />
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};
const component = connect(mapStateToProps, { editBreadCrumbImage })(
  BreadCrumbImages
);

export default reduxForm({ form: "Add BreadCrumb Images" })(component);
