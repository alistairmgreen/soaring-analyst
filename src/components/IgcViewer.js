import React, {PropTypes} from 'react';
import StartupBanner from './loggertrace/StartupBanner';

class IgcViewer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <StartupBanner />
    );
  }
}

IgcViewer.propTypes = {
  task: PropTypes.object,
  actions: PropTypes.arrayOf(PropTypes.func)
};

export default IgcViewer;
