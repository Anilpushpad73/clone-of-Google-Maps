import { useEffect, useState } from 'react';
import { useMap, Polyline } from 'react-leaflet';
import { useMapStore } from '../store/useMapStore';
import { fetchMultipleRoutes } from './routeService';

export default function RouteLayer() {
  const { origin, destination } = useMapStore();
  const map = useMap();
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [multipleRoutes, setMultipleRoutes] = useState<[number, number][][]>([]);

  const getRouteColor = (index: number): string => {
    const colors = ['green', 'blue', 'purple', 'orange', 'cyan']; 
    return colors[index % colors.length]; 
  };
  useEffect(() => {
    async function fetchRoutes() {
      if (origin && destination) {
        try {
          const routes = await fetchMultipleRoutes(origin, destination);
          
          // Process each route's geometry
          const allRoutesCoords = routes.map(route => route.geometry.coordinates.map((coord: [number, number]) => {
            const [lng, lat] = coord;
            return [lat, lng] as [number, number];
          }));
          setMultipleRoutes(allRoutesCoords); // Store all routes coordinates

          // For the first route (default route), set the coordinates
          if (allRoutesCoords.length > 0) {
            setRouteCoords(allRoutesCoords[0] as [number, number][]);
          }

          // Define bounds for the origin and destination
          const bounds: [number, number][] = [
            [origin.lat, origin.lng],
            [destination.lat, destination.lng],
          ];

          // Fit the map to the bounds
          map.fitBounds(bounds, { padding: [50, 50] });
        } catch (error) {
          console.error('Error fetching routes:', error);
        }
      }
    }

    fetchRoutes();
  }, [origin, destination, map]);

  if (!origin || !destination || routeCoords.length === 0) return null;

  return (
    <>
      {/* Multiple routes visualization */}
      {multipleRoutes.map((route, index) => (
        <Polyline
          key={index}
          positions={route}
          pathOptions={{
            color: getRouteColor(index), // Different color for each route
            weight: 5,
            opacity: 0.7,
            lineCap: 'round',
            lineJoin: 'round',
          }}
        />
      ))}

      {/* Default route (first route in the list) */}
      <Polyline
        positions={routeCoords}
        pathOptions={{
          color: 'red', // Default route in red
          weight: 5,
          opacity: 0.8,
          lineCap: 'round',
          lineJoin: 'round',
        }}
      />
    </>
  );
}

// import { useEffect, useState } from 'react';
// import { useMap, Polyline } from 'react-leaflet';
// import { useMapStore } from '../store/useMapStore';
// import { fetchMultipleRoutes } from './routeService';

// export default function RouteLayer() {
//   const { origin, destination } = useMapStore();
//   const map = useMap();
//   const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
//   const [multipleRoutes, setMultipleRoutes] = useState<[number, number][][]>([]);
//   const [directions, setDirections] = useState<string[]>([]); // State to store navigation steps

//   useEffect(() => {
//     async function fetchRoutes() {
//       if (origin && destination) {
//         try {
//           const routes = await fetchMultipleRoutes(origin, destination);

//           // Process each route's geometry and steps (for navigation instructions)
//           const allRoutesCoords = routes.map(route => route.geometry.coordinates.map((coord: [number, number]) => {
//                         const [lng, lat] = coord;
//                         return [lat, lng] as [number, number];
//                       })); // Store all routes coordinates
//           setMultipleRoutes(allRoutesCoords);

//           // For the first route (default route), set the coordinates
//           if (allRoutesCoords.length > 0) {
//             // setRouteCoords(allRoutesCoords[0]);
//             setRouteCoords(allRoutesCoords[0] as [number, number][]);
//           }

//           // Extract step-by-step navigation instructions
//           const allDirections: string[] = routes[0].legs?.[0].steps?.map(step => step.instruction) || [];
//           setDirections(allDirections); // Set directions for the first route

//           // Define bounds for the origin and destination
//           const bounds: [number, number][] = [
//             [origin.lat, origin.lng],
//             [destination.lat, destination.lng],
//           ];

//           // Fit the map to the bounds
//           map.fitBounds(bounds, { padding: [50, 50] });
//         } catch (error) {
//           console.error('Error fetching routes:', error);
//         }
//       }
//     }

//     fetchRoutes();
//   }, [origin, destination, map]);

//   if (!origin || !destination || routeCoords.length === 0) return null;

//   return (
//     <>
//       {/* Multiple routes visualization */}
//       {multipleRoutes.map((route, index) => (
//         <Polyline
//           key={index}
//           positions={route}
//           pathOptions={{
//             color: index === 0 ? 'blue' : 'green', // Different color for each route
//             weight: 5,
//             opacity: 0.7,
//             lineCap: 'round',
//             lineJoin: 'round',
//           }}
//         />
//       ))}

//       {/* Default route (first route in the list) */}
//       <Polyline
//         positions={routeCoords}
//         pathOptions={{
//           color: 'red', // Default route in red
//           weight: 5,
//           opacity: 0.8,
//           lineCap: 'round',
//           lineJoin: 'round',
//         }}
//       />

//       {/* Display Step-by-Step Navigation Instructions */}
//       <div style={{ position: 'absolute', top: '10%', left: '10%', zIndex: 1000, background: 'white', padding: '10px', borderRadius: '5px' }}>
//         <h3>Turn-by-Turn Instructions:</h3>
//         <ul>
//           {directions.map((direction, index) => (
//             <li key={index}>{direction}</li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// }