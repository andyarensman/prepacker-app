import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages, components
import Home from './pages/Home'
import NewList from './pages/newList'
import GearCloset from './pages/gearCloset'
import SavedLists from './pages/savedLists'
import IndividualList from './pages/individualList'
import Navbar from './components/navbar/Navbar'
import EditList from './pages/editList'
import Footer from './components/footer/Footer'

// hooks/context
import { useClosetContext } from './hooks/useClosetContext'
import { useAuthContext } from './hooks/useAuthContext'
import { useLogout } from './hooks/useLogout'


function App() {
  const { dispatch } = useClosetContext()
  const { user } = useAuthContext()
  const { logout } = useLogout()
  
  // Grab the closet data. This was on every page.
  useEffect(() => {
    const fetchCloset = async () => {
      const response = await fetch(process.env.REACT_APP_BACKEND + '/api/closet', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type:'SET_CLOSET', payload: json})
      }
      //! There might be a better way to do this
      if (!response.ok) {
        logout()
      }
    }

    if (user) {
      fetchCloset()
    }
  }, [dispatch, user]) //'logout' is purposefully not being declared here

  // Grab the checklists data
  useEffect(() => {
    const fetchSavedLists = async () => {
      const response = await fetch(process.env.REACT_APP_BACKEND + '/api/checklist', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type:'SET_CHECKLISTS', payload: json})
      }
      //! There might be a better way to do this
      if (!response.ok) {
        logout()
      }
    }

    if (user) {
      fetchSavedLists()
    }
  }, [dispatch, user]) //'logout' is purposefully not being declared here

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
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
