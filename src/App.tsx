
import Map from './components/Map';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="h-screen w-screen flex">
      <Sidebar />
      <div className="flex-1 relative">
        <Map />
      </div>
    </div>
  );
}

export default App;