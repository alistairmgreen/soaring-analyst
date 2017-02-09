import React, { PropTypes } from 'react';

class Axis extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
     if (this.props.chart) {
      this.updateChart();
    }
  }

  shouldComponentUpdate(nextProps) {
    return !(
      (this.props.axis === nextProps.axis) &&
      (this.props.chart === nextProps.chart) &&
      (this.props.label === nextProps.label) &&
      (this.props.tickFormatter === nextProps.tickFormatter) &&
      (this.props.ticks === nextProps.ticks)
    );
  }

  componentDidUpdate() {
    if (this.props.chart) {
      this.updateChart();
    }
  }

  updateChart() {
    const {
      axis,
      index,
      chart,
      label,
      tickFormatter,
      ticks
    } = this.props;

    const chartOptions = chart.getOptions();
    const axisOptions = chartOptions[`${axis}axes`][index];
    Object.assign(axisOptions, {
      axisLabel: label,
      tickFormatter: tickFormatter,
      ticks: ticks
    });
    chart.setupGrid();
    chart.draw();
  }

  render() {
    return false;
  }
}

Axis.propTypes = {
  axis: PropTypes.oneOf(['x', 'y']).isRequired,
  index: PropTypes.number,
  chart: PropTypes.object,
  label: PropTypes.string,
  tickFormatter: PropTypes.func,
  ticks: PropTypes.func
};

Axis.defaultProps = {
  index: 0,
  label: '',
  chart: null,
  tickFormatter: null,
  ticks: null
};

export default Axis;
