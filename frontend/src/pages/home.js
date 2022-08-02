// TODO: Gear should be organized by category

import { useEffect, useState } from "react";
import { useClosetContext } from "../hooks/useClosetContext";

// components
import ClosetList from "../components/ClosetList";
import TripList from "../components/TripList";

const Home = () => {
  const [trip_list, setTripList] = useState([])
  const {closet, dispatch}= useClosetContext()
  // console.log(closet)

  //! This is now on the closet page and here. Should it be in the parent instead?
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
      <div>
        <TripList 
          trip_list={trip_list}
          setTripList={setTripList}
        />
      </div>
      <div className="closet-list">
      {closet && closet.map((gear) => (
          <ClosetList 
            key={gear._id} 
            gear={gear}
            trip_list={trip_list}
            setTripList={setTripList}
          />
        ))}
      </div>
    </div>
   );
}
 
export default Home;