import splitLines from './splitLines';
import parseManufacturer from './parseManufacturer';
import parseHeaders from './parseHeaders';
import parseTask from './parseTask';
import parseFixes from './parseFixes';

export default function parseIGC(igcFile) {
  let igcLines = splitLines(igcFile);

  let manufacturerAndSerialNumber = parseManufacturer(igcLines.serialNumber);

  let headers = [
    {
      name: 'Logger manufacturer',
      value: manufacturerAndSerialNumber.manufacturer
    },
    {
      name: 'Logger serial number',
      value: manufacturerAndSerialNumber.serial
    }
  ].concat(parseHeaders(igcLines.headers));

  return {
    headers,
    task: parseTask(igcLines.task),
    fixes: parseFixes(igcLines)
  };
}
