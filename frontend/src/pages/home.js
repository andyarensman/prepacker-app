// TODO: Gear should be organized by category

import { useEffect, useState } from "react";
import { useClosetContext } from "../hooks/useClosetContext";

// components
import ClosetCategory from "../components/ClosetCategory";
import TripListCategory from "../components/TripListCategory";

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

  const findTotalWeight = () => {
    let totalWeight = 0

    trip_list.map(gear => {
      if (gear.weight) {
        totalWeight += gear.weight
      }
      return totalWeight
    })

    return handleWeight(totalWeight)
  }

  return ( 
    <div className="home">
      <div>
        <h2>My PrePacker Checklist</h2>
        {trip_list && ['essential', 'container', 'sleep', 'kitchen', 'hygiene', 'clothing', 'personal', 'mountaineering', 'other'].map(e => (
            <TripListCategory
              category={e}
              key={e}
              trip_list={trip_list}
              setTripList={setTripList}
            />
          ))}
          <br/>
          {trip_list.length !== 0 && <p><b>Total Weight: <i className="weight-italics">{findTotalWeight()}</i></b></p>}
          {trip_list.length !== 0 && <button className="save-list">Save List</button>}
      </div>
      <div className="closet-list">
        <h2>My Gear</h2>
        {closet && ['essential', 'container', 'sleep', 'kitchen', 'hygiene', 'clothing', 'personal', 'mountaineering', 'other'].map(e => (
          <ClosetCategory
            closet={closet}
            category={e}
            key={e}
            trip_list={trip_list}
            setTripList={setTripList}
          />
        ))}
        
      </div>
    </div>
   );
}
 
export default Home;