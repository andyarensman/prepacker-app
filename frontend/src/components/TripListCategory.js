import TripList from "../components/TripList";

const TripListCategory = ({ category, trip_list, setTripList }) => {
  const handleCategory = (category) => {

    switch (category) {
        case("clothing"):
            return ("Clothing")
        case ("container"):
          return ("BackPack/Container")
        case ("essential"):
          return ("Essential Tools")
        case ("hygiene"):
          return ("Hygiene/Care")
        case ("kitchen"):
          return ("Kitchen")
        case ("sleep"):
          return ("Sleep System")
        case ("personal"):
          return ("Personal Item")
        case ("mountaineering"):
          return ("Mountaineering")
        case ("other"):
          return ("Other")
        default:
          return ("None")
    }
  }

  return ( 
    <>
      {trip_list.some(e => e.category === category) && <h3>{handleCategory(category)}</h3>}

      
      {trip_list.map((gear) => {
        return gear.category === category &&
          <TripList 
            key={gear._id} 
            gear={gear}
            trip_list={trip_list}
            setTripList={setTripList}
          />
        
      })}
    </> 
   );
}
 
export default TripListCategory;