import React, { PropTypes } from 'react';

function HeaderRow(props) {
  return (
    <tr>
      <th>{props.name}</th>
      <td>{props.value}</td>
    </tr>
  );
}

HeaderRow.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default HeaderRow;
