import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// helpers, context
import { findTotalWeight } from '../../helpers/utils'
import { useClosetContext } from '../../hooks/useClosetContext'

// css modules
import NewListCSS from '../../styles/newList/newList.module.css'

const EditListForm = ( { id, checklist, gear, setGear } ) => {
  const [checklist_name, setChecklistName] = useState(checklist.checklist_name)
  const [checklist_notes, setChecklistNotes] = useState(checklist.checklist_notes)
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const { dispatch }= useClosetContext()
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

    const updated_checklist = gear.map(x => x._id)

    const response = await fetch('/api/checklist', {
      method: 'PATCH',
      body: JSON.stringify({ multi: false, id, checklist_name, checklist_notes, gear_items: updated_checklist}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()
    if (response.ok) {
      dispatch({type: 'UPDATE_CHECKLIST', payload: json})
      navigate('/saved-lists/' + id)
    }
    if (!response.ok) {
      console.log('not ok')
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
  }

  // Save Copy of List
  const saveCopy = async (e) => {
    e.preventDefault()

    const gear_items = gear.map(x => x._id)

    const newChecklist = {checklist_name, gear_items, checklist_notes}

    const response = await fetch('/api/checklist', {
      method: 'POST',
      body: JSON.stringify(newChecklist),
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
      console.log('new list added', json)
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_CHECKLIST', payload: json})
      navigate('/saved-lists/' + json._id)
    }
  }

  return ( 
    <>
      <form className="create-checklist">
        <br />
        <p>
          <b>Total Weight: <i className="weight-italics">{findTotalWeight(gear)}</i></b>
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