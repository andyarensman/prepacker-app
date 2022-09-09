import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// components
import ClosetCategory from '../components/newList/ClosetCategory'

import TitleSearch from '../components/TitleSearch'

// helpers, date fns, context
import { findTotalWeight } from '../helpers/utils'
import format from 'date-fns/format'
import { useClosetContext } from '../hooks/useClosetContext'

// css modules
import NewListCSS from '../styles/newList/newList.module.css'
import TripListCategory from '../components/newList/TripListCategory'
import CreateChecklist from '../components/newList/CreateChecklist'
import EditListForm from '../components/editList/EditListForm'

const EditList = () => {
  const [checklist, setChecklist] = useState(null)
  const [gear, setGear] = useState([])
  const [listWeight, setListWeight] = useState('')

  const [currentSortArr, setCurrentSortArr] = useState([])
  const [alpha, setAlpha] = useState([])

  const { closet, checklists }= useClosetContext()
  let { id } = useParams()

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

  // Set currentSortArr to closet
  useEffect(() => {
    if (closet) {
      const alphaAsc = [...closet].sort((a, b) => a.gear_name.localeCompare(b.gear_name))
      setAlpha([...alphaAsc])
      setCurrentSortArr([...alphaAsc])
    } 
  }, [closet])
  

  return ( 
    <div className={NewListCSS.page}>
      <div>
        {checklist && <h2>Editing: {checklist.checklist_name}</h2>}
        <div className={gear.length > 0 ? NewListCSS.newList : NewListCSS.hidden}>
          {gear && ['essential', 'container', 'sleep', 'kitchen', 'hygiene', 'clothing', 'personal', 'mountaineering', 'other'].map(e => (
            <TripListCategory
              category={e}
              key={e}
              trip_list={gear}
              setTripList={setGear}
            />
          ))}
        </div>
        {gear.length === 0 && (
          <div className={NewListCSS.blankListContainer}>
            <h3 className={NewListCSS.blankList}>Add Gear to Get Started</h3>
          </div>
        )} 
        {gear.length !== 0 && (
          <EditListForm
            id={id}
            checklist={checklist}
            gear={gear}
            setGear={setGear}
          /> 
        )} 
      </div>
      <div className="closet-list">
        <TitleSearch 
          title="My Gear"
          selectNeeded={false}
          containerClass={NewListCSS.closetListHeader}
          searchArr={[...alpha]}
          searchKey="gear_name"
          sort={false}
          setSort={false}
          setCurrentSortArr={setCurrentSortArr}
        />
        {closet && ['essential', 'container', 'sleep', 'kitchen', 'hygiene', 'clothing', 'personal', 'mountaineering', 'other'].map(e => (
          <ClosetCategory
            closet={currentSortArr}
            category={e}
            key={e}
            trip_list={gear}
            setTripList={setGear}
          />
        ))}
      </div>
    </div>
   );
}
 
export default EditList;