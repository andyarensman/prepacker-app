import { Link } from "react-router-dom";

const Navbar = () => {
  return ( 
    <header>
      <div className="container">
        <Link to="/">
          <h1>PrePacker</h1>
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
    </header>
   );
}
 
export default Navbar;