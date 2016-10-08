import React, {PropTypes} from 'react';
import { Modal } from 'react-bootstrap';

function LoadingDialog(props) {
  return (
    <div className="static-modal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Loading {props.fileName}...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{"text-align": "center"}}>
            <span className="fa fa-spinner fa-pulse fa-5x fa-fw" />
          </div>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

LoadingDialog.propTypes = {
  fileName: PropTypes.string.isRequired
};

export default LoadingDialog;
