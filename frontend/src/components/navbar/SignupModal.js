import { useState } from 'react';

// css modules
import ModalCSS from '../../styles/gearCloset/EditGearModal.module.css'

const SignupModal = ({ hiddenSignup, setHiddenSignup}) => {
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
      setHiddenSignup(true)
    }
  }

  return (
    <>
      {!hiddenSignup && (
        <div className={ModalCSS.modal} onClick={(e) => closeWindow(e)}>
          <div className={ModalCSS.modalLoginContent}>
            <span
              className={ModalCSS.close}
              onClick={() => setHiddenSignup(true)}
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
              <button onClick={(e) => handleSubmit(e)}>Sign Up</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
 
export default SignupModal;