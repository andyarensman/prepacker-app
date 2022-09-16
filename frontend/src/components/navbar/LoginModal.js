import { useState } from 'react';

// css modules
import ModalCSS from '../../styles/gearCloset/EditGearModal.module.css'

const LoginModal = ({ hiddenLogin, setHiddenLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(email, password)
  }

  // close the modal if you click outside the box
  const closeWindow = (e) => {
    e.preventDefault()
    
    if(e.target === e.currentTarget) {
      setHiddenLogin(true)
    }
  }

  return (
    <>
      {!hiddenLogin && (
        <div className={ModalCSS.modal} onClick={(e) => closeWindow(e)}>
          <div className={ModalCSS.modalLoginContent}>
            <span
              className={ModalCSS.close}
              onClick={() => setHiddenLogin(true)}
            >&times;</span>

            <form onSubmit={handleSubmit} className={ModalCSS.create}>
              <h3>Sign Up</h3>
              <label>Email:</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <label>Password:</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button onClick={(e) => handleSubmit(e)}>Log In</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
 
export default LoginModal;