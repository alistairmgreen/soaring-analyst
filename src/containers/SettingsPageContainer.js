import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import SettingsPage from '../components/pages/SettingsPage';
import { setAltitudeSource, setAltitudeUnit } from '../actions/actions';

function SettingsPageContainer(props) {
  return (
    <SettingsPage altitude={props.altitude}
      setAltitudeSource={props.setAltitudeSource}
      setAltitudeUnit={props.setAltitudeUnit} />
  );
}

SettingsPageContainer.propTypes = {
  altitude: PropTypes.instanceOf(Map).isRequired,
  setAltitudeSource: PropTypes.func.isRequired,
  setAltitudeUnit: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    altitude: state.altitude
  };
}

export default connect(mapStateToProps, { setAltitudeSource, setAltitudeUnit })(SettingsPageContainer);
