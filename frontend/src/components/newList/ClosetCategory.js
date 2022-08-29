import { handleCategory } from '../../helpers/utils'
import ClosetList from './ClosetList'

import NewListCSS from '../../styles/newList.module.css'

const ClosetCategory = ({ closet, category, trip_list, setTripList }) => {
  
  return (
    <>
      {closet.some(e => e.category === category) &&
        <div className={NewListCSS.closet}>
          <h3>{handleCategory(category)}</h3>
          {[...closet].sort((a, b) => a.gear_name.localeCompare(b.gear_name)).map((gear) => {
            return gear.category === category &&
              <ClosetList 
                key={gear._id} 
                gear={gear}
                trip_list={trip_list}
                setTripList={setTripList}
              />
          })}
        </div>       
      }
    </>
   );
}
 
export default ClosetCategory;