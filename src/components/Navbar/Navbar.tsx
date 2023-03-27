import { Link } from "react-router-dom";

import { PageRoutes } from "../../types/pageRoutes";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo-container">
        <h1 className="header-title">Time Traveler Games</h1>
      </div>
      <nav className="nav-section">
        <ul className="nav-list">
          <li className="nav-elements">
            <Link to={PageRoutes.HOME}>Home</Link>
          </li>
          <li className="nav-elements">
            <Link to={PageRoutes.TIMEMACHINE}>Time Machine</Link>
          </li>
          <li className="nav-elements">
            <Link to={PageRoutes.TICTACTOE}>Tic Tac Toe</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Navbar;
