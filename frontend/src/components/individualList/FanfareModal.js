// css modules
import ModalCSS from '../../styles/gearCloset/EditGearModal.module.css'
import mtnsGroup from '../../images/mtns-group.png'

const FanfareModal = ({ hiddenModal, setHiddenModal }) => {

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
            <h2 className={ModalCSS.fanfareCenter}>Have a Great Trip!</h2>
            <img 
              className={ModalCSS.fanfareImage}
              src={mtnsGroup}
              alt="Mountains"
            ></img>
          </div>
        </div>
      )}
    </>
   );
}
 
export default FanfareModal;