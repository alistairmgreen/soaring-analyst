import React, {PropTypes} from 'react';
import LoggerTraceDisplay from './loggertrace/LoggerTraceDisplay';
import StartupBanner from './loggertrace/StartupBanner';
import LoadingDialog from './loggertrace/LoadingDialog';

class IgcViewer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let trace = this.props.loggerTrace;

    if(trace.get('fileLoadInProgress')) {
      return (
        <LoadingDialog fileName={trace.get('fileName')} />
      );
    }

    if(trace.get('fileLoaded')) {
      return (
        <LoggerTraceDisplay loggerTrace={trace} actions={this.props.actions} />
      );
    }

    let errorMessage = this.props.loggerTrace.get('errorMessage');

    return (
      <StartupBanner loadFile={this.props.actions.loadFile} errorMessage={errorMessage} />
    );
  }
}

IgcViewer.propTypes = {
  task: PropTypes.object,
  loggerTrace: PropTypes.object,
  actions: PropTypes.objectOf(PropTypes.func)
};

export default IgcViewer;
