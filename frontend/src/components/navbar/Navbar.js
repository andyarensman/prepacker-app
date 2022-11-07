import { useState } from 'react'
import { Link } from 'react-router-dom'

// hooks, context
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'

// components
import LoginModal from './LoginModal'
import SignupModal from './SignupModal'

// css modules, images
import NavbarCSS from '../../styles/Navbar.module.css'
import mtn1400 from '../../images/mtn-1400.png'
import prePackerLogo from '../../images/prepacker-logo.svg'


const Navbar = () => {
  const [hiddenLogin, setHiddenLogin] = useState(true)
  const [hiddenSignup, setHiddenSignup] = useState(true)
  const [hiddenHamburger, setHiddenHamburger] = useState(true)

  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
    setHiddenHamburger(true)
  }

  const handleHamburger = () => {
    if (hiddenHamburger) {
      setHiddenHamburger(false)
    }

    if (!hiddenHamburger) {
      setHiddenHamburger(true)
    }
  }

  return ( 
    <header className={NavbarCSS.header}>
      <div className={NavbarCSS.container}>
        <Link to="/">
          <img src={prePackerLogo} alt="PrePacker" className={NavbarCSS.titleLogo}></img>
        </Link>
        <nav className={NavbarCSS.desktopNav}>
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
        
        {user && (
          <div className={NavbarCSS.loggedInHub}>
            <span className={NavbarCSS.userEmail}>{user.email}</span>
            <button 
              onClick={handleClick}
              className={NavbarCSS.logoutBtn}
            >Logout&nbsp;
              <span 
                className="material-symbols-outlined logout"
              >logout</span>
            </button>
          </div>
        )}
        {!user && (
          <div className={NavbarCSS.login}>
            <span
              className={NavbarCSS.hover}
              onClick={() => setHiddenLogin(false)}
            >Login&nbsp;
              <span className="material-symbols-outlined cancel">login</span>
            </span>
            <span
              className={NavbarCSS.hover}
              onClick={() => setHiddenSignup(false)}
            >Signup&nbsp;
              <span className="material-symbols-outlined cancel">person_add</span>
            </span>
          </div>
        )}
        
        <div className={NavbarCSS.mobileHam}>
          <span
            className="material-symbols-outlined"
            onClick={() => handleHamburger()}
          >menu</span>
        </div>
      </div>
      <div className={NavbarCSS.imgContainer}>
        <img src={mtn1400} alt="mtn-header" className={NavbarCSS.mountains}></img>
      </div>
      {!hiddenHamburger && (
        <div className={NavbarCSS.mobileMenu}>
          <div className={NavbarCSS.mobileLogin}>
            {!user && (
              <span
                className={NavbarCSS.hover}
                onClick={() => {
                  setHiddenLogin(false)
                  setHiddenHamburger(true)
                }}
              >Login&nbsp;
                <span className={`${NavbarCSS.symbols} material-symbols-outlined`}>login</span>
              </span>
            )}
            {!user && (
              <span
                className={NavbarCSS.hover}
                onClick={() => {
                  setHiddenSignup(false)
                  setHiddenHamburger(true)
                }}
              >Signup&nbsp;
                <span className={`${NavbarCSS.symbols} material-symbols-outlined`}>person_add</span>
              </span>
            )}
          </div>
          {user && (
            <>
              <nav className={NavbarCSS.mobileNav}>
                <Link to="/new-list" onClick={() => setHiddenHamburger(true)}>
                  New List
                </Link>
                <Link to="/saved-lists" onClick={() => setHiddenHamburger(true)}>
                  Saved Lists
                </Link>
                <Link to="/gear-closet" onClick={() => setHiddenHamburger(true)}>
                  Gear Closet
                </Link>
              </nav>
              <div>
                {/* <span className={NavbarCSS.userEmail}>{user.email}</span> */}
                <button 
                  onClick={handleClick}
                  className={NavbarCSS.logoutBtn}
                >Logout&nbsp;
                  <span 
                    className="material-symbols-outlined logout"
                  >logout</span>
                </button>
              </div>
            
            </>
            )}
        </div>
      )}
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