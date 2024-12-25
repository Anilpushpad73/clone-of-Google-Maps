import React, { useState } from 'react';
import { useMapStore } from '../store/useMapStore';
// import { MapPin } from 'lucide-react';
import { BENGALURU_BOUNDS } from '../constants/mapConfig';
import type { Coordinates } from '../types/map';

interface FormData {
  originLat: string;
  originLng: string;
  destLat: string;
  destLng: string;
}

export default function CoordinatesInput() {
  const { setOrigin, setDestination, clearRoute, addToHistory } = useMapStore();
  const [formData, setFormData] = useState<FormData>({
    originLat: '',
    originLng: '',
    destLat: '',
    destLng: '',
  });
  const [error, setError] = useState<string>('');

   const validateCoordinates = (coords: Coordinates): boolean => {
    return (
      coords.lat >= BENGALURU_BOUNDS.south &&
      coords.lat <= BENGALURU_BOUNDS.north &&
      coords.lng >= BENGALURU_BOUNDS.west &&
      coords.lng <= BENGALURU_BOUNDS.east
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const origin: Coordinates = {
      lat: parseFloat(formData.originLat),
      lng: parseFloat(formData.originLng),
    };
    //string to float number
    const destination: Coordinates = {
      lat: parseFloat(formData.destLat),
      lng: parseFloat(formData.destLng),
    };

    // Validate coordinates
    if (!validateCoordinates(origin) || !validateCoordinates(destination)) {
      setError('Coordinates must be within Bengaluru boundaries');
      return;
    }

    setOrigin(origin);
    setDestination(destination);

    // Add to search history
    addToHistory({
      id: Date.now().toString(),
      origin,
      destination,
      timestamp: Date.now(),
    });

    // Clear form
    setFormData({
      originLat: '',
      originLng: '',
      destLat: '',
      destLng: '',
    });
  };

  //Handles Input Changes Dynamically
  //is a React event handler designed to handle changes in an HTML <input> element in a form 
  //event (e) is a change event triggered by an <input> element.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData, //Copies the existing formData state into a new object to avoid mutating the original state directly
      [e.target.name]: e.target.value,//Dynamically sets a property on the new state object based on the {name} attribute of the <input> element.
    });
  };

  const handleClear = () => {
    clearRoute();
    setFormData({
      originLat: '',
      originLng: '',
      destLat: '',
      destLng: '',
    });
    setError('');
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Origin</label>
          <div className="mt-1 flex gap-2">
            <input
              type="number"
              name="originLat" //Identifies the input field
              //Used to dynamically update the correct property in the formData object 
              // when the user inputs data (via the handleInputChange event handler)

              value={formData.originLat}
              onChange={handleInputChange}
              placeholder="Latitude"
              step="any"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <input
              type="number"
              name="originLng"
              value={formData.originLng}
              onChange={handleInputChange}
              placeholder="Longitude"
              step="any"//Allows any numeric value, including decimals
              required //Specifies that this field is mandatory.
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Destination</label>
          <div className="mt-1 flex gap-2">
            <input
              type="number"
              name="destLat"
              value={formData.destLat}
              onChange={handleInputChange}
              placeholder="Latitude"
              step="any"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <input
              type="number"
              name="destLng"
              value={formData.destLng}
              onChange={handleInputChange}
              placeholder="Longitude"
              step="any"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Find Route
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
