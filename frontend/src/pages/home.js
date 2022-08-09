// TODO: Gear should be organized by category

import { useEffect, useState } from "react";
import { useClosetContext } from "../hooks/useClosetContext";

// components
import ClosetCategory from "../components/ClosetCategory";
import TripListCategory from "../components/TripListCategory";

const Home = () => {
  const [trip_list, setTripList] = useState([])
  const [checklist_name, setChecklistName] = useState('')
  const [checklist_notes, setChecklistNotes] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const {closet, dispatch}= useClosetContext()
  // console.log(closet)

  //! This is now on the closet page and here. Should it be in the parent instead?
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

  //! This is on the home page, GearDetails component, and TripList component
  const handleWeight = (weight) => {
    let pounds = Math.floor(weight/16)
    let ouncesNoRound = (weight - (Math.floor(weight/16))*16)
    let ounces = Math.round(ouncesNoRound * 10) / 10

    if (pounds !== 0 && ounces !== 0) {
      return (`${pounds} lb ${ounces} oz`)
    }
    if (pounds === 0 && ounces !== 0) {
      return (`${ounces} oz`)
    }
    if (pounds !== 0 && ounces === 0) {
      return (`${pounds} lb`)
    }
    if (!pounds && !ounces) {
      return ('N/A')
    }
  }

  const findTotalWeight = () => {
    let totalWeight = 0

    trip_list.map(gear => {
      if (gear.weight) {
        totalWeight += gear.weight
      }
      return totalWeight
    })

    return handleWeight(totalWeight)
  }

  // Submit Checklist 
  const handleSubmit = async (e) => {
    e.preventDefault()

    let gear_items = trip_list.map(e => e._id)


    const checklist = {checklist_name, gear_items, checklist_notes}

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
                  <b>Total Weight: <i className="weight-italics">{findTotalWeight()}</i></b>
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
 
export default Home;