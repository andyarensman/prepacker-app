const TripList = ({trip_list, setTripList, gear}) => {

  //! This is on the home page, GearDetails component, and TripList component
  const handleWeight = (weight) => {
    let pounds = Math.floor(weight/16)
    let ouncesNoRound = (weight - (Math.floor(weight/16))*16)
    let ounces = Math.round(ouncesNoRound * 10) / 10

    if (pounds !== 0 && ounces !== 0) {
      return (`${pounds} lb ${ounces} oz`)
    }
    if (pounds === 0 && ounces !== 0) {
      return (`${ounces} oz`)
    }
    if (pounds !== 0 && ounces === 0) {
      return (`${pounds} lb`)
    }
    if (!pounds && !ounces) {
      return ('N/A')
    }
  }

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