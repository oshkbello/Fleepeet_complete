import React, { Component } from "react";
import { Pie } from "react-chartjs-2";


export default class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: ["Total Books", "Sold out", "In stock"],
        datasets: [
          {
            data: this.props.overviewData,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
          }
        ]
      }
    };
  }

  render() {
    return (
      <>
        <h4 className='float-left'>Overview</h4>
        <Pie  data={this.state.data} />
      </>
    );
  }
}
