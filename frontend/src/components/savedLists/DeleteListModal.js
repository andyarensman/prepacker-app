import { useNavigate } from 'react-router-dom'

// components
import ModalCSS from '../../styles/gearCloset/EditGearModal.module.css'

// context
import { useClosetContext } from '../../hooks/useClosetContext'
import { useAuthContext } from '../../hooks/useAuthContext'


const DeleteListModal = ({ hiddenDeleteModal, setHiddenDeleteModal, checklist}) => {
  const { dispatch } = useClosetContext()
  const { user } = useAuthContext()
  const navigate = useNavigate()

  // close the modal if you click outside the box
  const closeWindow = (e) => {
    e.preventDefault()
    
    if(e.target === e.currentTarget) {
      setHiddenDeleteModal(true)
    }
  }

  // delete list
  const handleClick = async () => {
    if (!user) {
      console.log('You must be logged in')
      return
    }

    const response = await fetch('/api/checklist/' + checklist._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_CHECKLIST', payload: json})
      if (window.location.pathname !== '/saved-lists') {
        navigate('/saved-lists')
      }
    }
  }

  return ( 
    <>
      {!hiddenDeleteModal && (
        <div className={ModalCSS.modal} onClick={(e) => closeWindow(e)}>
          <div className={ModalCSS.modalDeleteContent}>
            <p>Are you sure you want to delete <strong>'{checklist.checklist_name}'</strong> ?</p>
            <button
              className={ModalCSS.delete}
              onClick={handleClick}
            >Delete</button>
            <button
              className={ModalCSS.cancel}
              onClick={() => setHiddenDeleteModal(true)}
            >Cancel</button>
          </div>
        </div>
      )}
    </>
   );
}
 
export default DeleteListModal;