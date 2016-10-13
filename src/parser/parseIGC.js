import { fromJS } from 'immutable';
import IGCException from './IGCException';
import parseManufacturer from './parseManufacturer';
import parseHeaders from './parseHeaders';

export default function parseIGC(igcFile) {
  let igcLines = igcFile.split('\n');

  if (igcLines.length < 2) {
    throw new IGCException('This does not appear to be a valid IGC file.');
  }

  let firstLine = igcLines.shift();

  let manufacturerAndSerialNumber = parseManufacturer(firstLine);

  let headers = [
    {
      name: 'Logger manufacturer',
      value: manufacturerAndSerialNumber.manufacturer
    },
    {
      name: 'Logger serial number',
      value: manufacturerAndSerialNumber.serial
    }
  ];

  headers = headers.concat(parseHeaders(igcLines));

  return fromJS({
    headers
  });
}
