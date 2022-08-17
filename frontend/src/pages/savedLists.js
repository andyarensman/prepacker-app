import ChecklistDetails from "../components/savedLists/ChecklistDetails";
import { useClosetContext } from "../hooks/useClosetContext";

const SavedLists = () => {
  const { checklists } = useClosetContext()

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