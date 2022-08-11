import { useEffect, useState } from "react";
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

  const {closet}= useClosetContext()


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
      console.log('i think it worked')
      setError(null)
      setEmptyFields([])
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
                <label>Checklist Name</label>
                <input
                  type="text" 
                  onChange={(e) => setChecklistName(e.target.value)}
                  value={checklist_name}
                  className={emptyFields.includes('checklist_name') ? 'error' : ''}
                />
                <label>Notes</label>
                <textarea 
                  onChange={(e) => setChecklistNotes(e.target.value)}
                  value={checklist_notes}
                />
                <br/>
                <button className="save-list">Save List</button>
                
              </form>
              <button className="delete-list" onClick={() => handleClick()}>Remove All</button>
              {error && <div className="error">{error}</div>}
            </>
          )}
          
      </div>
      <div className="closet-list">
        <h2>My Gear</h2>
        {closet && ['essential', 'container', 'sleep', 'kitchen', 'hygiene', 'clothing', 'personal', 'mountaineering', 'other'].map(e => (
          <ClosetCategory
            closet={closet}
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