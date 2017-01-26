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
    this.chart = $.plot(
      this.plotDiv,
      this.props.data, {
        axisLabels: {
          show: true
        }
      });

    this.forceUpdate(); // Re-render children, passing in a reference to the chart.
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.chart.setData(this.props.data);
      this.chart.setupGrid();
      this.chart.draw();
    }
  }

  renderChildren() {
    const { children } = this.props;
    if (children) {
      return React.Children.map(children,
        c => React.cloneElement(c, { chart: this.chart }));
    }
  }

  render() {
    return (
      <div style={{ width: '100%', height: '50vh' }} ref={x => { this.plotDiv = x; }}>
        {this.renderChildren()}
      </div>
    );
  }
}

FlotChart.propTypes = {
  data: PropTypes.array.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default FlotChart;
