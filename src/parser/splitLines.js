export default function splitLines(igcString) {
  let lines = igcString.split(/\r?\n/);
  let serialNumber = lines.shift();
  let dateHeader = "";
  let headers = [], task = [], fixes = [];

  lines.forEach(line => {
    let recordType = line.charAt(0);
    switch (recordType) {
      case 'H':
        if (/^H[FO]DTE\d{6}$/.test(line)) {
          dateHeader = line;
        }
        else {
          headers.push(line);
        }
        break;

      case 'C':
        task.push(line);
        break;

      case 'B':
        fixes.push(line);
        break;
    }
  });

  return {
    serialNumber,
    dateHeader,
    headers,
    task,
    fixes
  };
}
