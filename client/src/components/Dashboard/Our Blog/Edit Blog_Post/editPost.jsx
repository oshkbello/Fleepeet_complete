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
import { getSinglePost } from "../../../../actions/blogAction";

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
class EditBlogPost extends Component {
  state = {
    Message: null,
    loading: false,
    deliveryType: "Meetup",
    bookCondition: "Excelent",
    validateImg: ""
  };

  componentWillMount() {
    const postId = this.props.match.params.id;
    this.props.getSinglePost(postId);
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
      if (values.image) {
        formData.append("image", values.image[0]);
      }

      const token = localStorage.getItem("token");
      // formData.append("image", values.image);
      try {
        const postId = this.props.match.params.id;
        const res = await axios.post(
          `/activities/blog_post/edit/${postId}`,
          formData,
          {
            headers: {
              "x-auth-token": `${token}`
            }
          }
        );
        // console.log(res);
        this.setState({ Message: res.data.message });
        if (res.status === 200) {
          this.setState({ loading: false });
          createNotification("success", res.data.message);
          setTimeout(function() {
            History.push("/dashboradBlogPosts");
          }, 500);
        }
      } catch (error) {
        console.log(error);
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

  renderPost = () => {
    return (
      <div>
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
            <label> Change Post Image?</label>
            <div>
              <Field
                class="form-control"
                component={FileInput}
                type="file"
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
    );
  };


  render() {
    const { handleSubmit, pristine, reset, submitting, invalid } = this.props;
    return (
      <SideNav>
        <div class="row">
          <div class="col-md-8 offset-md-2">
            <h4 class="page-title">Creat Blog Post</h4>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 offset-md-2">{this.renderPost()}</div>
        </div>
      </SideNav>
    );
  }
}
const mapStateToProps = state => {
  return { initialValues: state.posts.post[0] };
};

export default connect(mapStateToProps, { getSinglePost })(
  reduxForm({ form: "Edit Product Dashboard", enableReinitialize: true })(
    EditBlogPost
  )
);
