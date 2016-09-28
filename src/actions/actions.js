export const DELETE_TURNPOINT = "DELETE_TURNPOINT";

export function deleteTurnpoint(index) {
  return {
    type: DELETE_TURNPOINT,
    index: index
  };
}
