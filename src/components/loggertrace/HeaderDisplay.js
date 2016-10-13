import React, { PropTypes } from 'react';
import { List } from 'immutable';
import HeaderRow from './HeaderRow';

function HeaderDisplay(props) {
  let headers = props.headers;

  return (
    <table>
      <tbody>
        {headers.map((h, index) => <HeaderRow key={index} name={h.get('name')} value={h.get('value').toString()} />)}
      </tbody>
    </table>
  );
}

HeaderDisplay.propTypes = {
  headers: PropTypes.instanceOf(List).isRequired
};

export default HeaderDisplay;
