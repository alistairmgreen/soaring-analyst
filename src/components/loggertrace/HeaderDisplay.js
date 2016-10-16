import React, { PropTypes } from 'react';
import { List } from 'immutable';
import moment from 'moment';
import HeaderRow from './HeaderRow';

function HeaderDisplay(props) {
  let headers = props.headers;

  return (
    <table>
      <tbody>
        <HeaderRow key={0} name="Flight date" value={props.flightDate.format('LLLL Z')} />
        {headers.map((h, index) => <HeaderRow key={index + 1} name={h.get('name')} value={h.get('value').toString()} />)}
      </tbody>
    </table>
  );
}

HeaderDisplay.propTypes = {
  headers: PropTypes.instanceOf(List).isRequired,
  flightDate: PropTypes.instanceOf(moment).isRequired
};

export default HeaderDisplay;
