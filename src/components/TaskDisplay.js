import React, {PropTypes} from 'react';
import { Glyphicon, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

function TaskDisplay(props) {
  const task = props.task;
  const lastIndex = task.count() - 1;
  const deleteTurnpoint = props.deleteTurnpoint;

  function getLabel(index) {
    switch (index) {
      case 0:
        return "Start";

      case lastIndex:
        return "Finish";

      default:
        return `Turnpoint ${index}`;
    }
  }

  return (
    <ListGroup>
      {task.map((tp, index) =>
        <ListGroupItem key={index} header={getLabel(index)}>
          {tp.get("name") }
          &nbsp;&nbsp;
          <Button bsStyle="danger"
            bsSize="small"
            onClick={() => { deleteTurnpoint(index); }}>
            <Glyphicon bsClass="fa" glyph="trash" />&nbsp; &nbsp; Delete
          </Button>
        </ListGroupItem>
      ) }
    </ListGroup>
  );
}

TaskDisplay.propTypes = {
  task: PropTypes.object.isRequired,
  deleteTurnpoint: PropTypes.func.isRequired
};

export default TaskDisplay;
