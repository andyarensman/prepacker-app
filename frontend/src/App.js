import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import { useEffect } from "react";

// pages, components, context
import NewList from './pages/newList';
import GearCloset from './pages/gearCloset';
import SavedLists from './pages/savedLists';
import SavedListDetails from './pages/savedListDetails';
import { useClosetContext } from './hooks/useClosetContext';


function App() {
  const {dispatch} = useClosetContext()
  
  // Grab the closet data. This was on every page.
  useEffect(() => {
    const fetchCloset = async () => {
      const response = await fetch('/api/closet')
      const json = await response.json()

      if (response.ok) {
        dispatch({type:'SET_CLOSET', payload: json})
      }
    }

    fetchCloset() 
  }, [dispatch])

  // Grab the checklists data
  useEffect(() => {
    const fetchSavedLists = async () => {
        const response = await fetch('/api/checklist')
        const json = await response.json()
  
        if (response.ok) {
          dispatch({type:'SET_CHECKLISTS', payload: json})
        }
      }

    fetchSavedLists()
  }, [dispatch])

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
