import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

const RoutingMachine = ({ waypoints }) => {
  const map = useMap();
  const routingControlRef = useRef(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (!map || !waypoints?.length || isInitializedRef.current) return;

    const initRouting = () => {
      try {
        const routingControl = L.Routing.control({
          waypoints: waypoints.map(coord => L.latLng(coord[0], coord[1])),
          lineOptions: {
            styles: [{ color: '#3B82F6', weight: 4, opacity: 0.7 }]
          },
          show: false,
          addWaypoints: false,
          routeWhileDragging: false,
          draggableWaypoints: false,
          fitSelectedRoutes: true,
          createMarker: () => null
        });

        routingControlRef.current = routingControl;
        routingControl.addTo(map);
        isInitializedRef.current = true;

        routingControl.on('routesfound', (e) => {
          const routes = e.routes;
          if (routes?.[0]?.summary) {
            const summary = routes[0].summary;
            console.log('Distance:', Math.round(summary.totalDistance / 1000), 'km');
            console.log('Time:', Math.round(summary.totalTime / 3600), 'hours');
          }
        });
      } catch (error) {
        console.error('Routing initialization error:', error);
      }
    };

    // Initialize routing after map is fully loaded
    map.whenReady(initRouting);

    return () => {
      if (routingControlRef.current && map) {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
        isInitializedRef.current = false;
      }
    };
  }, [map, waypoints]);

  return null;
};

export default RoutingMachine;