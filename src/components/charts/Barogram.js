import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import LineChart from './LineChart';
import getBarogramData from '../../selectors/getBarogramData';
import { getCurrentAltitude, getAltitudeUnit, getAltitudeSource } from '../../selectors/altitudeSelectors';
import { getCurrentTime } from '../../selectors/timeSelectors';
import { setTimeIndex } from '../../actions/actions';

function Barogram(props) {
  const dataSets = [{
    data: props.data,
    pointRadius: 0,
    borderColor: '#0000FF',
    borderWidth: 1,
    fill: false
  }];

  const crosshair = [{
    type: 'line',
    mode: 'vertical',
    scaleID: 'x-axis-0',
    value: props.currentTime,
    borderColor: 'red',
    borderWidth: 1
  }, {
    type: 'line',
    mode: 'horizontal',
    scaleID: 'y-axis-0',
    value: props.currentAltitude,
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

  const { altitudeUnit, altitudeSource, timeZoneName, onPlotClick } = props;

  return (
    <LineChart dataSets={dataSets}
      annotations={crosshair}
      hoverMode="x-axis"
      onPlotClick={onPlotClick}
      xAxis={xAxis}
      xLabel={timeZoneName}
      yLabel={`${altitudeSource} Altitude / ${altitudeUnit}`} />
  );
}

Barogram.propTypes = {
  data: PropTypes.array.isRequired,
  altitudeUnit: PropTypes.string.isRequired,
  altitudeSource: PropTypes.string.isRequired,
  currentTime: PropTypes.instanceOf(moment).isRequired,
  currentAltitude: PropTypes.number.isRequired,
  timeZoneName: PropTypes.string.isRequired,
  onPlotClick: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    data: getBarogramData(state),
    altitudeUnit: getAltitudeUnit(state),
    altitudeSource: getAltitudeSource(state),
    currentTime: getCurrentTime(state),
    currentAltitude: getCurrentAltitude(state),
    timeZoneName: state.timeZone
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onPlotClick: t => dispatch(setTimeIndex(t))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Barogram);
