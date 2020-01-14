import React from "react";
import TabProduct from "./TabProduct";
import { connect } from "react-redux";
import categories from "../helpers/categories.json";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import Schools from "../helpers/schools.json";
import Pagination from "react-js-pagination";
import { getAllProducts } from "../../actions/productActions";
import { getFilteredProducts } from "../../actions/productActions";
import { searchBook } from "../../actions/productActions";
import Spinner from "../helpers/Spinner";
class ShopContent extends React.Component {
  componentDidMount() {
    this.props.getAllProducts(1);
  }

  state = {
    value: { min: 2, max: 10, activePage: 1 },
    showFilter: false,
    showSearch: true,
    option: "title",
    title: null,
    like: true
  };

  renderSchools() {
    var schoolsnew = [];
    Schools.colleges.map(element => {
      schoolsnew.push(element);
    });
    Schools.polytechnics.map(element => {
      schoolsnew.push(element);
    });
    Schools.universities.map(element => {
      schoolsnew.push(element);
    });
    return schoolsnew.map(element => {
      return <option value={element}>{element}</option>;
    });
  }
  renderCategories() {
    return categories.map(category => {
      return <option value={category}>{category}</option>;
    });
  }
  renderProducts = () => {
    if (!this.props.items) {
      return (
        <div style={{ position: "relative", marginTop: "200px", left: "50%" }}>
          <Spinner type="TailSpin" height="100" width="100" />
        </div>
      );
    }
    if (this.props.items) {
      return this.props.items.map(item => {
        const len = item.likes.length !== null ? item.likes.length : 0;
        const likes = item.likes.filter(like => {
          if (this.props.user._id === like.userId) {
            return true;
          }
          return false;
        });
     
        return <TabProduct product={item} length={len} like={likes[0]} />;
      });
    }
  };
  handlePageChange = pageNumber => {
    console.log(pageNumber);
    this.props.getAllProducts(pageNumber);
    this.setState({ activePage: pageNumber });
  };

  renderFilteredProducts = () => {
    if (!this.props.filteredItems) {
      return (
        <div style={{ position: "relative", marginTop: "200px", left: "50%" }}>
          <Spinner type="TailSpin" height="100" width="100" />
        </div>
      );
    }
    else if (this.props.filteredItems === [] || this.props.filteredItems===null) {
      return <div><h5>No Record Found...!</h5></div>;
    }
    else if (this.props.filteredItems) {
      return this.props.filteredItems.map(item => {
        return <TabProduct product={item} />;
      });
    }
  };

  handleFilerBook = value => {
    this.setState({ showFilter: true });
    this.props.getFilteredProducts(value);
  };

  renderSearch = () => {
    if (this.props.searchBooks === []) {
      return <div><h5>No Record Found...!</h5></div>;
    }
     if (this.props.searchBooks) {
      return this.props.searchBooks.map(item => {
        return <TabProduct product={item} />;
      });
    }
  };
  onSubmitLogin(title) {
    let values = {};
    values.title = title;
    values.option = this.state.option;
    console.log(values);
    this.props.searchBook(values);
  }

  render() {
    console.log(this.state.value);

    return (
      <div className="page-shop-sidebar left--sidebar bg--white section-padding--lg">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-12 order-2 order-lg-1 md-mt-40 sm-mt-40">
              <div className="shop__sidebar">
                <button
                  className="btn btn-warning btn-lg"
                  style={{ width: "100%" }}
                  onClick={() => {
                    this.setState({ showFilter: false });
                  }}
                >
                  All Products
                </button>
                <br></br>
                <br></br>
                <h3 className="wedget__title">Filter by Categories</h3>
                <select
                  class="form-control"
                  name="category"
                  onChange={e => {
                    this.handleFilerBook({
                      title: "category",
                      query: e.target.value
                    });
                  }}
                >
                  <option />
                  {this.renderCategories()}
                </select>
                <br></br>
                <h3 className="wedget__title">Filter by School</h3>
                <select
                  name="school"
                  className="form-control"
                  onChange={e => {
                    this.handleFilerBook({
                      title: "school",
                      query: e.target.value
                    });
                  }}
                >
                  <option />
                  {this.renderSchools()}
                </select>
                <br></br>
                <h3 className="wedget__title">Filter by price</h3>
                <InputRange
                  maxValue={10000}
                  minValue={0}
                  value={this.state.value}
                  onChange={value => {
                    this.setState({ value });
                    this.handleFilerBook({
                      title: "price",
                      query: this.state.value
                    });
                  }}
                />
                <br></br>
                <br></br>
                <br></br>
                <aside className="wedget__categories poroduct--tag">
                  <h3 className="wedget__title">Filter by Book Condition</h3>
                  <ul className='clr-scheme'>
                    <li>
                      <a
                        href="#"
                        onClick={e => {
                          e.preventDefault();
                          this.handleFilerBook({
                            title: "bookCondition",
                            query: "New"
                          });
                        }}
                      >
                        New
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={e => {
                          e.preventDefault();
                          this.handleFilerBook({
                            title: "bookCondition",
                            query: "Very Good"
                          });
                        }}
                      >
                        Very Good
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={e => {
                          e.preventDefault();
                          this.handleFilerBook({
                            title: "bookCondition",
                            query: "Good"
                          });
                        }}
                      >
                        Good
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={e => {
                          e.preventDefault();
                          this.handleFilerBook({
                            title: "bookCondition",
                            query: "Fair"
                          });
                        }}
                      >
                        Fair
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={e => {
                          e.preventDefault();
                          this.handleFilerBook({
                            title: "bookCondition",
                            query: "Poor"
                          });
                        }}
                      >
                        Poor
                      </a>
                    </li>
                  </ul>
                </aside>
                <aside className="wedget__categories poroduct--tag">
                  <h3 className="wedget__title">
                    Filter by Book Delivery Options
                  </h3>
                  <ul>
                    <li>
                      <a
                        href="#"
                        onClick={e => {
                          e.preventDefault();
                          this.handleFilerBook({
                            title: "deliveryType",
                            query: "Delivery"
                          });
                        }}
                      >
                        Pickup
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={e => {
                          e.preventDefault();
                          this.handleFilerBook({
                            title: "deliveryType",
                            query: "Meetup"
                          });
                        }}
                      >
                        Meetup
                      </a>
                    </li>
                   
                  </ul>
                </aside>
              </div>
            </div>
            <div className="col-lg-9 col-12 order-1 order-lg-2">
              <div class="col-xs-8 col-xs-offset-2">
                <form action="#">
                  <div class="input-group">
                    <div class="input-group-btn search-panel">
                      <select
                        name="option"
                        value={this.state.option}
                        id=""
                        className="form-control"
                        onChange={e => {
                          this.setState({ option: e.target.value });
                        }}
                      >
                        <option value="title">Title</option>
                        <option value="isbn">ISBN</option>
                        <option value="author">Author</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      name="title"
                      onChange={e => {
                        this.onSubmitLogin(e.target.value);
                        this.setState({ showFilter: false });
                      }}
                      placeholder="Search the Community"
                    />
                    <span class="input-group-btn">
                      <button class="btn btn-default" type="button">
                        <span class="fa fa-search"></span>
                      </button>
                    </span>
                  </div>
                  <br></br>
                </form>
              </div>
              <div className="tab__container">
                {this.state.showFilter === true ? (
                  <div
                    className="shop-grid tab-pane fade show active"
                    id="nav-grid"
                    role="tabpanel"
                  >
                    <div className="row">{this.renderFilteredProducts()}</div>
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={10}
                      totalItemsCount={this.props.filteredItemsTotal}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                    />
                  </div>
                ) : this.props.searchBooks.length !== 0 ? (
                  <div
                    className="shop-grid tab-pane fade show active"
                    id="nav-grid"
                    role="tabpanel"
                  >
                    <div className="row">{this.renderSearch()}</div>
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={10}
                      totalItemsCount={this.props.filteredItemsTotal}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                    />
                  </div>
                ) : (
                  <div
                    className="shop-grid tab-pane fade show active"
                    id="nav-grid"
                    role="tabpanel"
                  >
                    <div className="row">{this.renderProducts()}</div>
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={10}
                      totalItemsCount={this.props.pages}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                    />
                  </div>
                )}
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
    items: state.products.allItems.data,
    searchBooks: state.products.searchBooks,
    pages: state.products.allItems.totalPages,
    filteredItems: state.products.filteredItems.data,
    filteredItemsTotal: state.products.filteredItems.totalPages,
    user: state.loginUser.currentUser
  };
};

export default connect(mapStateToProps, {
  getAllProducts,
  getFilteredProducts,
  searchBook
})(ShopContent);
