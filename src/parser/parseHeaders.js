import moment from 'moment';

function parseDateHeader(dateRecord) {
  let day = parseInt(dateRecord.substring(5, 7), 10);

  // Months are zero-indexed in JavaScript, so January = 0 and February = 1.
  let month = parseInt(dateRecord.substring(7, 9), 10) - 1;

  // IGC files contain a two-digit year. Assume 21st century
  // unless that would put the flight date in the future.
  let year = parseInt(dateRecord.substring(9, 11), 10) + 2000;

  if (year > moment.utc().year()) {
    year -= 100;
  }

  return {
    name: 'Date',
    value: moment.utc([year, month, day])
  };
}

function parseHeaderLine(headerRecord) {
  const headerSubtypes = {
    'PLT': 'Pilot',
    'CM2': 'Crew member 2',
    'GTY': 'Glider type',
    'GID': 'Glider ID',
    'DTM': 'GPS Datum',
    'RFW': 'Firmware version',
    'RHW': 'Hardware version',
    'FTY': 'Flight recorder type',
    'GPS': 'GPS',
    'PRS': 'Pressure sensor',
    'FRS': 'Security suspect, use validation program',
    'CID': 'Competition ID',
    'CCL': 'Competition class'
  };

  let header = {
    name: '',
    value: ''
  };

  let headerCode = headerRecord.substring(2, 5);

  if (headerCode === 'DTE') {
    return parseDateHeader(headerRecord);
  }

  if (headerSubtypes.hasOwnProperty(headerCode)) {
    header.name = headerSubtypes[headerCode];

    let colonIndex = headerRecord.indexOf(':');
    if (colonIndex !== -1) {
      header.value = headerRecord.substring(colonIndex + 1);
    }
  }

  return header;
}

export default function parseHeaders(igcLines) {
  return igcLines
    .filter(line => line.startsWith('H'))
    .map(h => parseHeaderLine(h))
    .filter(h => h.name.length > 0);
}
