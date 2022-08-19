import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClosetContext } from "../hooks/useClosetContext";


// components
import ClosetCategory from "../components/newList/ClosetCategory";
import TripListCategory from "../components/newList/TripListCategory";
import { findTotalWeight } from "../helpers/utils";

const NewList = () => {
  const [trip_list, setTripList] = useState([])
  const [checklist_name, setChecklistName] = useState('')
  const [checklist_notes, setChecklistNotes] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const [currentSortArr, setCurrentSortArr] = useState([])

  const { closet, dispatch }= useClosetContext()
  const navigate = useNavigate()

  // Set currentSortArr to closet
  useEffect(() => {
    setCurrentSortArr([...closet])
  }, [closet])

  // Fetch trip list from local storage
  useEffect(() =>{
    const data = window.localStorage.getItem('PREPACK_NEW_CHECKLIST')
    if (data !== null) setTripList(JSON.parse(data))
  }, [])


  // Update local storage with trip list data
  useEffect(() =>{
    window.localStorage.setItem('PREPACK_NEW_CHECKLIST', JSON.stringify(trip_list))
  }, [trip_list])

  // Submit Checklist 
  const handleSubmit = async (e) => {
    e.preventDefault()

    let gear_items = trip_list.map(e => e._id)
    let total_weight = findTotalWeight(trip_list)


    const checklist = {checklist_name, gear_items, total_weight, checklist_notes}

    const response = await fetch('/api/checklist', {
      method: 'POST',
      body: JSON.stringify(checklist),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    if (!response.ok) {
      console.log('something went wrong')
      setError(json.error)
      setEmptyFields(json.emptyFields)
      
    }

    if (response.ok) {
      console.log('new list added', json)
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_CHECKLIST', payload: json})
      navigate('/saved-lists/' + json._id)
    }
  }

  // Remove all from checklist
  const handleClick = () => {
    setTripList([])
    setChecklistName('')
    setChecklistNotes('')
    setError(null)
    setEmptyFields([])
  }

  // Search Functionality
  const handleChange = (searchWord) => {

    if (!searchWord) {
      setCurrentSortArr([...closet])
    } else {
      let regex = new RegExp(searchWord, 'i')
      let searchResult = closet.filter(gear => regex.test(gear.gear_name))
      setCurrentSortArr([...searchResult])
    }
  }

  return ( 
    <div className="home">
      <div>
        <h2>My PrePacker Checklist</h2>
        {trip_list && ['essential', 'container', 'sleep', 'kitchen', 'hygiene', 'clothing', 'personal', 'mountaineering', 'other'].map(e => (
            <TripListCategory
              category={e}
              key={e}
              trip_list={trip_list}
              setTripList={setTripList}
            />
          ))}
          <br/>
          {trip_list.length !== 0 && (
            <>
              <form className="create-checklist" onSubmit={handleSubmit}>
                <p>
                  <b>Total Weight: <i className="weight-italics">{findTotalWeight(trip_list)}</i></b>
                </p>
                <br/>
                <label><b>Checklist Name:</b></label>
                <input
                  type="text" 
                  onChange={(e) => setChecklistName(e.target.value)}
                  value={checklist_name}
                  className={emptyFields.includes('checklist_name') ? 'error list-name' : 'list-name'}
                />
                <label><b>Notes:</b></label>
                <textarea 
                  onChange={(e) => setChecklistNotes(e.target.value)}
                  value={checklist_notes}
                  className="list-textarea"
                />
                <br/>
                <button className="save-list">Save List</button>
                
              </form>
              <button className="delete-list" onClick={() => handleClick()}>Remove All</button>
              {error && <div className="error list-name">{error}</div>}
            </>
          )}
          
      </div>
      <div className="closet-list">
        <div className="closet-list-header">
          <h2>My Gear</h2>
          <div className="search-container">
            <form onSubmit={(e) => e.preventDefault()} className="search-form">
              <input 
                type="text"
                placeholder="Search..."
                onChange={(e) => handleChange(e.target.value)}
              />
              <button><span className="material-symbols-outlined search-symbol">search</span></button>
            </form>
          </div> 
        </div>
        {closet && ['essential', 'container', 'sleep', 'kitchen', 'hygiene', 'clothing', 'personal', 'mountaineering', 'other'].map(e => (
          <ClosetCategory
            closet={currentSortArr}
            category={e}
            key={e}
            trip_list={trip_list}
            setTripList={setTripList}
          />
        ))}
        
      </div>
    </div>
   );
}
 
export default NewList;