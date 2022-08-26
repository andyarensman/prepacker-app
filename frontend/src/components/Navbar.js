import { Link } from "react-router-dom";
import NavbarCSS from "../styles/Navbar.module.css"
import mtn1400 from "../images/mtn-1400.png"
import prePackerLogo from "../images/prepacker-logo.svg"

const Navbar = () => {
  return ( 
    <header className={NavbarCSS.header}>
      <div className={NavbarCSS.container}>
        <Link to="/new-list">
          {/* <h1>PrePacker</h1> */}
          {/* <img src="/PrePacker-logo-1.png" alt="PrePacker" className={NavbarCSS.titleLogo}></img> */}
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
          <Link to="/">
            Login&nbsp;
            <span class="material-symbols-outlined cancel">login</span>
          </Link>
          <Link to="/">
            Signup&nbsp;
            <span class="material-symbols-outlined cancel">person_add</span>
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