import { Link } from "react-router-dom";
import NavbarCSS from "../styles/Navbar.module.css"
import mtn1400 from "../images/mtn-1400.png"

const Navbar = () => {
  return ( 
    <header className={NavbarCSS.header}>
      <div className={NavbarCSS.container}>
        <Link to="/new-list">
          {/* <h1>PrePacker</h1> */}
          <img src="/PrePacker-logo-1.png" alt="PrePacker" className={NavbarCSS.titleLogo}></img>
        </Link>
        <nav>
          
          <Link to="/new-list">
            <h3>New List</h3>
          </Link>
          <h3>•</h3>
          <Link to="/saved-lists">
            <h3>Saved Lists</h3>
          </Link>
          <h3>•</h3>
          <Link to="/gear-closet">
            <h3>Gear Closet</h3>
          </Link>
          
        </nav>
        <div className={NavbarCSS.login}>
          <Link to="/">Login</Link>
          <Link to="/">Signup</Link>
        </div>
      </div>
      <div className={NavbarCSS.imgContainer}>
        <img src={mtn1400} alt="mtn-header" className={NavbarCSS.mountains}></img>
      </div>
    </header>
   );
}
 
export default Navbar;