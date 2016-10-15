const DEGREES_SYMBOL = '\u00B0';
const MINUTES_SYMBOL = "'";

function parseLatitude(latitude) {
   return {
    degrees: parseInt(latitude.substring(0, 2), 10),
    minutes: parseInt(latitude.substring(2, 7), 10) / 1000.0,
    direction: latitude[latitude.length - 1]
  };
}

function parseLongitude(longitude) {
  return {
    degrees: parseInt(longitude.substring(0, 3), 10),
    minutes: parseInt(longitude.substring(3, 8), 10) / 1000.0,
    direction: longitude[longitude.length - 1]
  };
}

function toDecimalDegrees(degreesAndMinutes) {
  let direction = degreesAndMinutes.direction.toUpperCase();
  let sign = (direction === 'N' || direction === 'E') ? 1 : -1;

  return sign * (degreesAndMinutes.degrees + degreesAndMinutes.minutes / 60.0);
}

function formatDegreesMinutes(degMin) {
  let deg = degMin.degrees.toFixed(0);
  let min = degMin.minutes.toFixed(3);
  let direction = degMin.direction;

  return deg + DEGREES_SYMBOL + min + MINUTES_SYMBOL + direction;
}

export default function parseLatitudeLongitude(latLonString) {
  let latitude = parseLatitude(latLonString.substring(0, 8));
  let longitude = parseLongitude(latLonString.substring(8));

  return {
    lat: toDecimalDegrees(latitude),
    lng: toDecimalDegrees(longitude),
    toString: () => formatDegreesMinutes(latitude) + ", " + formatDegreesMinutes(longitude)
  };
}
