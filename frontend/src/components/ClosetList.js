import { useState } from "react";

const ClosetList = ({ gear, trip_list, setTripList }) => {
  const [check_box, setCheckBox] = useState('+')

  const handleClick = () => {
    if (check_box === '+') {
      setCheckBox('-')

      let new_trip_list = [...trip_list, gear]
      setTripList(new_trip_list)
    } else if (check_box === '-') {
      setCheckBox('+')
      let index = trip_list.findIndex(x => x._id === gear._id)

      let new_trip_list = trip_list.filter((e, i) => i !== index)
      setTripList(new_trip_list)
    }
  }

  return ( 
    <div className="closet-list-item"><button onClick={() => handleClick()}>{check_box}</button> {gear.gear_name}</div>
   );
}
 
export default ClosetList;