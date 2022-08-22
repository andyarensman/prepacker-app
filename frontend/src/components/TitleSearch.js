import SearchCSS from '../styles/search.module.css'

const TitleSearch = ({title, selectNeeded, containerClass, searchArr, searchKey, sort, setSort, setCurrentSortArr}) => {

  //changeSort
  const changeSort = (e) => {
    setSort(e)

    switch(e) {
      case "nameAscending":
        setCurrentSortArr([...searchArr])
        break;
      case "nameDescending":
        setCurrentSortArr([...searchArr].sort((a, b) => b.gear_name.localeCompare(a.gear_name)))
        break;
      case "categoryAscending":
        setCurrentSortArr([...searchArr].sort((a, b) => a.category.localeCompare(b.category)))
        break;
      case "categoryDescending":
        setCurrentSortArr([...searchArr].sort((a, b) => b.category.localeCompare(a.category)))
        break;
      case "weightAscending":
        setCurrentSortArr([...searchArr].sort((a, b) => {
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
        setCurrentSortArr([...searchArr].sort((a, b) => {
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
        setCurrentSortArr([...searchArr].sort((a, b) => {
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
        setCurrentSortArr([...searchArr].sort((a, b) => b.price - a.price))
        break;
      case "createdAscending":
        setCurrentSortArr([...searchArr].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
        break;
      case "createdDescending":
        setCurrentSortArr([...searchArr].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)))
        break;
      default:
        break;
    }
  }

  // Search Functionality
  const handleChange = (searchWord) => {
    if (sort) {
      setSort('nameAscending')
    }

    if (!searchWord) {
      setCurrentSortArr([...searchArr])
    } else {
      let regex = new RegExp(searchWord, 'i')
      let searchResult = searchArr.filter(gear => regex.test(gear[searchKey]))
      setCurrentSortArr([...searchResult])
    }
  }

  return (
    <div className={containerClass}>
      <h2>{title}</h2>
      {selectNeeded && (
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
      )}
      <div className="search-container">
        <form onSubmit={(e) => e.preventDefault()} className={SearchCSS.searchForm}>
          <input 
            type="text"
            placeholder="Search..."
            onChange={(e) => handleChange(e.target.value)}
          />
          <button><span className={`material-symbols-outlined ${SearchCSS.searchSymbol}`}>search</span></button>
        </form>
      </div>
    </div>
  );
}
 
export default TitleSearch;