import React, { PropTypes } from 'react';
import { List } from 'immutable';
import moment from 'moment';
import HeaderDisplay from '../loggertrace/HeaderDisplay';

class FlightInformationPage extends React.Component {
  render() {
    return (
      <div>
        <h1> {this.props.fileName} </h1>

        <HeaderDisplay headers={this.props.headers} flightDate={this.props.flightDate} timezone={this.props.timezone} />
      </div>
    );
  }
}

FlightInformationPage.propTypes = {
  fileName: PropTypes.string.isRequired,
  headers: PropTypes.instanceOf(List).isRequired,
  flightDate: PropTypes.instanceOf(moment).isRequired,
  timezone: PropTypes.string.isRequired
};

export default FlightInformationPage;
