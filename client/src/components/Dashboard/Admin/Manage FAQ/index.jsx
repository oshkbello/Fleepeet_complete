import React, { Component } from "react";
import TopNav from "../../Navigation/TopNav";
import SideNav from "../../Navigation/SideNav";
import { NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import { getAllFQA, deleteFAQ } from "../../../../actions/faqAction";
import { Link } from "react-router-dom";

class ManageFAQ extends Component {
  componentDidMount() {
    this.props.getAllFQA(1);
  }
  state = { activePage: 1 };
  handlePageChange = page => {
    this.setState({ activePage: page });
  };
  renderUsers = () => {
    if (this.props.faqs) {
      return this.props.faqs.map(faq => {
        return (
          <tr>
            <td>
              <h2>
                {faq.question}
              </h2>
            </td>
            <td>{faq._id}</td>
            <td>{faq.answer}</td>
            <td>{faq.createdAt}</td>


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
                      to={`/editFAQ/${faq._id}`}
                    >
                      <i class="fa fa-pencil m-r-5"></i> Edit
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link
                      className="desktop-hover"
                      onClick={() => { 
                        if (window.confirm("Are you sure to delete this FAQ?")) {
                          this.props.deleteFAQ(faq._id) ;
                        }
                      }}
                    >
                      <i class="fa fa-trash-o m-r-5"></i> Delete
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </td>
          </tr >
        );
      });
    }
  };
  render() {
    return (
      <SideNav >
        <div class="row">
          <div class="col-4 col-sm-6">
            <h4 class="page-title">FAQs</h4>
          </div>
          <div class="col-5 col-sm-6">
              <Link
                to="/createFAQ"
                className="btn btn-warning text-white"
                style={{ float: "right" }}
              >
                  <i class="fa fa-plus"></i>Create FAQ
                </Link>
          </div>
          </div>
        <div class="row">
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-striped custom-table datatable">
                <thead>
                  <tr>
                    <th style={{ width: "30%" }}>Question</th>
                    <th>FAQ ID</th>
                    <th>Answer</th>
                    <th>Time</th>
                    <th>Actions</th>
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
  console.log('FAQ', state.faqData.faqs);
  return { faqs: state.faqData.faqs };
};
export default connect(mapStateToProps, {
  getAllFQA, deleteFAQ
})(ManageFAQ);
