import { Link } from 'react-router-dom'
//! Add these
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

// css modules, images
import NavbarCSS from '../styles/Navbar.module.css'
import mtn1400 from '../images/mtn-1400.png'
import prePackerLogo from '../images/prepacker-logo.svg'


const Navbar = () => {
  //! Add these
  const { logout } = useLogout()
  const { user } = useAuthContext()

  //! Add this
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
          {/*  Add this in  */}
          {user && (
            <div>
              {/* <span>{user.email}</span> */}
              <button onClick={handleClick}>Logout</button>
            </div>
          )}
          {/*  ----- */}
          {!user && (
            <Link to="/">
              Login&nbsp;
              <span className="material-symbols-outlined cancel">login</span>
            </Link> 
          )}
          {!user && (
            <Link to="/">
              Signup&nbsp;
              <span className="material-symbols-outlined cancel">person_add</span>
            </Link>
          )}
        </div>
      </div>
      <div className={NavbarCSS.imgContainer}>
        <img src={mtn1400} alt="mtn-header" className={NavbarCSS.mountains}></img>
      </div>
    </header>
   );
}
 
export default Navbar;