import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// helpers, context
import { findTotalWeight, handleWeight, weightToVolumeHelper } from '../../helpers/utils'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useClosetContext } from '../../hooks/useClosetContext'
import { useLogout } from '../../hooks/useLogout'

// css modules
import NewListCSS from '../../styles/newList/newList.module.css'

const EditListForm = ( { id, checklist, gear, setGear } ) => {
  const [water_weight, setWaterWeight] = useState(checklist.water_weight)
  const [water_volume, setWaterVolume] = useState(weightToVolumeHelper(checklist.water_weight))
  const [food_weight, setFoodWeight] = useState(checklist.food_weight)

  const [checklist_name, setChecklistName] = useState(checklist.checklist_name)
  const [checklist_notes, setChecklistNotes] = useState(checklist.checklist_notes)
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const { dispatch }= useClosetContext()
  const { user } = useAuthContext()
  const { logout } = useLogout()
  const navigate = useNavigate()

  // Remove all gear from checklist
  const removeAllGear = (e) => {
    e.preventDefault()
    setGear([])
    setError(null)
    setEmptyFields([])
  }

  // Save List
  const saveList = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const updated_checklist = gear.map(x => x._id)

    const response = await fetch(process.env.REACT_APP_BACKEND + '/api/checklist', {
      method: 'PATCH',
      body: JSON.stringify({ multi: false, id, checklist_name, checklist_notes, gear_items: updated_checklist}),
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

    if (response.ok) {
      dispatch({type: 'UPDATE_CHECKLIST', payload: json})
      navigate('/saved-lists/' + id)
    }

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
  }

  // Save Copy of List
  const saveCopy = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const gear_items = gear.map(x => x._id)

    const newChecklist = {checklist_name, gear_items, checklist_notes}

    const response = await fetch(process.env.REACT_APP_BACKEND + '/api/checklist', {
      method: 'POST',
      body: JSON.stringify(newChecklist),
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
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_CHECKLIST', payload: json})
      navigate('/saved-lists/' + json._id)
    }
  }

  // Handle Weight(lb) to Volume(L)
  const weightToVolume = (e) => {
    e.preventDefault()
    setWaterWeight(e.target.value)
    let volume = Math.round(((e.target.value / 2.2) + Number.EPSILON) * 100) / 100
    setWaterVolume(volume)
  }

  // Handle Volume(L) to Weight(lb)
    //multiple the volume by 33.814
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

    gear.map(gears => {
      if (gears.weight) {
        totalWeight += gears.weight
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
      <form className="create-checklist">
        <br />
        <p>
          <b>Pack Weight: <i className="weight-italics">{findTotalWeight(gear)}</i></b>
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

        <p>
          <b>Total Weight: <i className="weight-italics">{getTotalWeight()}</i></b>
        </p>

        <br/>
        <label htmlFor='name'>Edit Checklist Name</label>
        <input
          type="text" 
          onChange={(e) => setChecklistName(e.target.value)}
          value={checklist_name}
          className={emptyFields.includes('checklist_name') ? `error ${NewListCSS.listName}` : NewListCSS.listName}
          id="name"
        />
        <br/>
        <label htmlFor='notes'>Edit Notes</label>
        <textarea 
          onChange={(e) => setChecklistNotes(e.target.value)}
          value={checklist_notes}
          className={NewListCSS.listTextarea}
          id="notes"
        />
        <br/>
        <button
          className={NewListCSS.saveList}
          type="button"
          onClick={(e) => saveList(e)}
        >Save List</button>
        <button
          className={NewListCSS.saveCopy}
          type="button"
          onClick={(e) => saveCopy(e)}
        >Save As New List</button>
        <button 
          className={NewListCSS.deleteList}
          type="button"
          onClick={(e) => removeAllGear(e)}
        >Remove All Gear</button>
        <button
          className={NewListCSS.deleteList}
          type="button"
          onClick={() => navigate(-1)}
        >Cancel</button>
      </form>
      {error && <div className="error list-name">{error}</div>}
    </>
   );
}
 
export default EditListForm;