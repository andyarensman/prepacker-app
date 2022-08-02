//TODO: User should be able to remove items from here as well

const TripList = ({trip_list, setTripList}) => {
  return ( 
    <div className="trip-list">
      <h2>Hello</h2>
      {trip_list && trip_list.map((gear) => (
        <div key={gear._id}>{gear.gear_name}</div>
      ))}
    </div>
   );
}
 
export default TripList;