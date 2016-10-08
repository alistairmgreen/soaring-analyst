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
    return (
      <FormControl type="file" accept=".igc" onChange={this.onFileChange} />
    );
  }
}

IGCFilePicker.propTypes = {
  onChooseFile: PropTypes.func.isRequired
};

export default IGCFilePicker;
