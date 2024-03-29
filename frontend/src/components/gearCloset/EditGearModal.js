import { useState } from 'react'

// helpers, hooks, context
import { handleWeightNum } from '../../helpers/utils'
import { useClosetContext } from '../../hooks/useClosetContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'

// css modules
import ModalCSS from '../../styles/gearCloset/EditGearModal.module.css'

const EditGearModal = ({ hiddenModal, setHiddenModal, gear }) => {
  const [gear_name, setGearName] = useState(gear.gear_name)
  const [pounds, setPounds] = useState(handleWeightNum(gear.weight).pounds || '')
  const [ounces, setOunces] = useState(handleWeightNum(gear.weight).ounces || '')
  const [category, setCategory] = useState(gear.category)
  const [url, setUrl] = useState(gear.website || '')
  const [price, setPrice] = useState(gear.price || '')
  const [notes, setNotes] = useState(gear.notes || '')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const [success, setSuccess] = useState(false)

  const { dispatch } = useClosetContext()
  const { user } = useAuthContext()
  const { logout } = useLogout()
  
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
    const gearSubmit = {gear_name, weight, price, category, notes}
    gearSubmit.website = url

    const response = await fetch(process.env.REACT_APP_BACKEND + '/api/closet/' + gear._id, {
      method: 'PATCH',
      body: JSON.stringify(gearSubmit),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    // checks if access token is still good
    if (response.status === 401) {
      logout()
    }

    // checks if any fields are missing
    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
      setSuccess(false)
    }

    if (response.ok) {
      setError(null)
      setEmptyFields([]) 
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
    }, 5000);
      // console.log('gear updated', json)
      dispatch({type: 'UPDATE_GEAR', payload: json})
    }
  }

  // close the modal if you click outside the box
  const closeWindow = (e) => {
    e.preventDefault()
    
    if(e.target === e.currentTarget) {
      setHiddenModal(true)
    }
  }

  return (
    <>
      {!hiddenModal && (
        <div className={ModalCSS.modal} onClick={(e) => closeWindow(e)}>
          <div className={ModalCSS.modalContent}>
            <span
              className={ModalCSS.close}
              onClick={() => setHiddenModal(true)}
            >&times;</span>

            <form className={ModalCSS.create} onSubmit={handleSubmit}>
              <h2>Edit Gear</h2>

              <label htmlFor="gear-name">Gear Name</label>
              <input 
                type="text"
                onChange={(e) => setGearName(e.target.value)}
                value={gear_name}
                className={emptyFields.includes('gear_name') ? 'error' : ''}
                id="gear-name"
              />

              <label>Weight</label>
              <div className={ModalCSS.weight}>
                <input 
                  type="number"
                  onChange={(e) => setPounds(e.target.value)}
                  value={pounds}
                  id="pounds"
                  min="0"
                  step="0.01"
                />
                <label htmlFor="pounds">lbs</label>
                <input 
                  type="number"
                  onChange={(e) => setOunces(e.target.value)}
                  value={ounces}
                  id="ounces"
                  min="0"
                  step="0.01"
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
                step="0.01"
              />

              <label htmlFor="notes">Notes</label>
              <textarea 
                onChange={(e) => setNotes(e.target.value)}
                value={notes}
                id="notes"
              />

              <button onClick={(e) => handleSubmit(e)}>Update Gear</button>
              {error && <div className="error">{error}</div>}
              {success && <div className="success">Gear Updated!</div>}
            </form>
          </div>

        </div>
      )}
    </>
   );
}
 
export default EditGearModal;