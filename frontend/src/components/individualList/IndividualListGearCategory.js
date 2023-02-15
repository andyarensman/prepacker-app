import { useEffect, useState } from 'react'

// components
import IndividualListGear from './IndividualListGear'

// helpers
import { handleCategory } from '../../helpers/utils'

// css modules
import SLDetailsCSS from '../../styles/individualList/individualList.module.css'


const IndividualListGearCategory = ({ category, gear, totalBagCount, setTotalBagCount }) => {
  const [gearCount, setGearCount] = useState(0)
  const [gearCheck, setGearCheck] = useState(0);

  useEffect(() => {
    let counter = 0
    gear.forEach((gearItem) => {
      if (gearItem.category === category) {
        counter++
      }
    })

    setGearCount(counter)
  },[category, gear])

  return (
    <>
      {gear.some(e => e.category === category) &&
        <div className={SLDetailsCSS.category}>
          <h3>{handleCategory(category)} <span>({gearCheck}/{gearCount})</span></h3>
          {gear.map((gearItem) => {
            return gearItem.category === category &&
              <IndividualListGear 
                key={gearItem._id} 
                gearItem={gearItem}
                gearCheck={gearCheck}
                setGearCheck={setGearCheck}
                totalBagCount={totalBagCount}
                setTotalBagCount={setTotalBagCount}
              />
          })}
        </div>
      }
    </>  
  );
}
 
export default IndividualListGearCategory;