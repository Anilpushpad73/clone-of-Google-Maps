import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents, Marker, Popup } from 'react-leaflet';
import { BENGALURU_BOUNDS, BENGALURU_CENTER, DEFAULT_ZOOM, MAP_ATTRIBUTION } from '../constants/mapConfig';
import { useMapStore } from '../store/useMapStore';
import RouteLayer from './RouteLayer';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// function MapEvents() {
//   const map = useMapEvents({
//     click(e) {
//       const { origin, destination, setOrigin, setDestination } = useMapStore.getState();
//       const coords = { lat: e.latlng.lat, lng: e.latlng.lng };

//       // Check if click is within Bengaluru bounds
//       if (
//         coords.lat > BENGALURU_BOUNDS.south &&
//         coords.lat < BENGALURU_BOUNDS.north &&
//         coords.lng > BENGALURU_BOUNDS.west &&
//         coords.lng < BENGALURU_BOUNDS.east
//       ) {
//         if (!origin) {
//           setOrigin(coords);
//         } else if (!destination) {
//           setDestination(coords);
//         }
//       }
//     },
//   });

//   return null;
// }
function MapEvents() {
  useMapEvents({
    click(e) {
      const { origin, destination, setOrigin, setDestination } = useMapStore.getState();
      const coords = { lat: e.latlng.lat, lng: e.latlng.lng };

      if (!origin) {
        setOrigin(coords);
      } else if (!destination) {
        setDestination(coords);
      }
    },
  });

  return null;
}

function RouteMarkers() {
  const { origin, destination } = useMapStore();

  return (
    <>
      {origin && (
        <Marker position={[origin.lat, origin.lng]}>
          <Popup>Origin</Popup>
        </Marker>
      )}
      {destination && (
        <Marker position={[destination.lat, destination.lng]}>
          <Popup>Destination</Popup>
        </Marker>
      )}
    </>
  );
}

function BoundaryRestrictor() {
  const map = useMap();
  
  useEffect(() => {
    map.setMaxBounds([
      [BENGALURU_BOUNDS.south, BENGALURU_BOUNDS.west],
      [BENGALURU_BOUNDS.north, BENGALURU_BOUNDS.east],
    ]);
  }, [map]);

  return null;
}

export default function Map() {
  return (
    <MapContainer
      center={BENGALURU_CENTER}
      zoom={DEFAULT_ZOOM}
      className="h-full w-full"
      zoomControl={true}
    >
      <TileLayer
        attribution={MAP_ATTRIBUTION}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEvents />
      <RouteMarkers />
      <RouteLayer />
      <BoundaryRestrictor />
    </MapContainer>
  );
}