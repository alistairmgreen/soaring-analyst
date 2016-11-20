import React, { PropTypes } from 'react';
import { Jumbotron } from 'react-bootstrap';

function LoadingDialog(props) {
  return (
    <div className="static-modal">
      <Jumbotron style={{ textAlign: "center" }}>
        <h1>Loading {props.fileName}...</h1>
        <p>
          <span className="fa fa-spinner fa-pulse fa-5x fa-fw" />
        </p>
      </Jumbotron>
    </div>
  );
}

LoadingDialog.propTypes = {
  fileName: PropTypes.string.isRequired
};

export default LoadingDialog;
