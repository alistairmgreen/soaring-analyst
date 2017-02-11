import { GOOGLE_MAPS_API_READY } from '../actions/actionTypes';

export default function googleMapsApiReducer(state = null, action = {}){
  if (action.type === GOOGLE_MAPS_API_READY) {
    return action.googlemaps;
  }

  return state;
}
