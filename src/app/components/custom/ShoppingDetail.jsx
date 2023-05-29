import { Button } from "../commons";
import { Link } from 'react-router-dom';
import { conectorServices } from '../../../services/api-conector';
import { useState } from 'react';
import ModalCheckout from "./modals/ModalCkeckout";

const serviceItems = conectorServices('mappings');

const ShoppingDetail = ({ order, reset }) => {
    const [isShow, setIsShow] = useState(false);


    const handleClose = () => setIsShow(false)
    const date = order.date.toDate().toDateString()

    const handleCheckout = async () => {
        try {
            await serviceItems.detele(order.id);
            reset();
        } catch (err) {
            console.error(err);
            // despues manejar el error
        }
    }
    const props = { handleClose, isShow, handleCheckout, message: 'Are you sure to remove this order?', variant: 'danger' }
    return (
        <>
            <ModalCheckout {...props} />
            <div className="row v-align-children mt-4">
                <div className="col-md-3">
                    <div>
                        <h4 className="mt-10"> <strong>Orden de compra</strong></h4>
                        <p className="mt-10">N°: {order.id}</p>
                        <p className="mt-10">Fecha: {date}</p>
                    </div>
                    <div>
                        <Button variant="danger" textButton="Eliminar" click={() => setIsShow(true)} />
                    </div>
                </div>
                <div className="col-md-6">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Producto</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order.items?.map((i, index) => (
                                    <tr key={i.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td><Link to={`/detail/${i.id}`}>{i.title}</Link></td>
                                        <td>{i.quantity}</td>
                                        <td>{i.price}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="col-md-3">
                    <div className="card mx-3 px-3">
                        <div className="card-header text-center">
                            <span><strong>Resumen Final</strong></span>
                        </div>
                        <div className="card-body text-left">
                            <div className="row">
                                <div className='col-md-7 mb-2'>Sub Total $</div>
                                <div className='col-md-5  mb-2'> {order.subTotal} </div>
                                <div className='col-md-7 '>Impuestos $</div>
                                <div className='col-md-5  mb-2'> {order.taxes} </div>
                                <div className='col-md-7 '>Descuento $</div>
                                <div className='col-md-5  mb-2'> {order.discount} </div>
                            </div>
                        </div>
                        <div className="card-footer text-left  bg-transparent border-success mt-2 row">
                            <div className='col-md-7'>Total $</div>
                            <div className='col-md-5'>{order.total}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShoppingDetail;