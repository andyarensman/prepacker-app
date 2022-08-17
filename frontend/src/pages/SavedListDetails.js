//! Made need to fix the useEffect hooks here that set the state

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SavedListGearCategory from "../components/savedListDetails/savedListGearCategory";
import { useClosetContext } from "../hooks/useClosetContext";

const SavedListDetails = () => {
  const [checklist, setChecklist] = useState(null)
  const [gear, setGear] = useState([])
  const { closet, checklists }= useClosetContext()
  let { id } = useParams()

  useEffect(() => {
    const findChecklist = () => {
      let tempChecklist = checklists.find(e => e._id === id)
      setChecklist(tempChecklist)

      if (tempChecklist.gear_items && closet) {
        let tempArray = []
        closet.forEach(e => {
          if (tempChecklist.gear_items.includes(e._id)) {
            tempArray.push(e)
          }
        })
        setGear(tempArray)
      }
    }
    
    if (checklists) {
      findChecklist()
    }
    
  }, [checklists, id, closet])

  return ( 
    <div className="saved-list-details">
      <h2>{checklist && checklist.checklist_name}</h2>
      {gear && ['essential', 'container', 'sleep', 'kitchen', 'hygiene', 'clothing', 'personal', 'mountaineering', 'other'].map(e => (
        <SavedListGearCategory
          category={e}
          key={e}
          gear={gear}
        />         
      ))}
      <br/>
      {checklist && (
        <p>
          <strong>Total Weight: <i className="weight-italics">{checklist.total_weight}</i></strong>
        </p>
      )}
      {checklist && checklist.checklist_notes && (
        <div>
          <p>
            <strong>Notes:</strong>
          </p>
          <p>{checklist.checklist_notes}</p>
        </div>
        )}
    </div>
   );
}
 
export default SavedListDetails;