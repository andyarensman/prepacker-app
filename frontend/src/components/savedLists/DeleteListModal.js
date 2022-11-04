import { useNavigate } from 'react-router-dom'

// components
import ModalCSS from '../../styles/gearCloset/EditGearModal.module.css'

// hooks/context
import { useClosetContext } from '../../hooks/useClosetContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'


const DeleteListModal = ({ hiddenDeleteModal, setHiddenDeleteModal, checklist}) => {
  const { dispatch } = useClosetContext()
  const { user } = useAuthContext()
  const { logout } = useLogout()
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

    const response = await fetch(process.env.REACT_APP_BACKEND + '/api/checklist/' + checklist._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    
    const json = await response.json()

    // checks if access token is still good
    if (response.status === 401) {
      logout()
    }

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