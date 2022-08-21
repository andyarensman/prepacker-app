import { useEffect, useState } from "react";
import ChecklistDetails from "../components/savedLists/ChecklistDetails";
import { useClosetContext } from "../hooks/useClosetContext";

// css module
import SavedListsCSS from '../styles/savedLists.module.css'
import SearchCSS from '../styles/search.module.css'

const SavedLists = () => {
  const [currentSortArr, setCurrentSortArr] = useState([])

  const { checklists } = useClosetContext()

  useEffect(() => {
    if (checklists) {
      setCurrentSortArr([...checklists])
    }
  }, [checklists])

  // Search Functionality
  const handleChange = (searchWord) => {
    if (!searchWord) {
      setCurrentSortArr([...checklists])
    } else {
      let regex = new RegExp(searchWord, 'i')
      let searchResult = checklists.filter(list => regex.test(list.checklist_name))
      setCurrentSortArr([...searchResult])
    }
  }

  return ( 
    <div className="saved-lists">
      <div className={SavedListsCSS.savedListsHeader}>
        <h2 className="search-header">Saved Lists</h2>
        <form onSubmit={(e) => e.preventDefault()} className={SearchCSS.searchForm}>
          <input 
            type="text"
            placeholder="Search..."
            onChange={(e) => handleChange(e.target.value)}
          />
          <button><span className={`material-symbols-outlined ${SearchCSS.searchSymbol}`}>search</span></button>
        </form>
      </div>
      <div className="checklists">
        {checklists && currentSortArr.map((checklist) => (
          <ChecklistDetails key={checklist._id} checklist={checklist} />
        ))}
      </div>
    </div>
   );
}
 
export default SavedLists;