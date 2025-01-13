import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

const RoutingMachine = ({ waypoints, onRouteFound }) => {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!map || !waypoints?.length) return;

    const routingControl = L.Routing.control({
      waypoints: waypoints.map((coord) => L.latLng(coord[0], coord[1])),
      lineOptions: {
        styles: [{ color: "#3B82F6", weight: 4, opacity: 0.7 }],
      },
      show: false,
      addWaypoints: false,
      routeWhileDragging: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      createMarker: () => null,
    });

    routingControl.on("routesfound", onRouteFound);
    routingControlRef.current = routingControl;
    routingControl.addTo(map);

    return () => {
      if (routingControlRef.current) {
        try {
          routingControlRef.current._router && routingControlRef.current._router.clear(); // Provera pre uklanjanja
          map.removeControl(routingControlRef.current);
          routingControlRef.current = null;
        } catch (error) {
          console.error("Error removing routing control:", error);
        }
      }
    };
  }, [map, waypoints, onRouteFound]);

  return null;
};

export default RoutingMachine;
