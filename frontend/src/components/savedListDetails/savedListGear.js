import { useState } from "react";
import { handleWeight } from "../../helpers/utils";

const SavedListGear = ({ gearItem }) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleClick = () => {
    if (isChecked) {
      setIsChecked(false)
    } else {
      setIsChecked(true)
    }
  }

  return (
    <div className="trip-list inline-block">
      <span className="material-symbols-outlined cancel" onClick={handleClick}>{isChecked ? 'check_box' : 'check_box_outline_blank'}</span>
      {gearItem.gear_name} {gearItem.weight && <i className="weight-italics">({handleWeight(gearItem.weight)}) </i>}
    </div>
  );
}
 
export default SavedListGear;