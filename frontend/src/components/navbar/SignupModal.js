import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

// css modules
import ModalCSS from '../../styles/gearCloset/EditGearModal.module.css'

const SignupModal = ({ hiddenSignup, setHiddenSignup}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup(setHiddenSignup, setEmail, setPassword)

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
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
              <h3 className={ModalCSS.authTitle}>Sign Up</h3>
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
              <button disabled={isLoading} onClick={(e) => handleSubmit(e)}>Sign Up</button>
              {error && <div className="error">{error}</div>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
 
export default SignupModal;