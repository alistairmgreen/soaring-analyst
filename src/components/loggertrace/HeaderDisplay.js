import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import { List } from 'immutable';
import moment from 'moment';
import HeaderRow from './HeaderRow';

function HeaderDisplay(props) {
  let headers = props.headers;

  const rows = headers.map((h, index) => {
    const name = h.get('name');
    const value = h.get('value').toString();

    return (
      <HeaderRow key={`${name}${index}`} name={name} value={value} />
    );
  });

  const { flightDate, timezone } = props;

  return (
    <Table striped>
      <tbody>
        <HeaderRow key="Flight date" name="Flight date" value={flightDate.format('dddd, LL')} />
        <HeaderRow key="Timezone" name="Time zone" value={`${timezone} (UTC ${flightDate.format('Z')})`} />
        {rows}
      </tbody>
    </Table>
  );
}

HeaderDisplay.propTypes = {
  headers: PropTypes.instanceOf(List).isRequired,
  flightDate: PropTypes.instanceOf(moment).isRequired,
  timezone: PropTypes.string.isRequired
};

export default HeaderDisplay;
