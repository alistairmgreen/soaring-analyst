import IGCException from './IGCException';
import parseManufacturer from './parseManufacturer';

export default function parseIGC(igcFile) {
  let igcLines = igcFile.split('\n');

  if (igcLines.length < 2) {
    throw new IGCException('This does not appear to be a valid IGC file.');
  }

  let firstLine = igcLines.shift();

  let manufacturerAndSerialNumber = parseManufacturer(firstLine);
}
