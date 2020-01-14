import React, { Component } from "react";
import TopNav from "../../Navigation/TopNav";
import SideNav from "../../Navigation/SideNav";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { isbnBasedSearch } from "../../../../actions/productActions";
import categories from "../../../helpers/categories.json";
import axios from "axios";
import History from "../../../../history";
import { createNotification } from "../../../CommonComponents/Notifications";
import Spinner from "../../../helpers/Spinner";
import { renderField } from "../../../CommonComponents/RenderFormField";
import { required } from "../../../CommonComponents/FormValidations";
import { userTickets } from "../../../../actions/User_Auth";
const adaptFileEventToValue = delegate => e => delegate(e.target.files);

const FileInput = ({
  input: { value: omitValue, onChange, onBlur, ...inputProps },
  meta: omitMeta,
  ...props
}) => {
  return (
    <input
      onChange={adaptFileEventToValue(onChange)}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      {...props.input}
      {...props}
      multiple
    />
  );
};
class CreateBlogPost extends Component {
  state = {
    Message: null,
    loading: false,
    deliveryType: "Meetup",
    bookCondition: "Excelent",
    validateImg: ""
  };

  renderCategories() {
    this.props.userTickets();
    return categories.map(category => {
      return <option value={category}>{category}</option>;
    });
  }

  onSubmitRegister = async values => {
    if (!values.image) {
      alert("Please Select a Post Image!");
    } else if (values.image !== undefined && values.image.length >= 1) {
      this.setState({ loading: true });

      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("description", values.description);

      // formData.append(values);
      for (const key of Object.keys(values.image)) {
        formData.append("image", values.image[key]);
      }

      const token = localStorage.getItem("token");
      formData.append("image", values.image);
      try {
        const res = await axios.post("/activities/blog_post/add", formData, {
          headers: {
            "x-auth-token": `${token}`
          }
        });
        this.setState({ Message: res.data.message });
        if (res.status === 200) {
          this.setState({ loading: false });
          createNotification("success", res.data.message);
          setTimeout(function() {
            History.push("/dashboradBlogPosts");
          }, 500);
        }
      } catch (error) {
        this.setState({ loading: false });
        createNotification(
          "error",
          error.response.data.description,
          error.response.data.message
        );
      }
    } else {
      alert("Please Select a Post Image!");
    }
  };

  handleChange = e => {
    let value = e.target.value;
    this.props.isbnBasedSearch(value);
  };

  render() {
    console.log(this.props);
    const { handleSubmit, pristine, reset, submitting, invalid } = this.props;
    return (
      <SideNav>
        <div class="row">
          <div class="col-md-8 offset-md-2">
            <h2 class="page-title">Creat Blog Post</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 offset-md-2">
            <form
              action="#"
              onSubmit={this.props.handleSubmit(this.onSubmitRegister)}
              encType="multipart/form-data"
            >
              <div class="form-group">
                <label>Post Title</label>
                <Field
                  class="form-control"
                  type="text"
                  component={renderField}
                  name="title"
                  validate={required}
                />
              </div>
              <div class="form-group">
                <label>Post Description</label>
                <Field
                  cols={30}
                  rows={6}
                  class="form-control"
                  component={renderField}
                  type="textarea"
                  name="description"
                  validate={required}
                />
              </div>
              <div class="form-group">
                <label>Post Image</label>
                <div>
                  <Field
                    class="form-control"
                    type="file"
                    component={FileInput}
                    name="image"
                  />
                </div>
              </div>
              <div class="m-t-20 text-center">
                <button class="btn btn-warning text-white btn-lg">
                  Publish Post
                </button>
                {this.state.loading ? (
                  <Spinner
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
      </SideNav>
    );
  }
}
const mapStateToProps = state => {
  if (
    state.products.singleBookData !== undefined ||
    this.products.singleBookData !== null
  ) {
    return { initialValues: state.products.singleBookData };
  }
  return;
};

export default connect(mapStateToProps, { isbnBasedSearch, userTickets })(
  reduxForm({ form: "Add Product Dashboard", enableReinitialize: true })(
    CreateBlogPost
  )
);
