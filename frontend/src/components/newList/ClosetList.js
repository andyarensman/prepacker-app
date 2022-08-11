import { handleWeight } from "../../helpers/utils"

const ClosetList = ({ gear, trip_list, setTripList }) => {

  const handleClick = () => {
    if (checkTripList() === '+') {
      let new_trip_list = [...trip_list, gear]

      setTripList(new_trip_list)
    } else if (checkTripList() === '-') {
      let index = trip_list.findIndex(x => x._id === gear._id)

      let new_trip_list = trip_list.filter((e, i) => i !== index)

      setTripList(new_trip_list)
    }
  }

  // Check if gear is in trip_list
  const checkTripList = () => {
    if (trip_list.some(e => e === gear)) {
      return ('-')
    } else {
      return ('+')
    }
  }

  return ( 
    <div className="closet-list-item"><button onClick={() => handleClick()}>{checkTripList()}</button> {gear.gear_name} {gear.weight && <i className="weight-italics">({handleWeight(gear.weight)})</i>}</div>
   );
}
 
export default ClosetList;