import { useClosetContext } from "../hooks/useClosetContext";
import { useEffect, useState } from "react";

// components
import GearDetails from '../components/gearCloset/GearDetails'
import AddGear from "../components/gearCloset/AddGear";

const GearCloset = () => {
  const { closet } = useClosetContext()

  const [sort, setSort] = useState('nameAscending')
  const [alpha, setAlpha] = useState([])
  const [currentSortArr, setCurrentSortArr] = useState([])

  useEffect(() => {
    if (closet) {
      const alphaAsc = [...closet].sort((a, b) => a.gear_name.localeCompare(b.gear_name))
      setAlpha([...alphaAsc])
      setCurrentSortArr([...alphaAsc])
    }
  }, [closet])

  const changeSort = (e) => {
    setSort(e)

    switch(e) {
      case "nameAscending":
        setCurrentSortArr([...alpha])
        break;
      case "nameDescending":
        setCurrentSortArr([...alpha].sort((a, b) => b.gear_name.localeCompare(a.gear_name)))
        break;
      case "categoryAscending":
        setCurrentSortArr([...alpha].sort((a, b) => a.category.localeCompare(b.category)))
        break;
      case "categoryDescending":
        setCurrentSortArr([...alpha].sort((a, b) => b.category.localeCompare(a.category)))
        break;
      case "weightAscending":
        setCurrentSortArr([...alpha].sort((a, b) => {
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
        setCurrentSortArr([...alpha].sort((a, b) => {
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
        setCurrentSortArr([...alpha].sort((a, b) => {
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
        setCurrentSortArr([...alpha].sort((a, b) => b.price - a.price))
        break;
      case "createdAscending":
        setCurrentSortArr([...alpha].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
        break;
      case "createdDescending":
        setCurrentSortArr([...alpha].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)))
        break;
      default:
        break;
    }
  }

  const handleChange = (searchWord) => {
    setSort('nameAscending')

    if (!searchWord) {
      setCurrentSortArr([...closet])
    } else {
      let regex = new RegExp(searchWord)
      let searchResult = closet.filter(gear => regex.test(gear.gear_name))
      setCurrentSortArr([...searchResult])
    }
  }
  
  return ( 
    <div className="gear-closet">
      <div className="closet">
        <div className="closet-header">
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
          <div className="search-container">
            <form onSubmit={(e) => e.preventDefault()} className="search-form">
              <input 
                type="text"
                placeholder="Search..."
                onChange={(e) => handleChange(e.target.value)}
              />
              <button><span className="material-symbols-outlined search-symbol">search</span></button>
            </form>
          </div>
        </div>
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