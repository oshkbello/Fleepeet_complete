import React, { Component } from "react";
import { Link } from "react-router-dom";
import TopNav from "../../Navigation/TopNav";
import SideNav from "../../Navigation/SideNav";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import { NavDropdown } from "react-bootstrap";
import { getUsers, deleteUser } from "../../../../actions/adminActions";
class ManageUser extends Component {
  componentDidMount() {
    this.props.getUsers(1);
  }
  state = { activePage: 1 };
  handlePageChange = page => {
    this.setState({ activePage: page });
  };
  renderUsers = () => {
    if (this.props.users) {
      return this.props.users.map(user => {
        return (
          <tr>
            <td>
              <h2>
                <Link to={`/siteUserProfile/` + user._id}>
                  {user.firstName} {user.lastName}
                </Link>
              </h2>
            </td>
            <td>{user._id}</td>
            <td>{user.email}</td>
            <td>{user.tickets}</td>
            <td>{user.city}</td>
            <td>{user.accountType}</td>

            <td class="text-right">
              <div class="dropdown dropdown-action">
                <NavDropdown
                  title={<i class="fa fa-ellipsis-v" />}
                  id="basic-nav-dropdown"
                  className="desktop-hover text-black"
                >
                  <NavDropdown.Item>
                    <Link
                      className="desktop-hover"
                      to={`/editSiteUserProfile/` + user._id}
                    >
                      <i class="fa fa-pencil m-r-5"></i> Edit
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link
                      className="desktop-hover"
                      onClick={() => {
                        if (
                          window.confirm("Are you sure to delete this user?")
                        ) {
                          this.props.deleteUser(user._id);
                        }
                      }}
                    >
                      <i class="fa fa-trash-o m-r-5"></i> Delete
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>

                {/* <ButtonToolbar>
                  <OverlayTrigger
                    rootClose="true"
                    trigger="click"
                    key="left"
                    placement="left"
                    overlay={
                      <Popover id={`popover-positioned-left`}>
                        <Popover.Content>
                          <Link
                            class="dropdown-item"
                            to={`/editSiteUserProfile/` + user._id}
                          >
                            <i class="fa fa-pencil m-r-5"></i> Edit
                          </Link>
                        </Popover.Content>
                        <Popover.Content>
                          <Link
                            class="dropdown-item"
                            onClick={() => {
                              this.props.deleteUser(user._id);
                            }}
                          >
                            <i class="fa fa-trash-o m-r-5"></i> Delete
                          </Link>
                        </Popover.Content>
                      </Popover>
                    }
                  >
                    <Link class="action-icon dropdown-toggle">
                      <i class="fa fa-ellipsis-v" />
                    </Link>
                  </OverlayTrigger>
                </ButtonToolbar> */}
              </div>
            </td>
          </tr>
        );
      });
    }
  };
  render() {
    return (
      <SideNav>
        <div class="row">
          <div class="col-6 col-sm-8 col-md-12">
            <div class="table-responsive">
              <table class="table table-striped custom-table datatable">
                <thead>
                  <tr>
                    <th style={{ width: "30%" }}>Name</th>
                    <th>Employee ID</th>
                    <th>Email</th>
                    <th>Tickets</th>
                    <th>City</th>
                    <th>Account Type</th>
                    <th class="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>{this.renderUsers()}</tbody>
              </table>
            </div>
          </div>
        </div>

        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={this.props.totalPages}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
      </SideNav>
    );
  }
}
const mapStateToProps = state => {
  return {
    users: state.admin.users.users,
    totalPages: state.admin.users.totalPages
  };
};
export default connect(mapStateToProps, {
  getUsers,
  deleteUser
})(ManageUser);
