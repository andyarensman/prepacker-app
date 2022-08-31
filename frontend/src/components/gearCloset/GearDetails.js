// TODO: Need to add any images
// TODO: Only scroll on this component
import { useClosetContext } from '../../hooks/useClosetContext'
import { handleCategory, handleWeight } from '../../helpers/utils'
import EditGearModal from './EditGearModal';
import { useState } from 'react';

// css module
import GearDetailsCSS from '../../styles/GearDetails.module.css'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const GearDetails = ({ gear }) => {
  const [hiddenModal, setHiddenModal] = useState(true)
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
    <div className={GearDetailsCSS.gearDetails}>
      <h3>{gear.gear_name}</h3>
      {gear.weight && <p><strong>Weight: </strong>{handleWeight(gear.weight)}</p>}
      {gear.category && <p><strong>Category: </strong>{handleCategory(gear.category)}</p>}
      {gear.website && <p><strong>Product Page: </strong><a href={gear.website} target="_blank" rel="noreferrer">REI</a></p>}
      {gear.price && <p><strong>Price: </strong>${gear.price}</p>}
      {gear.notes && <p><strong>Notes: </strong>{gear.notes}</p>}
      <p>{formatDistanceToNow(new Date(gear.createdAt), { addSuffix: true })}</p>
      {/* {gear.image_url && <img src={gear.image_url} alt={"Image: " + gear.gear_name} className="gear-image"/>} */}
      <span
        className={`material-symbols-outlined ${GearDetailsCSS.editBtn}`}
        onClick={() => setHiddenModal(false)}
      >edit</span>
      <span
        className={`material-symbols-outlined ${GearDetailsCSS.deleteBtn}`}
        onClick={handleClick}
      >delete</span>
      <EditGearModal
        hiddenModal={hiddenModal}
        setHiddenModal={setHiddenModal}
        gear={gear}
      />
    </div>
   );
}
 
export default GearDetails;