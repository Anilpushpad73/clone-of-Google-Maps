import axios from 'axios';
import { Coordinates, OSRMRouteResponse } from '../types/map';

const OSRM_API = "http://router.project-osrm.org/route/v1/driving";

// Function to fetch multiple routes from OSRM API
export async function fetchMultipleRoutes(
  origin: Coordinates,
  destination: Coordinates
): Promise<OSRMRouteResponse['routes']> {
  try {
    const { lat: originLat, lng: originLng } = origin;
    const { lat: destLat, lng: destLng } = destination;

    const url = `${OSRM_API}/${originLng},${originLat};${destLng},${destLat}?steps=true&overview=full&geometries=geojson&alternatives=true`;

    const response = await axios.get<OSRMRouteResponse>(url); // Specify OSRMRouteResponse here
    
    // Ensure routes are available in the response
    if (response.data.routes) {
      return response.data.routes; // Return the array of routes
    } else {
      throw new Error('No valid routes found');
    }
  } catch (error) {
    console.error('Error fetching road route:', error);
    return []; // Return an empty array in case of an error
  }
}
