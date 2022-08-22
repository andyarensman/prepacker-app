import { useClosetContext } from "../hooks/useClosetContext";
import { useEffect, useState } from "react";

// components
import GearDetails from '../components/gearCloset/GearDetails'
import AddGear from "../components/gearCloset/AddGear";

// css modules
import GearClosetCSS from '../styles/gearCloset.module.css'
import TitleSearch from "../components/TitleSearch";

const GearCloset = () => {
  const { closet } = useClosetContext()

  const [sort, setSort] = useState('nameAscending')
  const [alpha, setAlpha] = useState([])
  const [currentSortArr, setCurrentSortArr] = useState([])

  useEffect(() => {
    if (closet) {
      const alphaAsc = [...closet].sort((a, b) => a.gear_name.localeCompare(b.gear_name))
      setAlpha([...alphaAsc])
      setCurrentSortArr([...alphaAsc])
    }
  }, [closet])
  
  return ( 
    <div className={GearClosetCSS.page}>
      <div className="closet">
        <TitleSearch 
          title="My Gear"
          selectNeeded={true}
          containerClass={GearClosetCSS.closetHeader}
          searchArr={[...alpha]}
          searchKey="gear_name"
          sort={sort}
          setSort={setSort}
          setCurrentSortArr={setCurrentSortArr}
        />
        {closet && currentSortArr.map((gear) => (
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