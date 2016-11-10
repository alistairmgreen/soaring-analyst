import React, { PropTypes } from 'react';
import Chart from 'chart.js';
import 'chartjs-plugin-annotation';

class LineChart extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onCanvasClick = this.onCanvasClick.bind(this);
  }

  componentDidMount() {
    this.chart = new Chart(this.chartCanvas,
      Object.assign({},
        this.getChartSettings(), {
          data: { datasets: this.props.dataSets }
        }));
  }

  componentDidUpdate() {
    const chart = this.chart;
    chart.data.datasets = this.props.dataSets;
    chart.options.annotation.annotations = this.props.annotations;
    chart.update();
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  getChartSettings() {
    const defaults = {
      type: 'line',

      options: {
        animation: this.props.animate,

        annotation: {
          annotations: this.props.annotations
        },

        hover: { mode: this.props.hoverMode },

        legend: { display: this.props.showLegend },

        maintainAspectRatio: this.props.maintainAspectRatio,

        scales: {
          xAxes: [this.props.xAxis],
          yAxes: [this.props.yAxis]
        },

        onClick: this.onCanvasClick
      }
    };

    return Object.assign({}, defaults, this.props.settings);
  }

  onCanvasClick(event, elements) {
    let chartElement = elements[0];
    if (chartElement && this.props.onPlotClick) {
      this.props.onPlotClick(chartElement._index);
    }
  }

  render() {
    return (
      <div style={{ width: '100%', height: '50vh' }}>
        <canvas ref={c => { this.chartCanvas = c; }}
          style={{ cursor: 'crosshair' }} />
      </div>
    );
  }
}

LineChart.propTypes = {
  animate: PropTypes.bool,
  annotations: PropTypes.array,
  dataSets: PropTypes.arrayOf(PropTypes.object).isRequired,
  hoverMode: PropTypes.string,
  maintainAspectRatio: PropTypes.bool,
  onPlotClick: PropTypes.func,
  settings: PropTypes.object,
  showLegend: PropTypes.bool,
  xAxis: PropTypes.object.isRequired,
  yAxis: PropTypes.object
};

LineChart.defaultProps = {
  annotations: [],
  hoverMode: 'single',
  settings: {},
  showLegend: false,
  maintainAspectRatio: false,
  animate: false,
  yAxis: {}
};

export default LineChart;
