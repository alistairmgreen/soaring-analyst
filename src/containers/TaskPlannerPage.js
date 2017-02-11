import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import TaskEditor from '../components/TaskEditor';
import { getWaypoints, getTaskBounds } from '../selectors/taskSelectors';
import {deleteTurnpoint} from '../actions/actions';

function TaskPlannerPage(props) {
  return (
    <div>
      <TaskEditor {...props} />
    </div>
  );
}

TaskPlannerPage.propTypes = {
  task: PropTypes.object.isRequired,
  defaultMapLocation: PropTypes.object.isRequired,
  deleteTurnpoint: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    task: getWaypoints(state),
    defaultMapLocation: getTaskBounds(state),
    googlemaps: state.googleMapsApi
  };
}

export default connect(mapStateToProps, { deleteTurnpoint })(TaskPlannerPage);
