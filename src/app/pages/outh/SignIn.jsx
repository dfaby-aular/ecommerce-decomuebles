import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from "react";
import { Button, Input, Loading } from "../../components/commons";
import { generateErrorForm } from '../../../utils/util';
import { conectorServices } from '../../../services/api-conector';
import { setOuth } from '../../../services/storage.service';
import { Row, Container } from 'react-bootstrap';
const userService = conectorServices('users');

const userError = (userName) => {
  const validate = {
    email: true,
    password: true,
  }
  if (userName) validate.userName = true;
  return validate;
};

const SignIn = ({ register = false }) => {
  let [queryParams] = useSearchParams();
  const url = queryParams.get('url');
  const navegate = useNavigate();
  const [err, setErr] = useState({});
  const [loading, setLoading] = useState(false);
  const [user, setUSer] = useState({});
  const [messageErr, setMessageErr] = useState('')


  const handleValue = (key, value) => {
    user[key] = value;
    setUSer({ ...user });
    delete err[key];
  };

  const onSave = async () => {
    const error = generateErrorForm(userError(register), user);
    if (error) {
      setErr(error);
      return;
    }
    setMessageErr(false);
    let outh = null;
    try {
      setLoading(true)
      if (register) {
        const [data] = await userService.find('email', user.email);
        if (data) {
          setMessageErr('El usuario ya existe');
          return;
        }
        const newUser = await userService.create({ ...user, role: 'user' });
        const { id, role, email, userName } = await userService.getById(newUser.id);
        outh = { id, role, email, userName };
      } else {
        const [data] = await userService.find('email', user.email);
        if (!data) {
          setMessageErr('El usuario no existe');
          return;
        }
        if (data.password !== user.password) {
          setMessageErr('Contraseña invalida')
          return;
        }
        outh = { id: data.id, userName: data.userName, email: data.email, role: data.role };
      }
      if (outh) {
        setOuth(outh);
      }
      if (outh.role === 'admin') navegate('/');
      else navegate(url ? `/${url}` : `/myShopping/${outh.id}`);
    } catch (err) {
      console.error(err);
      // despues manejar el error
    } finally {
      setLoading(false)
    }
  };
  const reset = () => {
    setErr({});
    setMessageErr('')
  }
  return (
    <>
      <main id="main-container" className='login' style={{marginTop: "100px"}}>
        {loading ? (<>
          <Loading loading={loading} />
        </>) : (<>
          <div className="h-100 gradient-form items-container">
            <Container className="py-3">
              <Row>
                <div className="col-12">
                  <div className="card rounded-3 text-black p-0">
                    <Row className="g-0">
                      <div className="col-lg-7 col-sm-12 py-5 ">
                        <div className="card-body p-md-5 mx-md-4">
                          <div className="text-center">
                            <img src="/logo.png"
                              style={{ width: "185px" }} alt="logo" />
                            <h4 className="mt-1 mb-5 pb-1">Somos más que una empresa</h4>
                          </div>
                          <form>
                            <p>Por favor, ingrese a su cuenta</p>
                            {messageErr &&
                              <div role="alert" style={{ padding: '10px', borderRadius: '3px', marginBottom: '10px' }}>
                                <span className="text-center text-danger">{messageErr}</span>
                              </div>
                            }
                            {
                              register &&
                              <Input
                                title="Nombre de usuario"
                                type="text"
                                error={err.userName}
                                value={user?.userName}
                                onChange={(e) => handleValue("userName", e.target.value)}
                              />
                            }
                            <Input
                              title="Correo Electrónico"
                              type="email"
                              error={err.email}
                              value={user?.email}
                              onChange={(e) => handleValue("email", e.target.value)}
                            />
                            <Input
                              title="Contraseña"
                              type="password"
                              error={err.password}
                              value={user?.password}
                              onChange={(e) => handleValue("password", e.target.value)}
                            />
                            <div className="text-center pt-1 mb-1 pb-1">
                              <Button variant="primary" textButton={register ? 'Registrar' : 'Iniciar sesión'} className='btn btn-default btn-hover-primary btn-primary btn-sm w-100 mt-10 font-weight-normal' click={() => onSave()} />
                            </div>
                            <div className="text-center pt-1 mb-5 pb-1">
                              <Link
                                className="btn btn-default font-weight-normal btn-hover-secondary btn-secondary btn-sm w-100"
                                to="/"
                              >
                                Ir a la tienda.
                              </Link>
                            </div>
                            <div className="d-flex align-items-center justify-content-center pb-4">
                              <p className="mb-0 me-2">{register ? '¿Tienes una cuenta?' : '¿No tienes una cuenta?'}</p>
                              <Link to={`${register ? '/Login' : '/Register'}${url ? '?url=cart' : ''}`} type="button" onClick={() => reset()} className="btn btn-outline-danger">{register ? 'Iniciar sesión' : 'Crear'}</Link>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="col-lg-5 gradient-custom-2 ocultar-div">
                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                          <h4 className="mb-4 text-white">Somos la marca de muebles que apuesta por hacer las cosas diferentes.</h4>
                          <p className="small mb-0 text-white">Trabajamos para revolucionar el sector del mueble, el diseño y la decoración. Apostamos por darle una vuelta y ser la opción para inconformistas como tú que buscan algo más. <br /><br />
¿Nuestro objetivo?  <br /> Crear productos de diseño y calidad con un servicio impecable. Porque no enviamos cohetes a la luna (todavía), pero sí que entregamos en tiempo récord.<br /><br />
¿Nuestra obsesión?<br /> Perfeccionar cada detalle. Es por eso por lo que seguimos cuidadosamente todo el proceso de diseño, fabricación y distribución de nuestros productos con el fin de crear diseños atractivos y funcionales, de gran calidad y a precios asequibles.<br /><br />
</p>
                        </div>
                      </div>
                    </Row>
                  </div>
                </div>
              </Row>
            </Container>
          </div>

        </>)}

      </main>
    </>
  );
};

export default SignIn;