import { useClosetContext } from "../../hooks/useClosetContext";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ChecklistDetails = ({ checklist }) => {
  const {closet} = useClosetContext()

  return ( 
    <div className="checklist-details">
      <h4>{checklist.checklist_name}</h4>
      <p><strong>Total Items: </strong>{checklist.gear_items.length}</p>
      <p><strong>Total Weight: </strong></p>
      {checklist.checklist_notes && <p>{checklist.checklist_notes}</p>}
      <p>{formatDistanceToNow(new Date(checklist.createdAt), { addSuffix: true })}</p>
    </div>
   );
}
 
export default ChecklistDetails;