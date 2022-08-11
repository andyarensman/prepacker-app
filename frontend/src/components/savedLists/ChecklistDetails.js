import { useClosetContext } from "../../hooks/useClosetContext";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ChecklistDetails = ({ checklist }) => {
  const [gearNames, setGearNames] = useState([])
  const {closet} = useClosetContext()

  useEffect(() => {
    if (checklist.gear_items) {
      let tempArray = []
      closet.map(gear => {
        if (checklist.gear_items.includes(gear._id)) {
          tempArray.push(gear.gear_name)
        }
      })
      setGearNames(tempArray)
    }
  }, [])

  return ( 
    <div className="checklist-details">
      <Link to={"/saved-lists/" + checklist._id}><h4>{checklist.checklist_name}</h4></Link>
      <p><strong>Total Items: </strong>{checklist.gear_items.length}</p>
      <p><strong>Total Weight: </strong>{checklist.total_weight}</p>
      {checklist.checklist_notes && <p><strong>Notes: </strong>{checklist.checklist_notes}</p>}
      <p><strong>Gear: </strong>{gearNames.join(" · ")}</p>
      <p>{formatDistanceToNow(new Date(checklist.createdAt), { addSuffix: true })}</p>
    </div>
   );
}
 
export default ChecklistDetails;