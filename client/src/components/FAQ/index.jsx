import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import BreadCrumb from "../CommonComponents/BradCrumb";
import Header from "../Header/Header";
import Footer from "../Footer/index";
import { getAllFQA } from "../../actions/faqAction";
class FAQ extends Component {
  componentDidMount() {
    this.props.getAllFQA();
  }
  render() {
    return (
      <Fragment>
        <Header />
        <BreadCrumb />
        <div className="container">
          <div className="py-3">
            <div className="row">
              <div className="col-sm-12">
                <div
                  className="accordion"
                  id="faqExample"
                  style={{ marginTop: 120 }}
                >

                  {this.props.faqs ? this.props.faqs.map((faq, ind) => {
                    return <div className="card" style={{ width: "100%" }}>
                      <div className="card-header p-2" id={`heading_${faq._id}`}>
                        <h5 className="mb-0">
                          <button
                            className="btn btn-link "
                            type="button"
                            data-toggle="collapse"
                            data-target={`#collapse_${faq._id}`}
                            aria-expanded="true"
                            aria-controls={`collapse_${faq._id}`}
                          >
                            Q: {faq.question}?
                      </button>
                        </h5>
                      </div>

                      <div
                        id={`collapse_${faq._id}`}
                        className="collapse show "
                        aria-labelledby={`heading_${faq._id}`}
                        data-parent="#faqExample"
                      >
                        <div className="card-body">
                          <b>Answer:</b> {faq.answer}.
                    </div>
                      </div>
                    </div>
                  }) : null}




                </div>

              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  console.log("FAQ", state.faqData.faqs);
  return { faqs: state.faqData.faqs };
};
export default connect(mapStateToProps, { getAllFQA })(FAQ);
