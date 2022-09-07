//! May need to fix the useEffect hooks here that set the state

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SavedListGearCategory from "../components/savedListDetails/savedListGearCategory";
import { useClosetContext } from "../hooks/useClosetContext";

import format from 'date-fns/format'

//css modules
import SLDetailsCSS from "../styles/savedListDetails.module.css"
import DeleteListModal from '../components/savedLists/DeleteListModal';

const SavedListDetails = () => {
  const [checklist, setChecklist] = useState(null)
  const [gear, setGear] = useState([])
  const [hiddenDeleteModal, setHiddenDeleteModal] = useState(true)
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
    <div>
      <div className={SLDetailsCSS.header}>
        <h2>{checklist && checklist.checklist_name}</h2>
        {checklist && (
          <>
            <p className={SLDetailsCSS.spacer}>•</p>
            <p className={SLDetailsCSS.spacer}>
              <strong>Created: <i className="weight-italics">{format(new Date(checklist.createdAt), "M/dd/yy")}</i></strong>
            </p>
            <p className={SLDetailsCSS.spacer}>•</p>
            <p className={SLDetailsCSS.spacer}>
            <strong>Total Items: <i className="weight-italics">{checklist.gear_items.length}</i></strong>
            </p>
            <p className={SLDetailsCSS.spacer}>•</p>
            <p className={SLDetailsCSS.spacer}>
              <strong>Total Weight: <i className="weight-italics">{checklist.total_weight}</i></strong>
            </p>
            <span className={`material-symbols-outlined ${SLDetailsCSS.editBtn}`}>edit</span>
            <span
              className={`material-symbols-outlined ${SLDetailsCSS.deleteBtn}`}
              onClick={() => setHiddenDeleteModal(false)}
            >delete</span>
            <DeleteListModal 
              hiddenDeleteModal={hiddenDeleteModal}
              setHiddenDeleteModal={setHiddenDeleteModal}
              checklist={checklist}
            />
          </>
        )}
      </div>
      <div className={SLDetailsCSS.savedListDetails}>
        <>
          {gear && ['essential', 'container', 'sleep', 'kitchen', 'hygiene', 'clothing', 'personal', 'mountaineering', 'other'].map(e => (
            <SavedListGearCategory
              category={e}
              key={e}
              gear={gear}
            />         
          ))}
          {checklist && checklist.checklist_notes && (
            <p className={SLDetailsCSS.notes}>
              <strong>Notes: </strong>{checklist.checklist_notes}
            </p>
          )}
        </>
        
      </div>
    </div>
   );
}
 
export default SavedListDetails;