import { Stack } from "@mui/material";
import { Link, NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className='navigation'>
      <ul className='navigation__inner'>
        <div>
          <Link to='/'>Axie</Link>
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
