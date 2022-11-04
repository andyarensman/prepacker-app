// TODO: Need to add other things to the form: images?

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// hooks/context
import { useClosetContext } from '../../hooks/useClosetContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'

// css modules
import GearFormCSS from '../../styles/gearCloset/GearForm.module.css'

const GearForm = ({
    gear_name,
    setGearName,
    pounds,
    setPounds,
    ounces,
    setOunces,
    category,
    setCategory,
    url,
    setUrl,
    price,
    setPrice,
    // image_url,
    // setImageUrl,
    notes,
    setNotes,
    error,
    setError,
    emptyFields,
    setEmptyFields,
    setUrlScrape,
    setScraperError,
    setSort
  }) => {
  const [success, setSuccess] = useState(false)
  const { dispatch } = useClosetContext()
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const { logout } = useLogout()

  useEffect(() => {
    setSuccess(false)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    let weight;
    if (pounds || ounces) {
      weight = Number(pounds)*16 + Number(ounces)
    }
    const gear = {gear_name, weight, price,/* image_url,*/ notes, category}
    gear.website = url

    const response = await fetch(process.env.REACT_APP_BACKEND + '/api/closet', {
      method: 'POST',
      body: JSON.stringify(gear),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    
    if (response.status === 401) {
      logout()
    }

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
      setScraperError(false)
      setSuccess(false)
    }

    if (response.ok) {
      setGearName('')
      setPrice('')
      setPounds('')
      setOunces('')
      setCategory('')
      // setImageUrl('')
      setNotes('')
      setUrl('')
      setError(null)
      setEmptyFields([])
      setUrlScrape('')
      setScraperError(false)
      setSort('nameAscending')
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
    }, 5000);
      // console.log('new gear added', json)
      dispatch({type: 'CREATE_GEAR', payload: json})
    }
  }

  return ( 
    <form className={GearFormCSS.create} onSubmit={handleSubmit}>
      <h2>Add a New Piece of Gear</h2>

      <label htmlFor="gear-name">Gear Name</label>
      <input 
        type="text"
        onChange={(e) => setGearName(e.target.value)}
        value={gear_name}
        className={emptyFields.includes('gear_name') ? 'error' : ''}
        id="gear-name"
      />

      <label>Weight</label>
      <div className={GearFormCSS.weight}>
        <input 
          type="number"
          onChange={(e) => setPounds(e.target.value)}
          value={pounds}
          id="pounds"
          min="0"
        />
        <label htmlFor="pounds">lbs</label>
        <input 
          type="number"
          onChange={(e) => setOunces(e.target.value)}
          value={ounces}
          id="ounces"
          min="0"
        />
        <label htmlFor="ounces">oz</label>
      </div>

      <label htmlFor="category">Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={emptyFields.includes('category') ? 'error' : ''}
        id="category"
      >
        <option value="" disabled></option>
        <option value="clothing">Clothing</option>
        <option value="container">Containers/Bags</option>
        <option value="essential">Essential Tools</option>
        <option value="hygiene">Hygiene/Care</option>
        <option value="kitchen">Kitchen</option>
        <option value="sleep">Sleep System</option>
        <option value="personal">Personal Items</option>
        <option value="mountaineering">Mountaineering</option>
        <option value="other">Other</option>
      </select>

      <label htmlFor="url">Product URL</label>
      <input 
        type="url"
        onChange={(e) => setUrl(e.target.value)}
        value={url}
        id="url"
      />

      <label htmlFor="price">Price ($)</label>
      <input 
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        id="price"
        min="0"
      />

      {/* <label>Image Url:</label>
      <input 
        type="url"
        onChange={(e) => setImageUrl(e.target.value)}
        value={image_url}
      /> */}

      <label htmlFor="notes">Notes</label>
      <textarea 
        onChange={(e) => setNotes(e.target.value)}
        value={notes}
        id="notes"
      />

      <button>Add Gear to Closet</button>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">New gear added!</div>}
    </form>
   );
}
 
export default GearForm;