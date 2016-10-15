import moment from 'moment';
import parseLatitudeLongitude from './parseLatitudeLongitude';

export function splitBRecord(record){
  return {
    utcTime: record.substring(1, 7),
    latitudeLongitude: record.substring(7, 24),
    validity: record.charAt(24),
    pressureAltitude: record.substring(25, 30),
    gpsAltitude: record.substring(30, 35)
  };
}

export default function parseFixes(igcLines) {
  let dateString = igcLines.dateHeader.substring(5);
  let takeoffMoment;

  return igcLines.fixes.map((line, index) => {
    let parts = splitBRecord(line);
    let timestamp = moment.utc(dateString + parts.utcTime, "DDMMYYHHmmss Z");
    if (index == 0) {
      takeoffMoment = timestamp;
    }
    else {
      if(timestamp.isBefore(takeoffMoment)) {
        // We have crossed through midnight (UTC), so the date is now one day later
        // than the date declared in the header.
        timestamp.add(1, "days");
      }
    }

    return {
      timestamp,
      pressureAltitude: parseInt(parts.pressureAltitude, 10),
      gpsAltitude: parseInt(parts.gpsAltitude, 10),
      validGpsAltitude: parts.validity === 'A',
      position: parseLatitudeLongitude(parts.latitudeLongitude)
    };
  });
}
