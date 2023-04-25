import CartWidget from "./CartWidget";
import Logo from "./logo";
import { Container, Navbar, NavbarBrand } from 'react-bootstrap';
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import { categories } from '../utils/list.util'
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  const { pathname } = useLocation();
  return (
    <>
      <Navbar className="navbar navbar-expand-lg navbar-light bg-light">
        <Container>
          <NavbarBrand>
            <Logo />
          </NavbarBrand>
          <NavbarToggle aria-controls="basic-navbar-nav" />
          <div className="collapse navbar-collapse" id="basic-navbar-nav">
            <ul className="navbar-nav ms-auto">
              {
                pathname !== '/' &&
                <li key='home' className="nav-item">
                  <Link className="nav-link active" aria-current="page" to='/#home'>Home</Link>
                </li>
              }
              {categories.map(i => (
                <li key={i.id} className="nav-item">
                  <Link className="nav-link active" aria-current="page" to={`/category/${i.id}`}>{i.name}</Link>
                </li>
              )
              )
              }
              <li className="nav-item">
                <CartWidget />
              </li>
            </ul>
          </div>
        </Container>
      </Navbar>
    </>

  )
};

export default NavBar;
