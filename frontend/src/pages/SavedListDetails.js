import { useParams } from "react-router-dom";

const SavedListDetails = () => {

  let { id } = useParams()

  return ( 
    <div className="saved-list-details">
      <p>Now showing {id}</p>
    </div>
   );
}
 
export default SavedListDetails;