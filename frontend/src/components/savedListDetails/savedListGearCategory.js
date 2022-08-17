import { handleCategory } from "../../helpers/utils";
import SavedListGear from "./savedListGear";

const SavedListGearCategory = ({ category, gear }) => {
  return (
    <>
      {gear.some(e => e.category === category) && <h3>{handleCategory(category)}</h3>}

      {gear.map((gearItem) => {
        return gearItem.category === category &&
          <SavedListGear 
            key={gearItem._id} 
            gearItem={gearItem}
          />
      })}
    </>
  );
}
 
export default SavedListGearCategory;