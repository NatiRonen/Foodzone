import axios from "axios";

export const MAPS_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

export const getGeoCodings = async (_address) => {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${_address}&key=` + MAPS_KEY;
  let resp = await axios(url);
  if (resp.data.status !== "OK") return false;
  return resp.data.results[0].geometry.location;
};
export const calculateRoute = async (_origin, _stopPoint, _destination) => {
  if (_origin == "" || _destination == "") {
    return;
  }
  // eslint-disable-next-line no-undef
  const directionsService = new google.maps.DirectionsService();
  const results = await directionsService.route({
    origin: _origin,
    destination: _destination,
    waypoints: [
      {
        location: _stopPoint,
        stopover: true,
      },
    ],
    // eslint-disable-next-line no-undef
    travelMode: google.maps.TravelMode.DRIVING,
  });
  let totalDistance =
    results.routes[0].legs[0].distance.value + results.routes[0].legs[1].distance.value;
  let totalDuration =
    results.routes[0].legs[0].duration.value + results.routes[0].legs[1].duration.value;
  let routeDetails = handleRouteDetails(totalDistance, totalDuration);
  console.log(totalDuration);
  return { results, routeDetails, durationInSec: totalDuration };
};

export const handleRouteDetails = (_distance, _duration) => {
  let distanceSting = "";
  let durationSting = "";

  let distanceValue = (_distance / 1000).toFixed(1);
  distanceSting = `${distanceValue} km`;

  let durationValue = (_duration / 60).toFixed(0);
  if (durationValue > 60) {
    let durationMinutes = durationValue % 60;
    let durationHours = (durationValue / 60).toFixed(0);
    durationSting = `${durationHours}h, ${durationMinutes}m`;
  } else {
    durationSting = `${durationValue} m`;
  }
  return { distance: distanceSting, duration: durationSting };
};

export const getCurrentAddress = async (_pos) => {
  let url =
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${_pos.lat},${_pos.lng}&key=` +
    process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  let resp = await axios(url);
  return resp.data.results[0].formatted_address;
};

export const getCurrentLocation = async (_setState) => {
  navigator?.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lng } }) => {
    const pos = { lat, lng };
    _setState(pos);
  });
};
