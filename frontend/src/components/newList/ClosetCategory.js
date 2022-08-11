import { handleCategory } from "../../helpers/utils";
import ClosetList from "./ClosetList";

const ClosetCategory = ({ closet, category, trip_list, setTripList }) => {
  
  return ( 
    <>
      {closet.some(e => e.category === category) && <h3>{handleCategory(category)}</h3>}

      {closet.map((gear) => {
        return gear.category === category &&
          <ClosetList 
            key={gear._id} 
            gear={gear}
            trip_list={trip_list}
            setTripList={setTripList}
          />
      })}
    </> 
   );
}
 
export default ClosetCategory;