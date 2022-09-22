import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// helpers, context
import { findTotalWeight } from '../../helpers/utils'
import { useClosetContext } from '../../hooks/useClosetContext'
import { useAuthContext } from '../../hooks/useAuthContext'

// css modules
import NewListCSS from '../../styles/newList/newList.module.css'


const CreateChecklist = ({ trip_list, setTripList }) => {
  const [checklist_name, setChecklistName] = useState('')
  const [checklist_notes, setChecklistNotes] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const { dispatch }= useClosetContext()
  const { user } = useAuthContext()
  const navigate = useNavigate()

  // Submit Checklist 
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    let gear_items = trip_list.map(e => e._id)

    const checklist = {checklist_name, gear_items, checklist_notes}

    const response = await fetch('/api/checklist', {
      method: 'POST',
      body: JSON.stringify(checklist),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if (!response.ok) {
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
  const handleClick = (e) => {
    e.preventDefault()
    setTripList([])
    setChecklistName('')
    setChecklistNotes('')
    setError(null)
    setEmptyFields([])
  }

  return ( 
    <>
      <form className="create-checklist" onSubmit={handleSubmit}>
        <br />
        <p>
          <b>Total Weight: <i className="weight-italics">{findTotalWeight(trip_list)}</i></b>
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