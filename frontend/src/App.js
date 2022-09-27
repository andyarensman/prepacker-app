import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages, components
import Home from './pages/Home'
import NewList from './pages/newList'
import GearCloset from './pages/gearCloset'
import SavedLists from './pages/savedLists'
import IndividualList from './pages/individualList'
import Navbar from './components/Navbar'
import EditList from './pages/editList'

// context
import { useClosetContext } from './hooks/useClosetContext'
import { useAuthContext } from './hooks/useAuthContext'


function App() {
  const { dispatch } = useClosetContext()
  const { user } = useAuthContext()
  
  // Grab the closet data. This was on every page.
  useEffect(() => {
    const fetchCloset = async () => {
      const response = await fetch('/api/closet', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type:'SET_CLOSET', payload: json})
      }
    }

    if (user) {
      fetchCloset()
    }
  }, [dispatch, user])

  // Grab the checklists data
  useEffect(() => {
    const fetchSavedLists = async () => {
      const response = await fetch('/api/checklist', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type:'SET_CHECKLISTS', payload: json})
      }
    }

    if (user) {
      fetchSavedLists()
    }
  }, [dispatch, user])

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
              path="/new-list"
              element={user ? <NewList /> : <Navigate to="/" />}
            />
            <Route 
              path="/gear-closet"
              element={user ? <GearCloset /> : <Navigate to="/" />}
            />
            <Route 
              path="/saved-lists"
              element={user ? <SavedLists /> : <Navigate to="/" />}
            />
            <Route 
              path="/saved-lists/:id"
              element={user ? <IndividualList /> : <Navigate to="/" />}
            />
            <Route 
              path="/saved-lists/edit/:id"
              element={user ? <EditList /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
