import { useClosetContext } from "../hooks/useClosetContext";
import { useEffect, useState } from "react";

// components
import GearDetails from '../components/gearCloset/GearDetails'
import AddGear from "../components/gearCloset/AddGear";

const GearCloset = () => {
  const { closet } = useClosetContext()

  const [sort, setSort] = useState('nameAscending')
  const [currentSortArr, setCurrentSortArr] = useState([])

  useEffect(() => {
    if (closet) {
      setCurrentSortArr([...closet])
    }
  }, [closet])

  const changeSort = (e) => {
    setSort(e)

    switch(e) {
      case "nameAscending":
        setCurrentSortArr([...closet])
        break;
      case "nameDescending":
        setCurrentSortArr([...closet].sort((a, b) => b.gear_name.localeCompare(a.gear_name)))
        break;
      case "categoryAscending":
        setCurrentSortArr([...closet].sort((a, b) => a.category.localeCompare(b.category)))
        break;
      case "categoryDescending":
        setCurrentSortArr([...closet].sort((a, b) => b.category.localeCompare(a.category)))
        break;
      case "weightAscending":
        setCurrentSortArr([...closet].sort((a, b) => {
          if (!a.weight) {
            return 1
          } else if (!b.weight) {
            return -1
          } else {
            return a.weight - b.weight
          }
        }))
        break;
      case "weightDescending":
        setCurrentSortArr([...closet].sort((a, b) => {
          if (!a.weight) {
            return 1
          } else if (!b.weight) {
            return -1
          } else {
            return b.weight - a.weight
          }
        }))
        break;
      case "priceAscending":
        setCurrentSortArr([...closet].sort((a, b) => {
          if (!a.price) {
            return 1
          } else if (!b.price) {
            return -1
          } else {
            return a.price - b.price
          }
        }))
        break;
      case "priceDescending":
        setCurrentSortArr([...closet].sort((a, b) => b.price - a.price))
        break;
      case "createdAscending":
        setCurrentSortArr([...closet].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
        break;
      case "createdDescending":
        setCurrentSortArr([...closet].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)))
        break;
      default:
        break;
    }
  }
  
  return ( 
    <div className="gear-closet">
      <div className="closet">
        <h2>My Gear</h2>
        <select
          value={sort}
          onChange={(e) => changeSort(e.target.value)}
        >
          <option value="nameAscending">Name: A - Z</option>
          <option value="nameDescending">Name: Z - A</option>
          <option value="categoryAscending">Category: A - Z</option>
          <option value="categoryDescending">Category: Z - A</option>
          <option value="weightAscending">Weight: Low - High</option>
          <option value="weightDescending">Weight: High - Low</option>
          <option value="priceAscending">Price: Low - High</option>
          <option value="priceDescending">Price: High - Low</option>
          <option value="createdAscending">Added: New - Old</option>
          <option value="createdDescending">Added: Old - New</option>
        </select>
        {closet && currentSortArr.map((gear) => (
          <GearDetails key={gear._id} gear={gear}/>
        ))}
      </div>
      <div>
        <AddGear />
      </div>
    </div>
   );
}
 
export default GearCloset;