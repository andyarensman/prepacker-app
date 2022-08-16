import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useClosetContext } from "../hooks/useClosetContext";

const SavedListDetails = () => {
  const [checklist, setChecklist] = useState(null)
  const { closet }= useClosetContext()
  let { id } = useParams()

  useEffect(() => {
    const fetchSavedLists = async () => {
      const response = await fetch('/api/checklist/' + id)
      const json = await response.json()

      if (response.ok) {
        setChecklist(json)
      }

      //TODO: set error if error
    }

    fetchSavedLists()
  }, [])

  return ( 
    <div className="saved-list-details">
      <p>Now showing {id}</p>
      {checklist && <p>{checklist.gear_items}</p>}
    </div>
   );
}
 
export default SavedListDetails;