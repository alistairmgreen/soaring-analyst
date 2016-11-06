import React, { PropTypes } from 'react';
import Chart from 'chart.js';
import 'chartjs-plugin-annotation';
import moment from 'moment';

class LineChart extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onCanvasClick = this.onCanvasClick.bind(this);
  }

  componentDidMount() {
    const { data, currentTime } = this.props;
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
              },
              tooltipFormat: 'HH:mm:ss'
            },
            position: 'bottom'
          }],
        },

        legend: { display: false },

        maintainAspectRatio: false,

        animation: false,

        annotation: {
          annotations: [{
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-axis-0',
            value: currentTime,
            borderColor: 'red',
            borderWidth: 1
          }]
        },

        hover: {
          mode: 'x-axis'
        },

        onClick: this.onCanvasClick
      }
    });
  }

  componentDidUpdate() {
    const chart = this.chart;
    chart.data.datasets[0].data = this.props.data;
    chart.options.annotation.annotations[0].value = this.props.currentTime;
    chart.update();
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  onCanvasClick(event, elements) {
    let chartElement = elements[0];
    if (chartElement && this.props.onPlotClick){
      this.props.onPlotClick(chartElement._index);
    }
  }

  render() {
    return (
      <div style={{ width: '100%', height: '50vh' }}>
        <canvas ref={c => { this.chartCanvas = c; }}
          style={{ cursor: 'crosshair' }}/>
      </div>
    );
  }
}

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  currentTime: PropTypes.instanceOf(moment).isRequired,
  onPlotClick: PropTypes.func
};

export default LineChart;
