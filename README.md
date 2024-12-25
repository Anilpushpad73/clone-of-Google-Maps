
# Deployment Website
 ## URL: https://clone-of-google-maps-v1ot.vercel.app/
# Bengaluru Route Finder

A modern web application for finding routes in Bengaluru using React and Leaflet. The application allows users to find paths between two points either by clicking on the map or entering coordinates manually.

![Application Screenshot](https://drive.google.com/uc?id=1W9wOn6O-eC_V2kO1eHbUreqgHtI_uuay)

## Features

- 🗺️ Interactive map interface restricted to Bengaluru boundaries
- 📍 Two methods for location selection:
  - Click directly on the map
  - Enter coordinates manually
- 🔍 Search history tracking
- 📱 Responsive design
- 🛣️ Visual route display
- 🎯 Coordinate validation within Bengaluru limits

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Map Library**: React Leaflet
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/          # React components
│   ├── Map.tsx         # Map component with Leaflet integration
│   ├── Sidebar.tsx     # Sidebar container
│   ├── CoordinatesInput.tsx  # Coordinate input form
│   └── SearchHistory.tsx     # Search history display
|   |── RouteLayer.tsx  # route visulization
│   └── routeservice.ts   # fetch the route through OSRM API
├── store/              # State management
│   └── useMapStore.ts  # Zustand store
├── types/              # TypeScript types
│   └── map.ts         # Map-related types
├── constants/          # Constants and configuration
│   └── mapConfig.ts   # Map configuration
└── App.tsx            # Root component
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Setting Origin and Destination**
   - Click on the map to set origin and destination points, or
   - Enter coordinates manually in the sidebar form

2. **Finding Routes**
   - Click "Find Route" after setting both points
   - The shortest path will be displayed on the map

3. **Search History**
   - View recent searches in the sidebar
   - Click on any previous search to reload it

## Development

- Run tests: `npm test`
- Build for production: `npm run build`
- Preview production build: `npm run preview`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- OpenStreetMap for map data
- React Leaflet team for the amazing library
- Tailwind CSS for the styling framework
