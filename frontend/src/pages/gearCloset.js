import { useClosetContext } from "../hooks/useClosetContext";

// components
import GearDetails from '../components/gearCloset/GearDetails'
import AddGear from "../components/gearCloset/AddGear";

const GearCloset = () => {
  const {closet} = useClosetContext()

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