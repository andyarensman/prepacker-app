import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// helpers, hooks, context
import { findTotalWeight, handleWeight } from '../../helpers/utils'
import { useClosetContext } from '../../hooks/useClosetContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'

// css modules
import NewListCSS from '../../styles/newList/newList.module.css'


const CreateChecklist = ({ trip_list, setTripList }) => {
  const [water_weight, setWaterWeight] = useState(0)
  const [water_volume, setWaterVolume] = useState(0)
  const [food_weight, setFoodWeight] = useState(0)

  const [checklist_name, setChecklistName] = useState('')
  const [checklist_notes, setChecklistNotes] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const { dispatch }= useClosetContext()
  const { user } = useAuthContext()
  const { logout } = useLogout()
  const navigate = useNavigate()

  // Submit Checklist 
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    let gear_items = trip_list.map(e => e._id)

    const checklist = {
      water_weight,
      food_weight,
      checklist_name,
      gear_items,
      checklist_notes
    }

    const response = await fetch(process.env.REACT_APP_BACKEND + '/api/checklist', {
      method: 'POST',
      body: JSON.stringify(checklist),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    // checks if access token is still good
    if (response.status === 401) {
      logout()
    }

    // checks if any fields are missing
    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }

    if (response.ok) {
      // console.log('new list added', json)
      setTripList([])
      window.localStorage.removeItem('PREPACK_NEW_CHECKLIST')
      setWaterWeight(0)
      setWaterVolume(0)
      setFoodWeight(0)
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_CHECKLIST', payload: json})
      navigate('/saved-lists/' + json._id)
    }
  }

  // Remove all from checklist
  const handleClick = (e) => {
    e.preventDefault()
    setTripList([])
    setWaterWeight(0)
    setWaterVolume(0)
    setFoodWeight(0)
    setChecklistName('')
    setChecklistNotes('')
    setError(null)
    setEmptyFields([])
  }

  // Handle Weight(lb) to Volume(L)
  const weightToVolume = (e) => {
    e.preventDefault()
    setWaterWeight(e.target.value)
    let volume = Math.round(((e.target.value / 2.2) + Number.EPSILON) * 100) / 100
    setWaterVolume(volume)
  }

  // Handle Volume(L) to Weight(lb)
  const volumeToWeight = (e) => {
    e.preventDefault()
    setWaterVolume(e.target.value)
    let weight = Math.round(((e.target.value * 2.2) + Number.EPSILON) * 100) / 100
    setWaterWeight(weight)
  }

  // Handle Total Weight
  const getTotalWeight = () => {
    //first get the weight (in ounces of all the gear)
    let totalWeight = 0

    trip_list.map(gear => {
      if (gear.weight) {
        totalWeight += gear.weight
      }
      return totalWeight
    })

    //add the water weight after converting it to ounces
    totalWeight += (water_weight * 16)

    //add the food weight
    totalWeight += (food_weight * 16)

    //convert to the string using the helper method
    return (handleWeight(totalWeight))
  }

  return ( 
    <>
      <form className="create-checklist" onSubmit={handleSubmit}>
        <br />
        <p>
          <b>Pack Weight: <i className="weight-italics">{findTotalWeight(trip_list)}</i></b>
        </p>

        <div className={NewListCSS.waterWeight}>
          <label>Water Volume/Weight:</label>
          <input 
            type="number"
            onChange={(e) => volumeToWeight(e)}
            value={water_volume}
            id="water-volume"
            min="0"
            step="0.01"
          />
          <label htmlFor='water-volume'>L</label>
          <input 
            type="number"
            onChange={(e) => weightToVolume(e)}
            value={water_weight}
            id="water-weight"
            min="0"
            step="0.01"
          />
          <label htmlFor='water-weight'>lb</label>
        </div>

        <div className={NewListCSS.foodWeight}>
          <label>Food Weight:</label>
          <input 
            type="number"
            onChange={(e) => setFoodWeight(e.target.value)}
            value={food_weight}
            id="food-weight"
            min="0"
            step="0.01"
          />
          <label htmlFor='food-weight'>lb</label>
        </div>

        <hr style={{width: "350px", marginLeft: "0"}}/>
        <p>
          <b>Total Weight: <i className="weight-italics">{getTotalWeight()}</i></b>
        </p>

        <br/>
        <label htmlFor='name'>Checklist Name</label>
        <input
          type="text" 
          onChange={(e) => setChecklistName(e.target.value)}
          value={checklist_name}
          className={emptyFields.includes('checklist_name') ? `error ${NewListCSS.listName}` : NewListCSS.listName}
          id="name"
        />
        <br/>
        <label htmlFor='notes'>Notes</label>
        <textarea 
          onChange={(e) => setChecklistNotes(e.target.value)}
          value={checklist_notes}
          className={NewListCSS.listTextarea}
          id="notes"
        />
        <br/>
        <button className={NewListCSS.saveList}>Save List</button>
        <button
          className={NewListCSS.deleteList}
          type="button"
          onClick={(e) => handleClick(e)}
        >Remove All</button>
      </form>
      {error && <div className="error list-name">{error}</div>}
    </>
  );
}
 
export default CreateChecklist;