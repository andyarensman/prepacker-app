import { handleWeight } from "../../helpers/utils"

const TripList = ({trip_list, setTripList, gear}) => {

  // Remove from List
  const handleClick = () => {
    let index = trip_list.findIndex(x => x._id === gear._id)

    let new_trip_list = trip_list.filter((e, i) => i !== index)

    setTripList(new_trip_list)
    
  }

  return ( 
    <div className="trip-list">
      {gear.gear_name} {gear.weight && <i className="weight-italics">({handleWeight(gear.weight)}) </i>}
      <span className="material-symbols-outlined cancel" onClick={handleClick}>cancel</span>
    </div>
   );
}
 
export default TripList;