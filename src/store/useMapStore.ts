import { create } from 'zustand';
import type { Coordinates, Route } from '../types/map';

interface MapStore {
  origin: Coordinates | null;
  destination: Coordinates | null;
  searchHistory: Route[];
  setOrigin: (coords: Coordinates | null) => void;
  setDestination: (coords: Coordinates | null) => void;
  addToHistory: (route: Route) => void;
  clearRoute: () => void;
}

export const useMapStore = create<MapStore>((set) => ({
  origin: null,
  destination: null,
  searchHistory: [],
  setOrigin: (coords) => set({ origin: coords }),
  setDestination: (coords) => set({ destination: coords }),
  addToHistory: (route) =>
    set((state) => ({
      searchHistory: [route, ...state.searchHistory].slice(0, 10),
    })),
  clearRoute: () => set({ origin: null, destination: null }),
}));