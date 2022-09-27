import { useEffect, useState } from 'react'

// context
import { useClosetContext } from '../../hooks/useClosetContext'
import { useAuthContext } from '../../hooks/useAuthContext'

// css modules
import ModalCSS from '../../styles/gearCloset/EditGearModal.module.css'

const DeleteGearModal = ({ hiddenDeleteModal, setHiddenDeleteModal, gear}) => {
  const [listCounter, setListCounter] = useState(0)
  const [listUpdates, setListUpdates] = useState([])

  const { checklists, dispatch } = useClosetContext()
  const { user } = useAuthContext()

  useEffect(() => {
    if (!hiddenDeleteModal) {
      let counter = 0
      let checklistIdArr = []

      checklists.forEach(checklist => {
        let index = checklist.gear_items.findIndex(x => x === gear._id)
  
        if (index > -1) {
          counter++
          let obj = {}
          obj.checklist_id = checklist._id

          let newArr = [...checklist.gear_items]
          newArr.splice(index, 1)
          obj.updated_checklist = [...newArr]

          checklistIdArr.push(obj)
        }
      })

      // console.log(checklistIdArr)

      setListUpdates(checklistIdArr) // [{checklist_id, updated_checklist}, ...]
      setListCounter(counter)
    }
  }, [checklists, gear, hiddenDeleteModal])

  // close the modal if you click outside the box
  const closeWindow = (e) => {
    e.preventDefault()
    
    if(e.target === e.currentTarget) {
      setHiddenDeleteModal(true)
    }
  }

  //delete item
  const handleClick = async () => {
    if (!user) {
      console.log('You must be logged in')
      return
    }

    const gearId = gear._id
    const response = await fetch('/api/closet/' + gear._id, {
      method: 'DELETE',
      headers : {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_GEAR', payload: json})

      //remove from local storage if there
      const data = window.localStorage.getItem('PREPACK_NEW_CHECKLIST')
      if (data !== null) {
        let newListData = JSON.parse(data)
        
        let index = newListData.findIndex(x => x._id === gearId)
  
        if (index > -1) {
          let newArr = [...newListData]
          newArr.splice(index, 1)
          
          window.localStorage.setItem('PREPACK_NEW_CHECKLIST', JSON.stringify(newArr))
        }
      }
    }

    // handle updating lists
    if (listUpdates.length > 0) {
      const newClosets = {listUpdates, multi: true}
      const listResponse = await fetch('/api/checklist', {
        method: 'PATCH',
        body: JSON.stringify(newClosets),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const listJson = await listResponse.json()
      if (listResponse.ok) {
        listJson.forEach(list => dispatch({type: 'UPDATE_CHECKLIST', payload: list}))
      }
      if (!listResponse.ok) {
        console.log('lists were not deleted')
      }
    }
  }

  return (
    <>
      {!hiddenDeleteModal && (
        <div className={ModalCSS.modal} onClick={(e) => closeWindow(e)}>
          <div className={ModalCSS.modalDeleteContent}>

            <p>Are you sure you want to delete <strong>'{gear.gear_name}'</strong> ?</p>
            
            <p>This item will be removed from <strong>{listCounter}</strong> list{listCounter !== 1 ? 's' : ''}!</p>
            <button className={ModalCSS.delete} onClick={handleClick}>Delete</button>
            <button className={ModalCSS.cancel} onClick={() => setHiddenDeleteModal(true)}>Cancel</button>
            
          </div>
        </div>
      )}
    </>
  );
}
 
export default DeleteGearModal;