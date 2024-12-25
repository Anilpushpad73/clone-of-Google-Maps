import CoordinatesInput from './CoordinatesInput';
import SearchHistory from './SearchHistory';
import { Navigation2 } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="w-96 h-full bg-slate-200 shadow-lg z-10 flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Navigation2 className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-bold">Bengaluru Route Finder</h1>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <CoordinatesInput />
        <div className="mt-6">
          <SearchHistory />
        </div>
      </div>
    </div>
  );
}