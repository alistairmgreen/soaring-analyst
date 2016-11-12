import React, { PropTypes } from 'react';
import { List } from 'immutable';
import moment from 'moment';
import LineChart from './LineChart';

class Barogram extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      dataArray: this.createDataArray(this.props.timestamps, this.props.altitudes)
    };
  }

  componentWillReceiveProps(nextProps) {
    const { timestamps, altitudes } = nextProps;
    if ((timestamps !== this.props.timestamps) ||
      (altitudes !== this.props.altitudes)) {
      this.setState({
        dataArray: this.createDataArray(timestamps, altitudes)
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.timestamps !== this.props.timestamps) ||
      (nextProps.altitudes !== this.props.altitudes) ||
      (nextProps.currentTime !== this.props.currentTime);
  }

  createDataArray(timestamps, altitudes) {
    let data = [];
    const nPoints = timestamps.count();

    for (let j = 0; j < nPoints; j++) {
      data.push({ x: timestamps.get(j), y: altitudes.get(j) });
    }

    return data;
  }

  render() {
    const dataSets = [{
      data: this.state.dataArray,
      pointRadius: 0,
      borderColor: '#0000FF',
      borderWidth: 1,
      fill: false
    }];

    const crosshair = [{
      type: 'line',
      mode: 'vertical',
      scaleID: 'x-axis-0',
      value: this.props.currentTime,
      borderColor: 'red',
      borderWidth: 1
    }, {
      type: 'line',
      mode: 'horizontal',
      scaleID: 'y-axis-0',
      value: this.props.currentAltitude,
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
      position: 'bottom',
      scaleLabel: {
        display: true,
        labelString: this.props.timeZoneName
      }
    };

    const yAxis = {
      scaleLabel: {
        display: true,
        labelString: 'GPS Altitude / Metres'
      }
    };

    return (
      <LineChart dataSets={dataSets}
        annotations={crosshair}
        hoverMode="x-axis"
        onPlotClick={this.props.onPlotClick}
        xAxis={xAxis}
        yAxis={yAxis} />
    );
  }
}

Barogram.propTypes = {
  timestamps: PropTypes.instanceOf(List).isRequired,
  altitudes: PropTypes.instanceOf(List).isRequired,
  currentTime: PropTypes.instanceOf(moment).isRequired,
  currentAltitude: PropTypes.number.isRequired,
  timeZoneName: PropTypes.string.isRequired,
  onPlotClick: PropTypes.func
};

export default Barogram;
