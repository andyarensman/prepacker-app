import { useClosetContext } from "../../hooks/useClosetContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// css module
import ChecklistDetailsCSS from '../../styles/ChecklistDetails.module.css'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import DeleteListModal from './DeleteListModal';

const ChecklistDetails = ({ checklist }) => {
  const [gearNames, setGearNames] = useState([])
  const [hiddenDeleteModal, setHiddenDeleteModal] = useState(true)
  const {closet} = useClosetContext()
  
  useEffect(() => {
    if (checklist.gear_items && closet) {
      let tempArray = []
      closet.forEach(gear => {
        if (checklist.gear_items.includes(gear._id)) {
          tempArray.push(gear.gear_name)
        }
      })
      setGearNames(tempArray)
    }
  }, [checklist, closet])

  return ( 
    <div className={ChecklistDetailsCSS.checklistDetails}>
      <Link to={"/saved-lists/" + checklist._id}><h3>{checklist.checklist_name}</h3></Link>
      <p><strong>Total Items: </strong>{checklist.gear_items.length}</p>
      <p><strong>Total Weight: </strong>{checklist.total_weight}</p>
      {checklist.checklist_notes && <p><strong>Notes: </strong>{checklist.checklist_notes}</p>}
      <p><strong>Gear: </strong>{gearNames.join(" · ")}</p>
      <p>{formatDistanceToNow(new Date(checklist.createdAt), { addSuffix: true })}</p>
      <span className={`material-symbols-outlined ${ChecklistDetailsCSS.editBtn}`}>edit</span>
      <span 
        className={`material-symbols-outlined ${ChecklistDetailsCSS.deleteBtn}`}
        onClick={() => setHiddenDeleteModal(false)}
      >delete</span>
      <DeleteListModal 
        hiddenDeleteModal={hiddenDeleteModal}
        setHiddenDeleteModal={setHiddenDeleteModal}
        checklist={checklist}
      />
    </div>
   );
}
 
export default ChecklistDetails;