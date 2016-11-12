import React, {PropTypes} from 'react';
import { List } from 'immutable';
import LoggerTraceDisplay from './loggertrace/LoggerTraceDisplay';
import StartupBanner from './loggertrace/StartupBanner';
import LoadingDialog from './loggertrace/LoadingDialog';
import * as keys from '../constants/StateKeys';

class IgcViewer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let trace = this.props.loggerTrace;

    if(trace.get(keys.FILE_LOAD_IN_PROGRESS)) {
      return (
        <LoadingDialog fileName={trace.get(keys.FILE_NAME)} />
      );
    }

    if(trace.get(keys.FILE_LOADED)) {
      return (
        <LoggerTraceDisplay loggerTrace={trace} timestamps={this.props.timestamps} actions={this.props.actions} />
      );
    }

    let errorMessage = this.props.loggerTrace.get(keys.ERROR_MESSAGE);

    return (
      <StartupBanner loadFile={this.props.actions.loadFile} errorMessage={errorMessage} />
    );
  }
}

IgcViewer.propTypes = {
  task: PropTypes.object,
  loggerTrace: PropTypes.object,
  timestamps: PropTypes.instanceOf(List).isRequired,
  actions: PropTypes.objectOf(PropTypes.func)
};

export default IgcViewer;
