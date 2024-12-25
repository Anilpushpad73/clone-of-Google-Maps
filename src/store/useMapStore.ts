import { create } from 'zustand';
import type { Coordinates, Route } from '../types/map';
import { BENGALURU_BOUNDS } from '../constants/mapConfig';

   const validateCoordinates = (coords: Coordinates): boolean => {
    return (
      coords.lat >= BENGALURU_BOUNDS.south &&
      coords.lat <= BENGALURU_BOUNDS.north &&
      coords.lng >= BENGALURU_BOUNDS.west &&
      coords.lng <= BENGALURU_BOUNDS.east
    );
  };
interface MapStore {
  origin: Coordinates | null;
  destination: Coordinates | null;
  searchHistory: Route[];
  setOrigin: (coords: Coordinates | null) => void;
  setDestination: (coords: Coordinates | null) => void;
  addToHistory: (route: Route) => void;
  clearRoute: () => void;
  addCurrentRouteToHistory: () => void; 
}
//Creates a Zustand store with the type MapStore
//The set function is provided by Zustand to update the state.
export const useMapStore = create<MapStore>((set, get) => ({
  origin: null,
  destination: null,
  searchHistory: [],

  // set is a function provided by the state management system (e.g., Zustand).
  //When setOrigin/ setDestination is called with a coords parameter, it updates the origin/destination property in the state with the new value.

  setOrigin: (coords) => set({ origin: coords }),//partial update, Updates the origin property in the state.
  setDestination: (coords) => set({ destination: coords }),//partial update, Updates the destnination property in the state.
 
  addToHistory: (route) =>
    set((state) => ({
      searchHistory: [route, ...state.searchHistory].slice(0, 10),
    })),// Functional Update
  clearRoute: () => set({ origin: null, destination: null }),//partial update
  addCurrentRouteToHistory: () => { const { origin, destination } = get(); 
  if (origin && destination && validateCoordinates(origin)&& validateCoordinates(destination) ) 
  { 
    const route: Route = { id: Date.now().toString(), origin, destination, timestamp: Date.now(), }; 
    set((state) => ({ searchHistory: [route, ...state.searchHistory].slice(0, 10), })); 
  }
  }
}));