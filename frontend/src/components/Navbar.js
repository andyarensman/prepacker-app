import { useState } from 'react'
import { Link } from 'react-router-dom'

// hooks
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

// components
import LoginModal from './navbar/LoginModal'
import SignupModal from './navbar/SignupModal'

// css modules, images
import NavbarCSS from '../styles/Navbar.module.css'
import mtn1400 from '../images/mtn-1400.png'
import prePackerLogo from '../images/prepacker-logo.svg'


const Navbar = () => {
  const [hiddenLogin, setHiddenLogin] = useState(true)
  const [hiddenSignup, setHiddenSignup] = useState(true)

  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return ( 
    <header className={NavbarCSS.header}>
      <div className={NavbarCSS.container}>
        <Link to="/new-list">
          <img src={prePackerLogo} alt="PrePacker" className={NavbarCSS.titleLogo}></img>
        </Link>
        <nav>
            •
          <Link to="/new-list">
            New List
          </Link>
            •
          <Link to="/saved-lists">
            Saved Lists
          </Link>
            •
          <Link to="/gear-closet">
            Gear Closet
          </Link>
            •
        </nav>
        <div className={NavbarCSS.login}>
          {user && (
              <div>
                <span>{user.email}</span>
                <button onClick={handleClick} className={NavbarCSS.logoutBtn}>Logout</button>
              </div>
            )}
          {!user && (
            <span
              // className={}
              onClick={() => setHiddenLogin(false)}
            >Login&nbsp;
              <span className="material-symbols-outlined cancel">login</span>
            </span>
          )}
          {!user && (
            <span
              // className={}
              onClick={() => setHiddenSignup(false)}
            >Signup&nbsp;
              <span className="material-symbols-outlined cancel">person_add</span>
            </span>
          )}
        </div>
      </div>
      <div className={NavbarCSS.imgContainer}>
        <img src={mtn1400} alt="mtn-header" className={NavbarCSS.mountains}></img>
      </div>
      <LoginModal 
        hiddenLogin={hiddenLogin}
        setHiddenLogin={setHiddenLogin}
      />
      <SignupModal 
        hiddenSignup={hiddenSignup}
        setHiddenSignup={setHiddenSignup}
      />
    </header>
   );
}
 
export default Navbar;