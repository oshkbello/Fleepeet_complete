import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { editSliderImage } from "../../../../actions/adminActions";
import { FileInput } from "../../../helpers/helpers";
class SliderImages extends Component {
  onSubmitRegister = async values => {
    this.props.editSliderImage(values);
  };
  renderImages = () => {
    if (this.props.images) {
      return this.props.images.map(img => {
        return (
          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 m-b-20">
            <img class="img-thumbnail" src={img} alt="" />
          </div>
        );
      });
    }
  };
  render() {
    return (
      <div class="content container-fluid">
        <div class="row">
          <div class="col-sm-7 col-4">
            <h4 class="page-title">Slider Images</h4>
          </div>

          <div class="col-sm-5 col-8 text-right m-b-30">
            <form
              action="#"
              onSubmit={this.props.handleSubmit(this.onSubmitRegister)}
              id="requestsend"
              encType="multipart/form-data"
            >
              <div class="form-group">
                <label>
                  <i class="fa fa-plus"></i> Add Slider Images{" "}
                </label>
                <Field
                  name="sliderImage"
                  type="file"
                  component={FileInput}
                  class="btn btn-primary btn-rounded form-control"
                ></Field>
              </div>
              <button type="submit" className="btn btn-warning text-white">
                Upload
              </button>
            </form>
          </div>
        </div>
        <div class="card-box">
          <div class="row">
            <div class="col-md-12">
              <div class="profile-view">
                <div>
                  <div class="row">
                    <div class="col-md-12">
                      <ul>
                        <div>
                          <div class="content container-fluid">
                            <div class="row">
                              <div class="col-sm-12">
                                <h4 class="page-title">Gallery</h4>
                              </div>
                            </div>
                            <div class="row">{this.renderImages()}</div>
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
const component = connect(mapStateToProps, { editSliderImage })(SliderImages);

export default reduxForm({ form: "Add Slider Images" })(component);
