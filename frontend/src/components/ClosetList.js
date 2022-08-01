import { useState } from "react";

const ClosetList = ({ gear }) => {
  const [check_box, setCheckBox] = useState('+')

  const handleClick = () => {
    if (check_box === '+') {
      setCheckBox('-')
    } else if (check_box === '-') {
      setCheckBox('+')
    }
  }

  return ( 
    <div className="closet-list-item"><button onClick={() => handleClick()}>{check_box}</button> {gear.gear_name}</div>
   );
}
 
export default ClosetList;