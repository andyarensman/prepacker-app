// TODO: Need to add other things to the form

import { useState } from "react";
import { useClosetContext } from "../hooks/useClosetContext";

const GearForm = () => {
  const { dispatch } = useClosetContext()

  const [gear_name, setGearName] = useState('')
  const [weight, setWeight] = useState('')
  const [price, setPrice] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const gear = {gear_name, weight, price}

    const response = await fetch('/api/closet', {
      method: 'POST',
      body: JSON.stringify(gear),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }

    if (response.ok) {
      setGearName('')
      setPrice('')
      setWeight('')
      setError(null)
      setEmptyFields([])
      console.log('new workout added', json)
      dispatch({type: 'CREATE_GEAR', payload: json})
    }
  }

  return ( 
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Piece of Gear</h3>

      <label>Gear Name:</label>
      <input 
        type="text"
        onChange={(e) => setGearName(e.target.value)}
        value={gear_name}
        className={emptyFields.includes('gear_name') ? 'error' : ''}
      />

      <label>Weight (lbs):</label>
      <input 
        type="number"
        onChange={(e) => setWeight(e.target.value)}
        value={weight}
      />

      <label>Price ($):</label>
      <input 
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      <button>Add Gear to Closet</button>
      {error && <div className="error">{error}</div>}
    </form>
   );
}
 
export default GearForm;