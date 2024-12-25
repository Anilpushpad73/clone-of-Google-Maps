
import { useMapStore } from '../store/useMapStore';
import { History } from 'lucide-react';
import type { Route } from '../types/map';

export default function SearchHistory() {
  const { searchHistory, setOrigin, setDestination } = useMapStore();

  const handleRouteClick = (route: Route) => {
    setOrigin(route.origin);
    setDestination(route.destination);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <History className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Search History</h2>
      </div>
      <div className="space-y-2 max-h-[calc(100vh-400px)] overflow-y-auto">
        {searchHistory.map((route) => (
          <div
            key={route.id}
            onClick={() => handleRouteClick(route)}
            className="p-2 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            <div className="text-sm">
              <p>From: {route.origin.lat.toFixed(6)}, {route.origin.lng.toFixed(6)}</p>
              <p>To: {route.destination.lat.toFixed(6)}, {route.destination.lng.toFixed(6)}</p>
              <p className="text-xs text-gray-500">
                {new Date(route.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
        {searchHistory.length === 0 && (
          <p className="text-gray-500 text-sm">No recent searches</p>
        )}
      </div>
    </div>
  );
}