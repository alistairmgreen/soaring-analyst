import React, { PropTypes } from 'react';
import Chart from 'chart.js';

class LineChart extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const { data } = this.props;
    this.chart = new Chart(this.chartCanvas, {
      type: 'line',
      data: {
        datasets: [{
          data: data,
          pointRadius: 0,
          borderColor: '#0000FF',
          borderWidth: 1,
          fill: false
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              displayFormats: {
                hour: 'HH:mm',
                minute: 'HH:mm'
              }
            },
            position: 'bottom'
          }]
        },
        legend: { display: false },
        maintainAspectRatio: false,
        animation: false
      }
    });
  }

  componentDidUpdate() {
    this.chart.data.datasets[0].data = this.props.data;
    this.chart.update();
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return (
      <div style={{ width: '100%', height: '50vh' }}>
        <canvas ref={c => { this.chartCanvas = c; }}/>
      </div>
    );
  }
}

LineChart.propTypes = {
  data: PropTypes.array.isRequired
};

export default LineChart;
