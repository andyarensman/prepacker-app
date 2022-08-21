import { useEffect, useState } from "react";
import { useClosetContext } from "../hooks/useClosetContext";

// components
import ClosetCategory from "../components/newList/ClosetCategory";
import TripListCategory from "../components/newList/TripListCategory";

// css modules
import NewListCSS from '../styles/newList.module.css'
import SearchCSS from '../styles/search.module.css'
import CreateChecklist from "../components/newList/CreateChecklist";

const NewList = () => {
  const [trip_list, setTripList] = useState([])
  const [currentSortArr, setCurrentSortArr] = useState([])

  const { closet }= useClosetContext()

  // Set currentSortArr to closet
  useEffect(() => {
    if (closet) {
      setCurrentSortArr([...closet])
    } 
  }, [closet])

  // Fetch trip list from local storage
  useEffect(() =>{
    const data = window.localStorage.getItem('PREPACK_NEW_CHECKLIST')
    if (data !== null) setTripList(JSON.parse(data))
  }, [])

  // Update local storage with trip list data
  useEffect(() =>{
    window.localStorage.setItem('PREPACK_NEW_CHECKLIST', JSON.stringify(trip_list))
  }, [trip_list])

  
  // Search Functionality
  const handleChange = (searchWord) => {

    if (!searchWord) {
      setCurrentSortArr([...closet])
    } else {
      let regex = new RegExp(searchWord, 'i')
      let searchResult = closet.filter(gear => regex.test(gear.gear_name))
      setCurrentSortArr([...searchResult])
    }
  }

  return ( 
    <div className={NewListCSS.page}>
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
        {trip_list.length !== 0 && (
          <CreateChecklist
            trip_list={trip_list}
            setTripList={setTripList}
          /> 
        )}  
      </div>
      <div className="closet-list">
        <div className={NewListCSS.closetListHeader}>
          <h2>My Gear</h2>
          <div className="search-container">
            <form onSubmit={(e) => e.preventDefault()} className={SearchCSS.searchForm}>
              <input 
                type="text"
                placeholder="Search..."
                onChange={(e) => handleChange(e.target.value)}
              />
              <button><span className={`material-symbols-outlined ${SearchCSS.searchSymbol}`}>search</span></button>
            </form>
          </div> 
        </div>
        {closet && ['essential', 'container', 'sleep', 'kitchen', 'hygiene', 'clothing', 'personal', 'mountaineering', 'other'].map(e => (
          <ClosetCategory
            closet={currentSortArr}
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
 
export default NewList;