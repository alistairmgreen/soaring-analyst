import React, { PropTypes } from 'react';
import $ from 'jquery';
import './flot/jquery.flot';
import './flot/jquery.flot.resize';
import './flot/jquery.flot.axislabels';

class FlotChart extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.plotGraph();
  }

  componentDidUpdate(prevProps) {
    if (this.props.options !== prevProps.options) {
      this.plotGraph();
    }
    else if (this.props.data !== prevProps.data) {
      this.plot.setData(this.props.data);
      this.plot.setupGrid();
      this.plot.draw();
    }
  }

  plotGraph() {
    this.plot = $.plot(this.plotDiv, this.props.data, this.props.options);
  }

  render() {
    return (
      <div style={{ width: '100%', height: '50vh' }} ref={x => { this.plotDiv = x; }} />
    );
  }
}

FlotChart.propTypes = {
  data: PropTypes.array.isRequired,
  options: PropTypes.object
};

FlotChart.defaultProps = {
  options: {}
};

export default FlotChart;
