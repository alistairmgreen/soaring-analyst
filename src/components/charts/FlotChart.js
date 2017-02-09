import React, { PropTypes } from 'react';
import $ from 'jquery-slim';
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
        },

        grid: {
          clickable: true,
          autoHighlight: false
        }
      });

    this.attachClickHandler();

    this.forceUpdate(); // Re-render children, passing in a reference to the chart.
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.chart.setData(this.props.data);
      this.chart.setupGrid();
      this.chart.draw();
    }

    if (this.props.onPlotClick !== prevProps.onPlotClick) {
      this.attachClickHandler();
    }
  }

  componentWillUnmount() {
    this.plotDiv.off();
    this.chart.destroy();
  }

  attachClickHandler() {
    if(this.props.onPlotClick) {
      this.plotDiv
        .off('plotclick')
        .on('plotclick', (event, position, item) => {
          if (item) {
            this.props.onPlotClick(item.dataIndex);
          }
        });

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
      <div style={{ width: '100%', height: '50vh', cursor: 'crosshair' }} ref={x => { this.plotDiv = $(x); }}>
        {this.renderChildren()}
      </div>
    );
  }
}

FlotChart.propTypes = {
  data: PropTypes.array.isRequired,
  onPlotClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default FlotChart;
