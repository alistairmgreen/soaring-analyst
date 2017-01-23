export function parseHeaderLine(headerRecord) {
  const headerSubtypes = {
    'PLT': 'Pilot',
    'CM2': 'Crew member 2',
    'GTY': 'Glider type',
    'GID': 'Glider ID',
    'DTM': 'GPS datum',
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
    .filter(line => line.charAt(0) === 'H')
    .map(h => parseHeaderLine(h))
    .filter(h => h.name.length > 0);
}
