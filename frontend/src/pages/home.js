import { useEffect } from "react";
import { useClosetContext } from "../hooks/useClosetContext";

// components
import GearDetails from '../components/GearDetails'
import GearForm from "../components/GearForm";

const Home = () => {
  const {closet, dispatch}= useClosetContext()

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
    <div className="home">
      <div className="closet">
        {closet && closet.map((gear) => (
          <GearDetails key={gear._id} gear={gear}/>
        ))}
      </div>
      <GearForm />
    </div>
   );
}
 
export default Home;