import { Link } from "react-router-dom";

const Navbar = () => {
  return ( 
    <header>
      <div className="container">
        <Link to="/new-list">
          {/* <h1>PrePacker</h1> */}
          <img src="/PrePacker-logo-1.png" alt="PrePacker" className="title-logo"></img>
        </Link>
        <Link to="/new-list">
          <h3>New List</h3>
        </Link>
        <Link to="/saved-lists">
          <h3>Saved Lists</h3>
        </Link>
        <Link to="/gear-closet">
          <h3>My Gear Closet</h3>
        </Link>
        <nav>
          <div>
            <Link to="/">Login</Link>
            <Link to="/">Signup</Link>
          </div>
        </nav>
      </div>
      <div className="img-container">
        <img src="/Mountains.png" alt="mtn-header" className="mountains"></img>
      </div>
    </header>
   );
}
 
export default Navbar;