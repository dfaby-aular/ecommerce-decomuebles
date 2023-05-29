import { useEffect, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import CartWidget from "./CartWidget";
import Logo from "./Logo";
import { Button } from "../components/commons";
import { conectorServices } from '../../services/api-conector';
import { getOuth, removeOuth } from '../../services/storage.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FaBars, FaTimes } from 'react-icons/fa'


const serviceCategories = conectorServices('categories');

function NavBar() {
  const navegate = useNavigate();
  const { pathname } = useLocation();
  const [categories, setCategories] = useState([])
  let [queryParams] = useSearchParams();
  const url = queryParams.get('url');
  const outh = getOuth();
  const [click, setClick] = useState(false)
  const handleClick = () => setClick(!click)

  const closeMenu = () => setClick(false)

  const getPreviousUrl = () => {
    window.history.back();
  };

  const promise = useCallback(async (id) => {
    const categories = await serviceCategories.getAll();
    setCategories(categories)
  }, [setCategories]);

  const logout = () => {
    removeOuth();
    navegate('/login')
  }

  useEffect(() => {
    if (pathname === '/' || pathname.includes('/category')) {
      promise()
    }
  }, [pathname, promise])

  return (
    <>
      <div className='header'>
        <nav className='navbar'>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FontAwesomeIcon style={{marginRight:"15px", color:"fff"}} icon={faArrowLeft} onClick={() => getPreviousUrl()} />
            <Logo />
          </div>
          <div className='hamburger' onClick={handleClick}>
            {click ? (<FaTimes size={30} style={{ color: '#ffffff' }} />)
              : (<FaBars size={30} style={{ color: '#ffffff' }} />)}

          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {
              pathname !== '/' &&
              <li key='home' className="nav-item">
                <Link className="nav-link active" aria-current="page" to='/#home' onClick={closeMenu}>Inicio</Link>
              </li>
            }
            {categories.map(i => (
              <li key={i.id} className="nav-item">
                <Link className="nav-link active" aria-current="page" to={`/category/${i.id}`} onClick={closeMenu}>{i.name}</Link>
              </li>
            )
            )
            }
            {
              outh &&
              <li key='myShopping' className="nav-item">
                <Link className="nav-link active" aria-current="page" to={`/myShopping/${outh.id}`} onClick={closeMenu}>Mis Compras</Link>
              </li>
            }
            <li className='nav-item-cart'>
              <CartWidget />
            </li>
            <li className='nav-item-cart'>
              <form className="d-flex ml-2" role="search">
                {
                  outh ? (
                    <>
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <span className="text-danger"><strong>Bienvenido,</strong> </span>
                        <span style={{ textTransform: "capitalize" }}> {outh.userName}</span>
                      </span>
                      {
                        outh.role === 'admin' &&
                        <Link to="/create_product" type="button" className="btn btn-primary" style={{ marginLeft: 10 }}>Crear producto </Link>
                      }
                      <Button variant="danger" textButton="Cerrar sesión" style={{ marginLeft: 10 }} click={() => logout()} />
                    </>
                  )
                    :
                    <>
                      {
                        pathname.toLowerCase() !== '/register' && pathname.toLowerCase() !== '/login' ?
                          <>
                            <Link to={`/register${url ? '?url=cart' : ''}`} type="button" className="btn btn-success">Registro</Link>
                            <Link to={`/login${url ? '?url=cart' : ''}`} type="button" className="btn btn-primary" style={{ marginLeft: 20 }}>Acceso</Link>
                          </>
                          : " "
                      }
                    </>
                }
              </form>
            </li>
          </ul>
        </nav>
      </div>
    </>

  )
};

export default NavBar;
