import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// components
import ChecklistDetails from '../components/savedLists/ChecklistDetails'
import TitleSearch from '../components/TitleSearch'

// context
import { useClosetContext } from '../hooks/useClosetContext'

// css module
import SavedListsCSS from '../styles/savedLists/savedLists.module.css'
import NewListCSS from '../styles/newList/newList.module.css'


const SavedLists = () => {
  const [currentSortArr, setCurrentSortArr] = useState([])
  const [alpha, setAlpha] = useState([])

  const { checklists } = useClosetContext()

  useEffect(() => {
    if (checklists) {
      const alphaAsc = [...checklists].sort((a, b) => a.checklist_name.localeCompare(b.checklist_name))
      setAlpha([...alphaAsc])
      setCurrentSortArr([...checklists]) //default is new to old
    }
  }, [checklists])

  return ( 
    <div className="saved-lists">
      <TitleSearch 
        title="Saved Lists"
        selectNeeded={false}
        containerClass={SavedListsCSS.savedListsHeader}
        searchArr={[...alpha]}
        searchKey="checklist_name"
        sort={false}
        setSort={false}
        setCurrentSortArr={setCurrentSortArr}
      />
      <div className="checklists">
        {checklists && currentSortArr.map((checklist) => (
          <ChecklistDetails key={checklist._id} checklist={checklist} />
        ))}
      </div>
      {checklists.length === 0 && (
        <div className={NewListCSS.blankListContainer}>
          <h3 className={NewListCSS.blankList}>Create a <Link to="/new-list">New List</Link> or <Link to="/gear-closet">Add Gear</Link> to Get Started</h3>
        </div>
      )}
    </div>
   );
}
 
export default SavedLists;