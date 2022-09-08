// components
import TripList from './TripList'

// helpers
import { handleCategory } from '../../helpers/utils'


const TripListCategory = ({ category, trip_list, setTripList }) => {
  return ( 
    <>
      {trip_list.some(e => e.category === category) &&
      <div>
        <h3>{handleCategory(category)}</h3>
        {trip_list.map((gear) => {
          return gear.category === category &&
            <TripList 
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
 
export default TripListCategory;