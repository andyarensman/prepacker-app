// css imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShirt, faBox, faScrewdriverWrench, faHandSparkles, faFireBurner, faTent, faMobile, faMountain, faBinoculars } from '@fortawesome/free-solid-svg-icons'


// return weight as lbs and/or oz string
export const handleWeight = (weight) => {
  let pounds = Math.floor(weight/16)
  let ouncesNoRound = (weight - (Math.floor(weight/16))*16)
  let ounces = Math.round(ouncesNoRound * 10) / 10

  if (pounds !== 0 && ounces !== 0) {
    return (`${pounds} lb ${ounces} oz`)
  }
  if (pounds === 0 && ounces !== 0) {
    return (`${ounces} oz`)
  }
  if (pounds !== 0 && ounces === 0) {
    return (`${pounds} lb`)
  }
  if (pounds === 0 && ounces === 0) {
    return ('N/A')
  }
}

// return total weight as string
export const findTotalWeight = (list) => {
  let totalWeight = 0

  list.map(gear => {
    if (gear.weight) {
      totalWeight += gear.weight
    }
    return totalWeight
  })

  return handleWeight(totalWeight)
}

// return weight as object with num
export const handleWeightNum = (weight) => {
  let pounds = Math.floor(weight/16)
  let ouncesNoRound = (weight - (Math.floor(weight/16))*16)
  let ounces = Math.round(ouncesNoRound * 10) / 10

  return {pounds, ounces}
}

// Order of gear categories with icons
export const handleCategory = (category) => {
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