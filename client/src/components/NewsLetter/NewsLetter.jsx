import React from "react";
import axios from "axios";
export default class NewsLetter extends React.Component {
  state = { Message: null };
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const res = await axios.post("/activities/subscribeNewsLetter", {
      email: this.state.value
    });
    this.setState({ Message: res.data.message });
  };

  render() {
    return (
      <section className="wn__newsletter__area bg-image--2">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 offset-lg-5 col-md-12 col-12 ptb--150">
              <div className="section__title text-center">
                <h2>Stay With Us</h2>
              </div>
              <div className="newsletter__block text-center">
                <p>
                  Subscribe to our newsletters now and stay up-to-date with new
                  collections, the latest lookbooks and exclusive offers.
                </p>
                <form onSubmit={this.handleSubmit}>
                  <div className="newsletter__box">
                    <input
                      type="text"
                      value={this.state.value}
                      onChange={this.handleChange}
                      placeholder="Enter your e-mail"
                    />
                    <button>Subscribe</button>
                  </div>
                </form>
                <div>
                  {this.state.Message !== null ? (
                    <span className="text text-success">
                      {this.state.Message}
                    </span>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
