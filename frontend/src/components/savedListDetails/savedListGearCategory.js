import { handleCategory } from "../../helpers/utils";
import SavedListGear from "./savedListGear";

import SLDetailsCSS from "../../styles/savedListDetails.module.css"
import { useEffect, useState } from "react";

const SavedListGearCategory = ({ category, gear }) => {
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
              <SavedListGear 
                key={gearItem._id} 
                gearItem={gearItem}
                gearCheck={gearCheck}
                setGearCheck={setGearCheck}
              />
          })}
        </div>
      }
    </>  
  );
}
 
export default SavedListGearCategory;