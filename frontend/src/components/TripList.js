//TODO: User should be able to remove items from here as well. Change check_box state to instead look at the trip_list state to see if the corresponding id is there

const TripList = ({trip_list, setTripList, gear}) => {
  return ( 
    <div className="trip-list">
      {gear.gear_name}
    </div>
   );
}
 
export default TripList;