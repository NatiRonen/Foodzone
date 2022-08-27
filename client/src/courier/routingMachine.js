import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';

const createRoutineMachineLayer = (props) => {
  const start = props.start;
  const stop = props.stop;
  const end = props.end;

  const instance = L.Routing.control({
    waypoints: [L.latLng(start), L.latLng(stop), L.latLng(end)],
    lineOptions: {
      styles: [{ color: '#6FA1EC', weight: 4 }]
    },
    pointMarkerStyle: {
      color: '#00FF80'
    },

    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    showAlternatives: false
  });

  instance.on('routesfound', function (e) {
    let distance = e.routes[0].summary.totalDistance;
    let time = e.routes[0].summary.totalTime;
    props.setRoutingTime(
      Math.round(distance / 1000) + ' km , ' + Math.round((time % 3600) / 60) + ' minutes'
    );
    // console.log(
    //   'Total distance is ' +
    //     Math.round(distance / 1000) +
    //     ' km and total time is ' +
    //     Math.round((time % 3600) / 60) +
    //     ' minutes'
    // );
    // console.log('distance', distance);
    // console.log('time', time);
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
