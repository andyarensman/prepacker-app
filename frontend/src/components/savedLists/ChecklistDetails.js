import { useClosetContext } from "../../hooks/useClosetContext";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Link } from "react-router-dom";

const ChecklistDetails = ({ checklist }) => {
  const {closet} = useClosetContext()

  return ( 
    <div className="checklist-details">
      <Link to={"/saved-lists/" + checklist._id}><h4>{checklist.checklist_name}</h4></Link>
      <p><strong>Total Items: </strong>{checklist.gear_items.length}</p>
      <p><strong>Total Weight: </strong>{checklist.total_weight}</p>
      {checklist.checklist_notes && <p>{checklist.checklist_notes}</p>}
      <p>{formatDistanceToNow(new Date(checklist.createdAt), { addSuffix: true })}</p>
    </div>
   );
}
 
export default ChecklistDetails;