import CartWidget from "./CartWidget";
import Logo from "./logo";
import { Container, Navbar, NavbarBrand} from 'react-bootstrap';
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";

function NavBar() {
  return (
    <>
      <Navbar className="navbar navbar-expand-lg navbar-light bg-light">
      <Container>
        <NavbarBrand>
          <Logo/>
        </NavbarBrand>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <div className="collapse navbar-collapse" id="basic-navbar-nav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Productos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Inspiración</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contacto</a>
            </li>
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
