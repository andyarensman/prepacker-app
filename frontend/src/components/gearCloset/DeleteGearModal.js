import { useEffect, useState } from 'react'
import { useClosetContext } from '../../hooks/useClosetContext'
import ModalCSS from '../../styles/gearCloset/EditGearModal.module.css'

const DeleteGearModal = ({ hiddenDeleteModal, setHiddenDeleteModal, gear}) => {
  const [listCounter, setListCounter] = useState(0)
  const { checklists, dispatch } = useClosetContext()

  useEffect(() => {
    if (!hiddenDeleteModal) {
      let counter = 0;

      checklists.forEach(checklist => {
        let index = checklist.gear_items.findIndex(x => x === gear._id)
  
        if (index > -1) {
          counter++
        }
      })

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
    const response = await fetch('/api/closet/' + gear._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_GEAR', payload: json})
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