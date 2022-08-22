import { useEffect, useState } from "react"
import { handleWeight } from "../../helpers/utils"

const ClosetList = ({ gear, trip_list, setTripList }) => {
  const [inList, setInList] = useState(true)

  useEffect(() => {
    if (trip_list.some(e => e === gear)) {
      setInList(true)
      console.log('is in')
    } else {
      setInList(false)
    }
    
  }, [trip_list, gear])


  const handleClick = () => {
    if (!inList) {
      let new_trip_list = [...trip_list, gear]

      setTripList(new_trip_list)
    } else if (inList) {
      let index = trip_list.findIndex(x => x._id === gear._id)

      let new_trip_list = trip_list.filter((e, i) => i !== index)

      setTripList(new_trip_list)
    }
  }

  return ( 
    <div className="closet-list-item">
      <span onClick={() => handleClick()}className="material-symbols-outlined cancel">{inList ? 'do_not_disturb_on' : 'add_circle'}</span> 
      {gear.gear_name} {gear.weight && <i className="weight-italics">({handleWeight(gear.weight)})</i>}
    </div>
   );
}
 
export default ClosetList;