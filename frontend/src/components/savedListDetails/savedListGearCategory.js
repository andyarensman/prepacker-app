import { handleCategory } from "../../helpers/utils";
import SavedListGear from "./savedListGear";

import SLDetailsCSS from "../../styles/savedListDetails.module.css"

const SavedListGearCategory = ({ category, gear }) => {
  return (
    <div className={SLDetailsCSS.category}>
      {gear.some(e => e.category === category) && <h3>{handleCategory(category)}</h3>}

      {gear.map((gearItem) => {
        return gearItem.category === category &&
          <SavedListGear 
            key={gearItem._id} 
            gearItem={gearItem}
          />
      })}
    </div>
  );
}
 
export default SavedListGearCategory;