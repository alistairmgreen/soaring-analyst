import IGCException from './IGCException';

const MANUFACTURERS = {
  'GCS': 'Garrecht',
  'CAM': 'Cambridge Aero Instruments',
  'DSX': 'Data Swan',
  'EWA': 'EW Avionics',
  'FIL': 'Filser',
  'FLA': 'FLARM',
  'SCH': 'Scheffel',
  'ACT': 'Aircotec',
  'NKL': 'Nielsen Kellerman',
  'LXN': 'LX Navigation',
  'IMI': 'IMI Gliding Equipment',
  'NTE': 'New Technologies s.r.l.',
  'PES': 'Peschges',
  'PRT': 'Print Technik',
  'SDI': 'Streamline Data Instruments',
  'TRI': 'Triadis Engineering GmbH',
  'LXV': 'LXNAV d.o.o.',
  'WES': 'Westerboer',
  'XCS': 'XCSoar',
  'ZAN': 'Zander'
};

export default function parseManufacturer(manufacturerHeaderLine) {
  // The first line should begin with 'A' followed by
  // a 3-character manufacturer Id and a 3-character serial number.
  if (!(/^A[\w]{6}/).test(manufacturerHeaderLine)) {
    throw new IGCException('This file does not contain a valid manufacturer and logger serial number.');
  }

  const manufacturerCode = manufacturerHeaderLine.substring(1, 4);
  const serial = manufacturerHeaderLine.substring(4, 7);

  return {
    manufacturer: MANUFACTURERS[manufacturerCode] || 'Unknown',
    serial
  };
}

