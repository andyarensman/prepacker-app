// This page will retrieve all saved lists from mongodb and display a shorter version of them somehow. Then the user can click the list to see more details, start checking things off
//TODO: Change to using context for better loading?


import ChecklistDetails from "../components/savedLists/ChecklistDetails";
import { useClosetContext } from "../hooks/useClosetContext";

const SavedLists = () => {
  // const [checklists, setChecklists] = useState(null)
  const { checklists } = useClosetContext()

  // // Getting the saved lists
  // useEffect(() => {
  //   const fetchSavedLists = async () => {
  //     const response = await fetch('/api/checklist')
  //     const json = await response.json()

  //     if (response.ok) {
  //       dispatch({type:'SET_CHECKLISTS', payload: json})
  //     }
  //   }

  //   fetchSavedLists()
  // }, [dispatch])

  return ( 
    <div className="saved-lists">
      <h2>Saved Lists</h2>
      <div className="checklists">
        {checklists && checklists.map((checklist) => (
          <ChecklistDetails key={checklist._id} checklist={checklist} />
        ))}
      </div>
    </div>
   );
}
 
export default SavedLists;