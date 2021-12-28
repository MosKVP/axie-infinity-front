import { Stack } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/images/logo.png";

const NavBar: React.FC = () => {
  return (
    <nav className='navigation'>
      <ul className='navigation__inner'>
        <div>
          <Link to='/'>
            <img src={Logo} alt='logo' className="navigation__logo"></img>
          </Link>
        </div>
        <Stack direction='row'>
          <li>
            <NavLink to='/' className='nav-link'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/breeding-calculator' className='nav-link'>
              Breeding Calculator
            </NavLink>
          </li>
        </Stack>
      </ul>
    </nav>
  );
};

export default NavBar;
