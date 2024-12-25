export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Route {
  id: string;
  origin: Coordinates;
  destination: Coordinates;
  timestamp: number;
}

export interface OSRMRouteResponse {
  routes: {
    geometry: {
      coordinates: [number, number][]; // Array of longitude-latitude pairs
    };
  }[];
}