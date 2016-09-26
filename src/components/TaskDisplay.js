import React, {PropTypes} from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

function TaskDisplay(props) {
  const task = props.task;
  const lastIndex = task.length - 1;

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
          {tp.name}
        </ListGroupItem>
      ) }
    </ListGroup>
  );
}

TaskDisplay.propTypes = {
  task: PropTypes.array.isRequired
};

export default TaskDisplay;
