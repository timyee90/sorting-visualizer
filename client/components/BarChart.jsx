import React, { Component } from 'react';
import Chart from 'chart.js';

class BarChart extends Component {
  constructor(props) {
    super(props);
  }

  createChart() {
    let ctx = document.getElementById('barChart').getContext('2d');
    let visualizer = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.props.data.map((item) => {
          return item.color;
        }),
        datasets: [
          {
            label: '',
            data: this.props.data.map((item) => {
              return item.num;
            }),
            backgroundColor: this.props.data.map((item) => {
              return item.backgroundColor;
            }),
            borderColor: this.props.data.map((item) => {
              return item.borderColor;
            }),
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        events: null,
      },
    });
  }

  componentDidMount() {
    this.createChart();
  }

  componentDidUpdate() {
    this.createChart();
  }

  render() {
    return (
      <div>
        <div></div>
        <canvas id="barChart" />
      </div>
    );
  }
}

export default BarChart;
