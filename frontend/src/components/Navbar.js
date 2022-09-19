import { Link } from 'react-router-dom'
//! Add this
import { useLogout } from '../hooks/useLogout'

// css modules, images
import NavbarCSS from '../styles/Navbar.module.css'
import mtn1400 from '../images/mtn-1400.png'
import prePackerLogo from '../images/prepacker-logo.svg'


const Navbar = () => {
  //! Add this
  const { logout } = useLogout()

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
          <div>
            <button onClick={handleClick}>Logout</button>
          </div>
          {/*  ----- */}
          <Link to="/">
            Login&nbsp;
            <span className="material-symbols-outlined cancel">login</span>
          </Link>
          <Link to="/">
            Signup&nbsp;
            <span className="material-symbols-outlined cancel">person_add</span>
          </Link>
        </div>
      </div>
      <div className={NavbarCSS.imgContainer}>
        <img src={mtn1400} alt="mtn-header" className={NavbarCSS.mountains}></img>
      </div>
    </header>
   );
}
 
export default Navbar;