import { useNavigate } from 'react-router-dom';
import ItemCount from './ItemCount';
import { Button } from "../commons"
import { Link } from 'react-router-dom';
import { getOuth } from '../../../services/storage.service';
import { conectorServices } from '../../../services/api-conector';
import ModalCheckout from "./modals/ModalCkeckout";
import { useState } from 'react';

const serviceItems = conectorServices('Items');

const ItemDetails = ({ item, onAdd, qty }) => {
    const navegate = useNavigate();
    const outh = getOuth();
    const [isShow, setIsShow] = useState(false);

    const handleClose = () => setIsShow(false)
    const handleCheckout = async () => {
        try {
            await serviceItems.detele(item.id)
            navegate(`/`);
        } catch (err) {
            console.error(err);
        }
    }
    const props = { handleClose, isShow, handleCheckout, message: 'Are you sure to remove this product?', variant: 'danger' }
    return (
        <>
            <ModalCheckout {...props} />
            <section id="item" className="features" >
                <div className='items-container'>
                    <div className="row" style={{ marginTop: "15px" }}>
                        <div className="col-12 text-center">
                            <h2>Detalle del producto</h2>
                        </div>

                        <div className="row" style={{ marginTop: '50px' }}>
                            <div className="col-6">
                                <div className='text-center d-flex' style={{ justifyContent: "center" }}>
                                    <div className="hover" style={{ backgroundImage: `url(${item?.imageURL})`, paddingTop: "55%", backgroundPosition: "center", backgroundSize: "100%", height: "550px", width: "450px", backgroundRepeat: "no-repeat", borderRadius: "15px", boxShadow: "0em 0.1rem 0.3rem 0.2px" }}>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 text-left">
                                <div className='col-12'>
                                    <div>
                                        <ul className='pl-0'>
                                            <li style={{ marginBottom: "35px", fontSize: "30px", }}>{item?.name}</li>
                                            <li>Precio: ${item?.price}</li>
                                            <li>Color: {item?.color}</li>
                                            <li>Stock:  {item?.stock} Unidades</li>
                                            <li style={{ marginTop: "35px" }}>Descripción:   {item?.description}</li>
                                        </ul>
                                    </div>
                                    <div className='text-right'>
                                        {
                                            outh?.role === 'admin' &&
                                            (<>
                                                <Link to={`/create_product?id=${item.id}`} type="button" className="btn btn-outline-primary" >Actualizar Producto</Link>
                                                <Button variant="outline-danger" textButton="Eliminar Producto" style={{ marginLeft: '10px' }} click={() => setIsShow(true)} />
                                            </>)
                                        }
                                    </div>
                                </div>
                                <div className='col-12' style={{ display: "flex", justifyContent: "end" }}>
                                    {
                                        outh?.role !== 'admin' &&
                                        <>
                                            {qty === 0 ?
                                                <ItemCount product={item} initial={0} onAdd={onAdd} /> :
                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <Link className='btn btn-warning' to='/cart'>Verificar</Link>
                                                </div>
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ItemDetails;