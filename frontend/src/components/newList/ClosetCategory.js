
import ClosetList from "./ClosetList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShirt, faBox, faScrewdriverWrench, faHandSparkles, faFireBurner, faTent, faMobile, faMountain, faBinoculars } from '@fortawesome/free-solid-svg-icons'

const ClosetCategory = ({ closet, category, trip_list, setTripList }) => {
  const handleCategory = (category) => {

    switch (category) {
        case("clothing"):
            return (<><FontAwesomeIcon icon={faShirt} /> Clothing</>)
        case ("container"):
          return (<><FontAwesomeIcon icon={faBox} /> BackPack/Container</>)
        case ("essential"):
          return (<><FontAwesomeIcon icon={faScrewdriverWrench} /> Essential Tools</>)
        case ("hygiene"):
          return (<><FontAwesomeIcon icon={faHandSparkles} /> Hygiene/Care</>)
        case ("kitchen"):
          return (<><FontAwesomeIcon icon={faFireBurner} /> Kitchen</>)
        case ("sleep"):
          return (<><FontAwesomeIcon icon={faTent} /> Sleep System</>)
        case ("personal"):
          return (<><FontAwesomeIcon icon={faMobile} /> Personal Item</>)
        case ("mountaineering"):
          return (<><FontAwesomeIcon icon={faMountain} /> Mountaineering</>)
        case ("other"):
          return (<><FontAwesomeIcon icon={faBinoculars} /> Other</>)
        default:
          return ("None")
    }
  }

  return ( 
    <>
      {closet.some(e => e.category === category) && <h3>{handleCategory(category)}</h3>}

      {closet.map((gear) => {
        return gear.category === category &&
          <ClosetList 
            key={gear._id} 
            gear={gear}
            trip_list={trip_list}
            setTripList={setTripList}
          />
        
      })}
    </> 
   );
}
 
export default ClosetCategory;