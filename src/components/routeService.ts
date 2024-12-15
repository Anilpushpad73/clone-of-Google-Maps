import axios from 'axios';

interface Coordinates {
  lat: number;
  lng: number;
}

interface OSRMRouteResponse {
  routes: {
    geometry: {
      coordinates: [number, number][];
    };
  }[];
}

const OSRM_API = "http://router.project-osrm.org/route/v1/driving";

export async function fetchRoadRoute(
  origin: Coordinates,
  destination: Coordinates
): Promise<[number, number][]> {
  try {
    const { lat: originLat, lng: originLng } = origin;
    const { lat: destLat, lng: destLng } = destination;

    const url = `${OSRM_API}/${originLng},${originLat};${destLng},${destLat}?overview=full&geometries=geojson`;

    const response = await axios.get<OSRMRouteResponse>(url);
    const route = response.data.routes[0];

    if (route && route.geometry && route.geometry.coordinates) {
      // Convert [lng, lat] to [lat, lng] for Leaflet
      return route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
    }

    throw new Error('No valid route found');
  } catch (error) {
    console.error('Error fetching road route:', error);
    return []; // Return an empty array for invalid routes
  }
}


// import axios from 'axios';
// import type { Coordinates, OSRMRouteResponse } from '../types/map';

// const OSRM_API = 'http://router.project-osrm.org/route/v1/driving';

// // export async function fetchRoadRoute(
// //   origin: Coordinates,
// //   destination: Coordinates
// // ): Promise<[number, number][]> {
// //   const { lat: originLat, lng: originLng } = origin;
// //   const { lat: destLat, lng: destLng } = destination;

// //   const url = `${OSRM_API}/${originLng},${originLat};${destLng},${destLat}?overview=full&geometries=geojson`;

// //   const response = await axios.get(url);
// //   const route = response.data.routes[0];

// //   if (!route) {
// //     throw new Error('No route found.');
// //   }

// //   // Convert GeoJSON coordinates (lng, lat) to Leaflet-compatible (lat, lng)
// //   return route.geometry.coordinates.map(([lng, lat]: [number, number]) => [
// //     lat,
// //     lng,
// //   ]);
// // }

// // `export async function fetchRoadRoute(
// //     origin: Coordinates,
// //     destination: Coordinates
// //   ): Promise<[number, number][]> {
// //     const { lat: originLat, lng: originLng } = origin;
// //     const { lat: destLat, lng: destLng } = destination;
  
// //     const url = `${OSRM_API}/${originLng},${originLat};${destLng},${destLat}?overview=full&geometries=geojson`;
  
// //     // Add the response type
// //     const response = await axios.get<OSRMRouteResponse>(url);
  
// //     // Safely access response data
// //     const route = response.data.routes[0];
// //     if (!route || !route.geometry || !route.geometry.coordinates) {
// //       throw new Error('Invalid route data received from the API');
// //     }
  
// //     return route.geometry.coordinates;
// //   }
// export async function fetchRoadRoute(
//     origin: Coordinates,
//     destination: Coordinates
//   ): Promise<[number, number][]> {
//     try {
//       const { lat: originLat, lng: originLng } = origin;
//       const { lat: destLat, lng: destLng } = destination;
  
//       const url = `${OSRM_API}/${originLng},${originLat};${destLng},${destLat}?overview=full&geometries=geojson`;
  
//       const response = await axios.get<OSRMRouteResponse>(url);
//       const route = response.data.routes[0];
  
//       if (route && route.geometry && route.geometry.coordinates) {
//         return route.geometry.coordinates;
//       }
  
//       throw new Error('No valid route found');
//     } catch (error) {
//       console.error('Error fetching road route:', error);
//       return []; // Return an empty array for invalid routes
//     }
//   }
  