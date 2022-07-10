// TODO: Need to add any other gear information here. Images, etc.
import { useClosetContext } from "../hooks/useClosetContext";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const GearDetails = ({ gear }) => {

  const { dispatch } = useClosetContext()

  const handleClick = async () => {
    const response = await fetch('/api/closet/' + gear._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_GEAR', payload: json})
    }
  }

  return ( 
    <div className="gear-details">
      <h4>{gear.gear_name}</h4>
      {gear.weight && <p><strong>Weight (lbs): </strong>{gear.weight}</p>}
      {gear.price && <p><strong>Price ($): </strong>{gear.price}</p>}
      <p>{formatDistanceToNow(new Date(gear.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
   );
}
 
export default GearDetails;