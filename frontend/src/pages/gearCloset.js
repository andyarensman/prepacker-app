import { useEffect } from "react";
import { useClosetContext } from "../hooks/useClosetContext";

// components
import GearDetails from '../components/GearDetails'
import AddGear from "../components/AddGear";

const GearCloset = () => {
  const {closet, dispatch}= useClosetContext()

  //! This is now on the new home page and here. Should it be in the parent instead?
  useEffect(() => {
    const fetchCloset = async () => {
      const response = await fetch('/api/closet')
      const json = await response.json()

      if (response.ok) {
        dispatch({type:'SET_CLOSET', payload: json})
      }
    }

    fetchCloset()
  }, [dispatch])

  return ( 
    <div className="gear-closet">
      <div className="closet">
        {closet && closet.map((gear) => (
          <GearDetails key={gear._id} gear={gear}/>
        ))}
      </div>
      <div>
        <AddGear />
      </div>
    </div>
   );
}
 
export default GearCloset;