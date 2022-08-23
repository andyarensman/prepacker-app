import { useEffect, useState } from "react";
import ChecklistDetails from "../components/savedLists/ChecklistDetails";
import TitleSearch from "../components/TitleSearch";
import { useClosetContext } from "../hooks/useClosetContext";

// css module
import SavedListsCSS from '../styles/savedLists.module.css'

const SavedLists = () => {
  const [currentSortArr, setCurrentSortArr] = useState([])
  const [alpha, setAlpha] = useState([])

  const { checklists } = useClosetContext()

  useEffect(() => {
    if (checklists) {
      const alphaAsc = [...checklists].sort((a, b) => a.checklist_name.localeCompare(b.checklist_name))
      setAlpha([...alphaAsc])
      setCurrentSortArr([...alphaAsc])
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
    </div>
   );
}
 
export default SavedLists;