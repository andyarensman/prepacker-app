import { useClosetContext } from "../../hooks/useClosetContext";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { findTotalWeight } from "../../helpers/utils";
import { useEffect, useState } from "react";

const ChecklistDetails = ({ checklist }) => {
  const {closet, dispatch} = useClosetContext()
  const [weight, setWeight] = useState('')

  // useEffect(() => {
  //   const getItems = (idArray) => {
  //     let items = []
  //     closet.map(gear => {
  //       if (idArray.includes(gear._id)) {
  //         items.push(gear)
  //       }
  //     })
  //     return items
  //   }

  //   setWeight(findTotalWeight(getItems(checklist.gear_items)))
  // }, [])

  
  return ( 
    <div className="checklist-details">
      <h4>{checklist.checklist_name}</h4>
      <p><strong>Total Items: </strong>{checklist.gear_items.length}</p>
      <p><strong>Total Weight: </strong>{weight}</p>
      {checklist.checklist_notes && <p>{checklist.checklist_notes}</p>}
      <p>{formatDistanceToNow(new Date(checklist.createdAt), { addSuffix: true })}</p>
    </div>
   );
}
 
export default ChecklistDetails;