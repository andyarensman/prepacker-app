import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// components
import DeleteListModal from './DeleteListModal'

// helpers, date fns, context
import { findTotalWeight } from '../../helpers/utils'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useClosetContext } from '../../hooks/useClosetContext'

// css modules
import ChecklistDetailsCSS from '../../styles/savedLists/ChecklistDetails.module.css'


const ChecklistDetails = ({ checklist }) => {
  const [gearNames, setGearNames] = useState([])
  const [listWeight, setListWeight] = useState('')
  const [hiddenDeleteModal, setHiddenDeleteModal] = useState(true)

  const {closet} = useClosetContext()
  const navigate = useNavigate()
  
  // get gear_names and total weight
  useEffect(() => {
    if (checklist.gear_items && closet) {
      let tempArray = []
      let tempWeightArr = []
      closet.forEach(gear => {
        if (checklist.gear_items.includes(gear._id)) {
          tempArray.push(gear.gear_name)
          tempWeightArr.push({weight: gear.weight})
        }
      })
      setGearNames(tempArray)
      setListWeight(findTotalWeight(tempWeightArr))
    }
  }, [checklist, closet])

  return ( 
    <div className={ChecklistDetailsCSS.checklistDetails}>
      <Link to={"/saved-lists/" + checklist._id}><h3>{checklist.checklist_name}</h3></Link>
      <p><strong>Total Items: </strong>{checklist.gear_items.length}</p>
      <p><strong>Pack Weight: </strong>{listWeight || "N/A"}</p>
      {checklist.checklist_notes && <p><strong>Notes: </strong>{checklist.checklist_notes}</p>}
      <p><strong>Gear: </strong>{gearNames.join(" · ") || "None"}</p>
      <p>{formatDistanceToNow(new Date(checklist.createdAt), { addSuffix: true })}</p>
      <span
        className={`material-symbols-outlined ${ChecklistDetailsCSS.editBtn}`}
        onClick={() => navigate('/saved-lists/edit/' + checklist._id)}
      >edit</span>
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