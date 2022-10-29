//! May need to fix the useEffect hooks here that set the state

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// components
import IndividualListGearCategory from '../components/individualList/IndividualListGearCategory'
import DeleteListModal from '../components/savedLists/DeleteListModal'

// helpers, date fns, context
import { findTotalWeight } from '../helpers/utils'
import format from 'date-fns/format'
import { useClosetContext } from '../hooks/useClosetContext'

//css modules
import SLDetailsCSS from '../styles/individualList/individualList.module.css'


const IndividualList = () => {
  const [checklist, setChecklist] = useState(null)
  const [gear, setGear] = useState([])
  const [listWeight, setListWeight] = useState('')
  const [hiddenDeleteModal, setHiddenDeleteModal] = useState(true)
  const { closet, checklists }= useClosetContext()

  let { id } = useParams()
  const navigate = useNavigate()

  // Get all data
  useEffect(() => {
    const findChecklist = () => {
      let tempChecklist = checklists.find(e => e._id === id)
      setChecklist(tempChecklist)

      if (tempChecklist.gear_items && closet) {
        let tempArray = []
        let tempWeightArr = []
        closet.forEach(e => {
          if (tempChecklist.gear_items.includes(e._id)) {
            tempArray.push(e)
            tempWeightArr.push({weight: e.weight})
          }
        })
        setGear(tempArray)
        setListWeight(findTotalWeight(tempWeightArr))
      }
    }
    
    if (checklists && closet) {
      findChecklist()
    }
    
  }, [checklists, id, closet])

  return (
    <div>
      <div className={SLDetailsCSS.header}>
        <h2>{checklist && checklist.checklist_name}</h2>
        {checklist && (
          <>
            <p className={`${SLDetailsCSS.spacer} ${SLDetailsCSS.hide}`}>•</p>
            <p className={SLDetailsCSS.spacer}>
              <strong>Created: <i className="weight-italics">{format(new Date(checklist.createdAt), "M/dd/yy")}</i></strong>
            </p>
            <p className={SLDetailsCSS.spacer}>•</p>
            <p className={SLDetailsCSS.spacer}>
            <strong>Total Items: <i className="weight-italics">{checklist.gear_items.length}</i></strong>
            </p>
            <p className={SLDetailsCSS.spacer}>•</p>
            <p className={SLDetailsCSS.spacer}>
              <strong>Total Weight: <i className="weight-italics">{listWeight || "N/A"}</i></strong>
            </p>
            <span
              className={`material-symbols-outlined ${SLDetailsCSS.editBtn}`}
              onClick={() => navigate('/saved-lists/edit/' + id)}
            >edit</span>
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
            <IndividualListGearCategory
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
 
export default IndividualList;