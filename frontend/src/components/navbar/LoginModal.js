import { useState } from 'react'

// hooks
import { useLogin } from '../../hooks/useLogin'

// css modules
import ModalCSS from '../../styles/gearCloset/EditGearModal.module.css'

const LoginModal = ({ hiddenLogin, setHiddenLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin(setHiddenLogin, setEmail, setPassword)

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
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
              <h3 className={ModalCSS.authTitle}>Log In</h3>
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
              <button disabled={isLoading} onClick={(e) => handleSubmit(e)}>Log In</button>
              <img
                src="/loading-spin.svg"
                alt="loading"
                className={ModalCSS.loadingWheel}
                hidden={!isLoading}
              />
              {error && <div className="error">{error}</div>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
 
export default LoginModal;