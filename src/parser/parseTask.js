import moment from 'moment';
import parseLatitudeLongitude from './parseLatitudeLongitude';

function parseWaypoint(line) {
  let waypoint = parseLatitudeLongitude(line.substring(1, 18));
  waypoint.name = line.substring(18);
  return waypoint;
}


export default function parseTask(taskLines) {
  // First line = date of declaration.
  // Second line = place of takeoff (usually 0 degrees N, 0 degrees E).
  // Last line = place of landing (usually 0 degrees N, 0 degrees E).

  let task = {
    declared: false,
    waypoints: []
  };

  const numberOfLines = taskLines.length;

  if (numberOfLines > 3) {
    task.declared = true;
    task.declarationDate = moment.utc(taskLines[0].substring(1, 13), "DDMMYYHHmmss Z");

    task.waypoints = taskLines
      .slice(2, numberOfLines - 1)
      .map(line => parseWaypoint(line));
  }

  return task;
}
