import { Stack } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className='navigation'>
      <ul className='navigation__inner'>
        <div>Logo</div>
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
