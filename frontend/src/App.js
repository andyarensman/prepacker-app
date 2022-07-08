import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';

// pages and components
import Home from './pages/home';


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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
