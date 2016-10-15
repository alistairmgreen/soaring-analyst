import IGCException from './IGCException';

const MANUFACTURERS = {
  'ACT': 'Aircotec',
  'CAM': 'Cambridge Aero Instruments',
  'CNI': 'ClearNav Instruments',
  'DSX': 'Data Swan',
  'EWA': 'EW Avionics',
  'FIL': 'Filser',
  'FLA': 'FLARM',
  'FLY': 'Flytech',
  'GCS': 'Garrecht',
  'IMI': 'IMI Gliding Equipment',
  'LGS': 'Logstream',
  'LXN': 'LX Navigation',
  'LXV': 'LXNAV d.o.o.',
  'NAV': 'Naviter',
  'NTE': 'New Technologies s.r.l.',
  'NKL': 'Nielsen Kellerman',
  'PES': 'Peschges',
  'PFE': 'PressFinish Electronics',
  'PRT': 'Print Technik',
  'SCH': 'Scheffel',
  'SDI': 'Streamline Data Instruments',
  'TRI': 'Triadis Engineering GmbH',
  'WES': 'Westerboer',
  'XCS': 'XCSoar',
  'ZAN': 'Zander'
};

export default function parseManufacturer(manufacturerHeaderLine) {
  // The first line of an IGC file should begin with 'A' followed by
  // a 3-character manufacturer Id and a 3-character serial number.
  if (!(/^A[\w]{6}/).test(manufacturerHeaderLine)) {
    throw new IGCException('This file does not contain a valid manufacturer and logger serial number.');
  }

  const manufacturerCode = manufacturerHeaderLine.substring(1, 4);
  const serial = manufacturerHeaderLine.substring(4, 7);

  return {
    manufacturer: MANUFACTURERS[manufacturerCode] || manufacturerCode,
    serial
  };
}

