// TODO: Need to add other things to the form: product type

import { useClosetContext } from "../hooks/useClosetContext";

const GearForm = ({
    gear_name,
    setGearName,
    pounds,
    setPounds,
    ounces,
    setOunces,
    url,
    setUrl,
    price,
    setPrice,
    image_url,
    setImageUrl,
    error,
    setError,
    emptyFields,
    setEmptyFields,
    setUrlScrape,
    setScraperError
  }) => {
  const { dispatch } = useClosetContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    let weight;
    if (pounds || ounces) {
      weight = Number(pounds)*16 + Number(ounces)
    }
    const gear = {gear_name, weight, price, image_url}
    gear.website = url

    const response = await fetch('/api/closet', {
      method: 'POST',
      body: JSON.stringify(gear),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
      setScraperError(false)
    }

    if (response.ok) {
      setGearName('')
      setPrice('')
      setPounds('')
      setOunces('')
      setImageUrl('')
      setUrl('')
      setError(null)
      setEmptyFields([])
      setUrlScrape('')
      setScraperError(false)
      console.log('new gear added', json)
      dispatch({type: 'CREATE_GEAR', payload: json})
    }
  }

  return ( 
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Piece of Gear</h3>

      <label>Gear Name:</label>
      <input 
        type="text"
        onChange={(e) => setGearName(e.target.value)}
        value={gear_name}
        className={emptyFields.includes('gear_name') ? 'error' : ''}
      />

      <label>Weight</label>
      <div className="weight">
        <input 
          type="number"
          onChange={(e) => setPounds(e.target.value)}
          value={pounds}
        />
        <label>lbs.</label>
        <input 
          type="number"
          onChange={(e) => setOunces(e.target.value)}
          value={ounces}
        />
        <label>oz.</label>
      </div>

      <label>Product Page:</label>
      <input 
        type="url"
        onChange={(e) => setUrl(e.target.value)}
        value={url}
      />

      <label>Price ($):</label>
      <input 
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />

      <label>Image Url:</label>
      <input 
        type="url"
        onChange={(e) => setImageUrl(e.target.value)}
        value={image_url}
      />

      <button>Add Gear to Closet</button>
      {error && <div className="error">{error}</div>}
    </form>
   );
}
 
export default GearForm;