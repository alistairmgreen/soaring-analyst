import React, { PropTypes } from 'react';
import { List } from 'immutable';
import moment from 'moment';
import LineChart from './LineChart';

class Barogram extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (nextProps.timestamps !== this.props.timestamps) ||
      (nextProps.altitudes !== this.props.altitudes) ||
      (nextProps.currentTime !== this.props.currentTime);
  }

  createDataArray() {
    let data = [];
    const { timestamps, altitudes } = this.props;
    const nPoints = timestamps.count();

    for (let j = 0; j < nPoints; j++) {
      data.push({ x: timestamps.get(j), y: altitudes.get(j) });
    }

    return data;
  }

  render() {
    const dataSets = [{
      data: this.createDataArray(),
      pointRadius: 0,
      borderColor: '#0000FF',
      borderWidth: 1,
      fill: false
    }];

    const timeIndicator = [{
      type: 'line',
      mode: 'vertical',
      scaleID: 'x-axis-0',
      value: this.props.currentTime,
      borderColor: 'red',
      borderWidth: 1
    }];

    const xAxis = {
      type: 'time',
      time: {
        displayFormats: {
          hour: 'HH:mm',
          minute: 'HH:mm'
        },
        tooltipFormat: 'HH:mm:ss'
      },
      position: 'bottom'
    };

    return (
      <LineChart dataSets={dataSets}
        annotations={timeIndicator}
        hoverMode="x-axis"
        onPlotClick={this.props.onPlotClick}
        xAxis={xAxis} />
    );
  }
}

Barogram.propTypes = {
  timestamps: PropTypes.instanceOf(List).isRequired,
  altitudes: PropTypes.instanceOf(List).isRequired,
  currentTime: PropTypes.instanceOf(moment).isRequired,
  onPlotClick: PropTypes.func
};

export default Barogram;
