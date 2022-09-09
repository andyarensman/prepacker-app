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
        <button className={NewListCSS.saveList}>Save List</button>
        <button className={NewListCSS.saveList}>Save As</button>
        <button className={NewListCSS.deleteList} type="button">Remove All</button>
        <button className={NewListCSS.deleteList} type="button">Cancel</button>
      </form>
      {error && <div className="error list-name">{error}</div>}
    </>
   );
}
 
export default EditListForm;