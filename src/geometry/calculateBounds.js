export default function calculateBounds(points) {
  const first = points[0];
  return points.reduce((previous, current) => {
    return {
      north: Math.max(previous.north, current.lat),
      south: Math.min(previous.south, current.lat),
      west: Math.min(previous.west, current.lng),
      east: Math.max(previous.east, current.lng)
    };
  },
  { north: first.lat, south: first.lat, west: first.lng, east: first.lng });
}
