import { handleWeight } from "../../helpers/utils";

const SavedListGear = ({ gearItem }) => {
  return (
    <div className="trip-list">
      {gearItem.gear_name} {gearItem.weight && <i className="weight-italics">({handleWeight(gearItem.weight)}) </i>}
    </div>
  );
}
 
export default SavedListGear;