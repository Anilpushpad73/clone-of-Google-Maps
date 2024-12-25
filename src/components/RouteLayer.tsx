// import { useEffect, useState } from 'react';
// import { useMap, Polyline } from 'react-leaflet';
// import { useMapStore } from '../store/useMapStore';
// import { fetchRoadRoute } from './routeService';

// export default function RouteLayer() {
//   const { origin, destination } = useMapStore();
//   const map = useMap();
//   const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);

//   useEffect(() => {
//     async function fetchRoute() {
//       if (origin && destination) {
//         try {
//           const route = await fetchRoadRoute(origin, destination);
//           setRouteCoords(route);

//           // Define bounds as an array of LatLng tuples
//           const bounds: [number, number][] = [
//             [origin.lat, origin.lng],
//             [destination.lat, destination.lng],
//           ];

//           // Fit the map to the bounds
//           map.fitBounds(bounds, { padding: [50, 50] });
//         } catch (error) {
//           console.error('Error fetching route:', error);
//         }
//       }
//     }

//     fetchRoute();
//   }, [origin, destination, map]);

//   if (!origin || !destination || routeCoords.length === 0) return null;

//   return (
//     <Polyline
//       positions={routeCoords}
//       pathOptions={{
//         color: '#0000FF', // Dark blue
//         weight: 5,
//         opacity: 0.8,
//         lineCap: 'round',
//         lineJoin: 'round',
//       }}
//     />
//   );
// }

import { useEffect, useState } from 'react';
import { useMap, Polyline } from 'react-leaflet';
import { useMapStore } from '../store/useMapStore';
import { fetchRoadRoute } from './routeService';

export default function RouteLayer() {
  const { origin, destination } = useMapStore();
  const map = useMap();
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRoute() {
      if (origin && destination) {
        setError(null); // Clear previous errors
        try {
          const route = await fetchRoadRoute(origin, destination);
          setRouteCoords(route);

          if (route.length > 0) {
            // Define bounds as an array of LatLng tuples
            const bounds: [number, number][] = [
              [origin.lat, origin.lng],
              [destination.lat, destination.lng],
            ];

            // Fit the map to the bounds
            map.fitBounds(bounds, { padding: [50, 50] });
          } else {
            setError('No route found between the selected points.');
          }
        } catch (err) {
          console.error('Error fetching route:', err);
          setError('Failed to fetch route. Please try again.');
        }
      }
    }

    fetchRoute();
  }, [origin, destination, map]);

  if (!origin || !destination) return null;

  return (
    <>
      {routeCoords.length > 0 && (
        <Polyline
          positions={routeCoords}
          pathOptions={{
            color: '#0000FF', // Dark blue
            weight: 5,
            opacity: 0.8,
            lineCap: 'round',
            lineJoin: 'round',
          }}
        />
      )}
      {error && (
        <div style={{ color: 'red', position: 'absolute', top: 10, left: 10 }}>
          {error}
        </div>
      )}
    </>
  );
}
