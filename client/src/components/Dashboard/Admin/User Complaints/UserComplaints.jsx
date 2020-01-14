import React, { Component } from "react";
import SideNav from "../../Navigation/SideNav";
import { userComplaints } from "../../../../actions/adminActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../../helpers/helpers";
class UserComplaints extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.userComplaints(1);
  }
  render() {
    const renderUserReports = () => {
      if (this.props.Complaints !== null) {
        return this.props.Complaints.map(complain => {
          return (
            <tr>
              <td >
                <Link style={{ color: "#6D00A6" }} to={`/siteUserProfile/${complain.reporterID}`}>
                  {complain.reporterID}
                  <br />
                  {complain.email}
                </Link>
              </td>
              <td >
                <Link style={{ color: "red" }} to={`/siteUserProfile/${complain.sellerid}`}>{complain.sellerid}</Link>
              </td>
              <td>{complain.description}</td>
            </tr>
          );
        });
      } else {
        return <div>No complaint found!</div>;
      }
    };
    return (
      <SideNav>
        <div class="row" style={{ marginLeft: 0, marginRight: 0 }}>
          <div class="col-sm-12">
            <h4 class="page-title">Users Complaints</h4>
          </div>
        </div>
        <div class="row" style={{ marginLeft: 0, marginRight: 0 }}>
          <div class="col-4 col-sm-8 col-md-10 col-lg-12 ">
            <table class="table table-border custom-table m-b-0">
              <thead>
                <tr>
                  <th>Complaint By</th>
                  <th>Complain Against</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>{renderUserReports()}</tbody>
            </table>
          </div>
        </div>
      </SideNav>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.Loader.loading,
    Complaints: state.admin.userComplaints
  };
};

export default connect(mapStateToProps, { userComplaints })(UserComplaints);
