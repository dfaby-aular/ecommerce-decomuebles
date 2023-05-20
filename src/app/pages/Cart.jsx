import Financial from '../components/custom/Financial';
import ItemCart from '../components/custom/ItemCart';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartContent } from "../../contexts/CartContext";
import { Button, Loading } from '../components/commons';
import { Container, Row } from 'react-bootstrap';

const Cart = () => {
    const [loading, setLoading] = useState(false);
    const { listCart, removeItem, clear } = useCartContent();

    useEffect(() => {
        setLoading(false)
    }, [listCart])

    return (
        <>
            {
                loading ? <Loading loading={loading} /> :
                    <div id="" className="features" >
                        <div className="text-center items-container" style={{ marginTop: 50 }}>
                            <h1>Carrito de compra</h1>
                        </div>
                        {
                            listCart.length ?
                                <>
                                    <Container>
                                        <Row>
                                            <div className='col-8 d-flex' style={{ justifyContent: "flex-start" }}><Link to="/" className="btn btn-success"> Seguir Comprando </Link></div>
                                            <div className='col-4 d-flex' style={{ justifyContent: "end" }}><Button variant="danger" textButton="Eliminar todos los productos" click={() => clear()} /></div>
                                        </Row>
                                        <Row style={{ marginTop: '50px' }}>
                                            <div className='col-9'>
                                                {listCart?.map((i, index) => (
                                                    <ItemCart key={index} product={i} remove={removeItem} />
                                                ))}
                                            </div>
                                            <div className='col-3'>
                                                <Financial />
                                            </div>
                                        </Row>
                                    </Container>
                                </>
                                : (
                                    <Container className="col-sm-12 text-center features" style={{ marginTop: 100 }}>
                                        <h4 style={{ color: "#898585" }}>No hay información para mostrar</h4>
                                        <Link style={{ color: "#F81F55" }} to="/">Haga clic aquí para ir a Deco Muebles</Link>
                                    </Container>
                                )
                        }
                    </div>

            }
        </>
    )
}

export default Cart;