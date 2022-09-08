import { useState } from 'react'
import { handleWeight } from '../../helpers/utils'

// css modules
import SLDetailsCSS from "../../styles/individualList/individualList.module.css"

const IndividualListGear = ({ gearItem, gearCheck, setGearCheck }) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleClick = () => {
    if (isChecked) {
      setIsChecked(false)
      setGearCheck(gearCheck - 1)
    } else {
      setIsChecked(true)
      setGearCheck(gearCheck + 1)
    }
  }

  return (
    <div className={SLDetailsCSS.gearItem}>
      <span className="material-symbols-outlined cancel no-select" onClick={handleClick}>{isChecked ? 'check_box' : 'check_box_outline_blank'}</span>
      {gearItem.gear_name} {gearItem.weight && <i className="weight-italics">({handleWeight(gearItem.weight)}) </i>}
    </div>
  );
}
 
export default IndividualListGear;