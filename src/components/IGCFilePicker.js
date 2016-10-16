import React, {PropTypes} from 'react';
import { FormControl } from 'react-bootstrap';

class IGCFilePicker extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onFileChange = this.onFileChange.bind(this);
  }

  onFileChange(event) {
    let file = event.target.files[0];
    if (file) {
      this.props.onChooseFile(file);
    }
  }

  render() {
    let styling = this.props.hidden ? { display: "none" } : {};
    return (
      <FormControl type="file" accept=".igc" onChange={this.onFileChange} style={styling} />
    );
  }
}

IGCFilePicker.propTypes = {
  onChooseFile: PropTypes.func.isRequired,
  hidden: PropTypes.bool
};

export default IGCFilePicker;
