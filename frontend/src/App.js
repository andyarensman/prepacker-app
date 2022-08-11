import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';

// pages and components
import NewList from './pages/newList';
import GearCloset from './pages/gearCloset';
import SavedLists from './pages/savedLists';
import SavedListDetails from './pages/savedListDetails';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
          <Route 
              path="/new-list"
              element={<NewList />}
            />
            <Route 
              path="/gear-closet"
              element={<GearCloset />}
            />
            <Route 
              path="/saved-lists"
              element={<SavedLists />}
            />
            <Route 
              path="/saved-lists/:id"
              element={<SavedListDetails />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
