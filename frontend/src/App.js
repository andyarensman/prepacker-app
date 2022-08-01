import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';

// pages and components
import Home from './pages/home';
import GearCloset from './pages/gearCloset';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
          <Route 
              path="/"
              element={<Home />}
            />
            <Route 
              path="/gear-closet"
              element={<GearCloset />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
