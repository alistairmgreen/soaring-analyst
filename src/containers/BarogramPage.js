import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Timeline from '../components/Timeline';
import * as actionCreators from '../actions/actions';
import * as keys from '../constants/StateKeys';

BarogramPage.propTypes = {
  loggerTrace: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function BarogramPage(props) {
    const trace = props.loggerTrace;

    return(
        <div>
            <Timeline timeIndex={trace.get(keys.TIME_INDEX)}
                      max={trace.get(keys.MAX_TIME_INDEX)}
                      currentTime={trace.get(keys.CURRENT_TIMESTAMP)}
                      currentAltitude={trace.get(keys.CURRENT_ALTITUDE)}
                      setTimeIndex={props.actions.setTimeIndex} />
        </div>
    );
}

function mapStateToProps(state) {
  return {
    loggerTrace: state.loggerTrace
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BarogramPage);
