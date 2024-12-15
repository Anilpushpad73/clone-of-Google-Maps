import { useEffect, useState } from 'react';
import { useMap, Polyline } from 'react-leaflet';
import { useMapStore } from '../store/useMapStore';
import { fetchRoadRoute } from './routeService'; // Adjust path if needed

export default function RouteLayer() {
  const { origin, destination } = useMapStore();
  const map = useMap();
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);

  useEffect(() => {
    async function fetchRoute() {
      if (origin && destination) {
        try {
          const route = await fetchRoadRoute(origin, destination);
          setRouteCoords(route);

          // Define bounds as an array of LatLng tuples
          const bounds: [number, number][] = [
            [origin.lat, origin.lng],
            [destination.lat, destination.lng],
          ];

          // Fit the map to the bounds
          map.fitBounds(bounds, { padding: [50, 50] });
        } catch (error) {
          console.error('Error fetching route:', error);
        }
      }
    }

    fetchRoute();
  }, [origin, destination, map]);

  if (!origin || !destination || routeCoords.length === 0) return null;

  return (
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
  );
}












// import { useEffect, useState } from 'react';
// import { useMap, Polyline } from 'react-leaflet';
// import { useMapStore } from '../store/useMapStore';
// import { fetchRoadRoute } from './routeService';
// // import { fetchRoadRoute } from '../services/routeService';


// export default function RouteLayer() {
//   const { origin, destination } = useMapStore();
//   const map = useMap();
//   const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);

//   // useEffect(() => {
//   //   async function fetchRoute() {
//   //     if (origin && destination) {
//   //       try {
//   //         const route = await fetchRoadRoute(origin, destination);
//   //         setRouteCoords(route);
//   //         const bounds = [
//   //           [origin.lat, origin.lng],
//   //           [destination.lat, destination.lng],
//   //         ];
//   //         map.fitBounds(bounds, { padding: [50, 50] });
//   //       } catch (error) {
//   //         console.error('Error fetching route:', error);
//   //       }
//   //     }
//   //   }
//   //   fetchRoute();
//   // }, [origin, destination, map]);
//   useEffect(() => {
//     async function fetchRoute() {
//       if (origin && destination) {
//         try {
//           const route = await fetchRoadRoute(origin, destination);
//           setRouteCoords(route);
  
//           // Explicitly define bounds as a LatLngBoundsLiteral
//           const bounds: [number, number][] = [
//             [origin.lat, origin.lng],
//             [destination.lat, destination.lng],
//           ];
  
//           // Fit map to bounds
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

