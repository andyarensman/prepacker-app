//! May need to fix the useEffect hooks here that set the state

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// components
import IndividualListGearCategory from '../components/individualList/IndividualListGearCategory'
import DeleteListModal from '../components/savedLists/DeleteListModal'

// helpers, date fns, context
import { findTotalWeight, handleWeight } from '../helpers/utils'
import format from 'date-fns/format'
import { useClosetContext } from '../hooks/useClosetContext'

//css modules
import SLDetailsCSS from '../styles/individualList/individualList.module.css'


const IndividualList = () => {
  const [checklist, setChecklist] = useState(null)
  const [gear, setGear] = useState([])
  const [listWeight, setListWeight] = useState('')
  const [water_volume, setWaterVolume] = useState(null)
  const [food_weight, setFoodWeight] = useState(null)
  const [total_weight, setTotalWeight] = useState(null)
  const [hiddenDeleteModal, setHiddenDeleteModal] = useState(true)
  const { closet, checklists }= useClosetContext()

  let { id } = useParams()
  const navigate = useNavigate()

  // Get all data
  useEffect(() => {
    const findChecklist = () => {
      let tempChecklist = checklists.find(e => e._id === id)
      setChecklist(tempChecklist)

      let tempWeightArr = []
      if (tempChecklist.gear_items && closet) {
        let tempArray = []
        
        closet.forEach(e => {
          if (tempChecklist.gear_items.includes(e._id)) {
            tempArray.push(e)
            tempWeightArr.push({weight: e.weight})
          }
        })
        setGear(tempArray)
        setListWeight(findTotalWeight(tempWeightArr))
      }

      let waterWeight = 0
      if (tempChecklist.water_weight && closet) {
        waterWeight = tempChecklist.water_weight
        let volume = Math.round(((waterWeight / 2.2) + Number.EPSILON) * 100) / 100
        setWaterVolume(volume)
      }

      let foodWeight = 0
      if (tempChecklist.food_weight && closet) {
        foodWeight = tempChecklist.food_weight
        setFoodWeight(foodWeight)
      }

      // If there's food and/or water, get total weight
      if (tempChecklist.gear_items && (waterWeight > 0 || foodWeight > 0)) {
        let totalWeight = 0
        tempWeightArr.forEach(gear => {
          if (gear.weight) {
            totalWeight += gear.weight
          }
        })

        //add the water weight after converting it to ounces
        totalWeight += (waterWeight * 16)

        //add the food weight
        totalWeight += (foodWeight * 16)

        //convert to the string using the helper method
        setTotalWeight(handleWeight(totalWeight))
      }
    }
    
    if (checklists && closet) {
      findChecklist()
    }
    
  }, [checklists, id, closet])

  return (
    <div>
      <div className={SLDetailsCSS.title}>
        <h2 className={SLDetailsCSS.checklistName}>{checklist && checklist.checklist_name}</h2>

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
      </div>
      <div className={SLDetailsCSS.header}>
        {checklist && (
          <>
            <p className={SLDetailsCSS.spacer}>
              <strong>Created: <i className="weight-italics">{format(new Date(checklist.createdAt), "M/dd/yy")}</i></strong>
            </p>
            <p className={SLDetailsCSS.spacer}>•</p>
            <p className={SLDetailsCSS.spacer}>
            <strong>Total Items: <i className="weight-italics">{checklist.gear_items.length}</i></strong>
            </p>
            {food_weight && (
              <>
                <p className={SLDetailsCSS.spacer}>•</p>
                <p className={SLDetailsCSS.spacer}>
                  <strong>Food: <i className="weight-italics">{food_weight} lb</i></strong>
                </p>
              </>
            )}
            {water_volume && (
              <>
                <p className={SLDetailsCSS.spacer}>•</p>
                <p className={SLDetailsCSS.spacer}>
                  <strong>Water: <i className="weight-italics">{water_volume} L</i></strong>
                </p>
              </>
            )}
            <p className={SLDetailsCSS.spacer}>•</p>
            <p className={SLDetailsCSS.spacer}>
              <strong>Pack Weight: <i className="weight-italics">{listWeight || "N/A"}</i></strong>
            </p>
            {total_weight && (
              <>
                <p className={SLDetailsCSS.spacer}>•</p>
                <p className={SLDetailsCSS.spacer}>
                  <strong>Total Weight: <i className="weight-italics">{total_weight}</i></strong>
                </p>
              </>
            )}
            
            
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