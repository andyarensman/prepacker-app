import { useEffect, useState } from "react";

// components
import GearDetails from '../components/GearDetails'

const Home = () => {

  const [closet, setCloset] = useState(null)

  useEffect(() => {
    const fetchCloset = async () => {
      const response = await fetch('/api/closet')
      const json = await response.json()

      if (response.ok) {
        setCloset(json)
      }
    }

    fetchCloset()
  }, [])

  return ( 
    <div className="home">
      <div className="closet">
        {closet && closet.map((gear) => (
          <GearDetails key={gear._id} gear={gear}/>
        ))}
      </div>
    </div>
   );
}
 
export default Home;