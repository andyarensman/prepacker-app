import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// components
import ClosetCategory from '../components/newList/ClosetCategory'
import TripListCategory from '../components/newList/TripListCategory'
import CreateChecklist from '../components/newList/CreateChecklist'
import TitleSearch from '../components/TitleSearch'

// context
import { useClosetContext } from '../hooks/useClosetContext'

// css modules
import NewListCSS from '../styles/newList/newList.module.css'

const NewList = () => {
  const [trip_list, setTripList] = useState([])
  const [currentSortArr, setCurrentSortArr] = useState([])
  const [alpha, setAlpha] = useState([])

  const { closet } = useClosetContext()

  // Set currentSortArr to closet
  useEffect(() => {
    if (closet) {
      const alphaAsc = [...closet].sort((a, b) => a.gear_name.localeCompare(b.gear_name))
      setAlpha([...alphaAsc])
      setCurrentSortArr([...alphaAsc])
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

  return ( 
    <div className={NewListCSS.page}>
      <div>
        <h2>My PrePacker Checklist</h2>
        <div className={trip_list.length > 0 ? NewListCSS.newList : NewListCSS.hidden}>
          {trip_list && ['essential', 'container', 'sleep', 'kitchen', 'hygiene', 'clothing', 'personal', 'mountaineering', 'other'].map(e => (
            <TripListCategory
              category={e}
              key={e}
              trip_list={trip_list}
              setTripList={setTripList}
            />
          ))}
        </div>
        {trip_list.length === 0 && (
          <div className={NewListCSS.blankListContainer}>
            <h3 className={NewListCSS.blankList}>Add Gear to Get Started</h3>
          </div>
        )} 
        {trip_list.length !== 0 && (
          <CreateChecklist
            trip_list={trip_list}
            setTripList={setTripList}
          /> 
        )} 
      </div>
      <div className={NewListCSS.closetList}>
        <TitleSearch 
          title="My Gear Closet"
          selectNeeded={false}
          containerClass={NewListCSS.closetListHeader}
          searchArr={[...alpha]}
          searchKey="gear_name"
          sort={false}
          setSort={false}
          setCurrentSortArr={setCurrentSortArr}
        />
        {closet && ['essential', 'container', 'sleep', 'kitchen', 'hygiene', 'clothing', 'personal', 'mountaineering', 'other'].map(e => (
          <ClosetCategory
            closet={currentSortArr}
            category={e}
            key={e}
            trip_list={trip_list}
            setTripList={setTripList}
          />
        ))}
        <Link to="/gear-closet">
          <button 
            className={closet.length !== 0 ? NewListCSS.gearBtn : `${NewListCSS.gearBtn} ${NewListCSS.gearBtnMarg}`}
          >Add New Gear&nbsp;
            <span
              className="material-symbols-outlined logout"
            >switch_access_shortcut</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
 
export default NewList;