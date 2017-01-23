import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import { List } from 'immutable';
import moment from 'moment';
import HeaderRow from './HeaderRow';

function HeaderDisplay(props) {
  const { headers, flightDate, timezone } = props;

  const rows = headers.map((h, index) =>
      <HeaderRow key={`${h.name}${index}`} name={h.name} value={h.value} />
  );

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
