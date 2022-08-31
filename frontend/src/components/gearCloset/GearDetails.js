// TODO: Need to add any images
// TODO: Only scroll on this component

import { handleCategory, handleWeight } from '../../helpers/utils'
import EditGearModal from './EditGearModal';
import { useState } from 'react';

// css module
import GearDetailsCSS from '../../styles/GearDetails.module.css'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import DeleteGearModal from './DeleteGearModal';

const GearDetails = ({ gear }) => {
  const [hiddenModal, setHiddenModal] = useState(true)
  const [hiddenDeleteModal, setHiddenDeleteModal] = useState(true)

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
        onClick={() => setHiddenDeleteModal(false)}
      >delete</span>
      <EditGearModal
        hiddenModal={hiddenModal}
        setHiddenModal={setHiddenModal}
        gear={gear}
      />
      <DeleteGearModal
        hiddenDeleteModal={hiddenDeleteModal}
        setHiddenDeleteModal={setHiddenDeleteModal}
        gear={gear}
      />
    </div>
   );
}
 
export default GearDetails;