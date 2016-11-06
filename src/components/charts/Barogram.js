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
    const data = this.createDataArray();

    return (
      <LineChart data={data} currentTime={this.props.currentTime} onPlotClick={this.props.onPlotClick} />
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
