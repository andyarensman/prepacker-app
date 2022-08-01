import { useEffect } from "react";
import { useClosetContext } from "../hooks/useClosetContext";

// components

const Home = () => {
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
    <div className="home">
      <div className="trip-list"></div>
      <div className="closet-list"></div>
    </div>
   );
}
 
export default Home;