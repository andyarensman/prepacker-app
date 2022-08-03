//TODO: User should be able to remove items from here as well. Change check_box state to instead look at the trip_list state to see if the corresponding id is there

const TripList = ({trip_list, setTripList}) => {
  return ( 
    <div className="trip-list">
      <h2>My PrePacker Checklist</h2>
      {trip_list && trip_list.map((gear) => (
        <div key={gear._id}>{gear.gear_name}</div>
      ))}
    </div>
   );
}
 
export default TripList;