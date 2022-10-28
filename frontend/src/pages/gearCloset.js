import { useEffect, useState } from 'react'

// components
import GearDetails from '../components/gearCloset/GearDetails'
import AddGear from '../components/gearCloset/AddGear'
import TitleSearch from '../components/TitleSearch'

// context
import { useClosetContext } from '../hooks/useClosetContext'

// css modules
import GearClosetCSS from '../styles/gearCloset/gearCloset.module.css'
import NewListCSS from '../styles/newList/newList.module.css'


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
        {closet.length === 0 && (
          <div className={NewListCSS.blankListContainer}>
            <h3 className={NewListCSS.blankList}>Add Gear to Get Started</h3>
          </div>
        )}
      </div>
      <div className={GearClosetCSS.order}>
        <AddGear
          setSort={setSort}
        />
      </div>
    </div>
   );
}
 
export default GearCloset;