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

  const handleWeight = (weight) => {
    let pounds = Math.floor(weight/16)
    let ouncesNoRound = (weight - (Math.floor(weight/16))*16)
    let ounces = Math.round(ouncesNoRound * 10) / 10

    if (pounds !== 0 && ounces !== 0) {
      return (`${pounds} lb ${ounces} oz`)
    }
    if (pounds === 0 && ounces !== 0) {
      return (`${ounces} oz`)
    }
    if (pounds !== 0 && ounces === 0) {
      return (`${pounds} lb`)
    }
    if (pounds === 0 && ounces === 0) {
      return ('N/A')
    }
  }

  return ( 
    <div className="gear-details">
      <h4>{gear.gear_name}</h4>
      {gear.weight && <p><strong>Weight: </strong>{handleWeight(gear.weight)}</p>}
      {gear.website && <p><strong>Product Page: </strong><a href={gear.website} target="_blank">Link</a></p>}
      {gear.price && <p><strong>Price ($): </strong>{gear.price}</p>}
      <p>{formatDistanceToNow(new Date(gear.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
   );
}
 
export default GearDetails;