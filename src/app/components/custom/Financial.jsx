import ModalCheckout from "./modals/ModalCkeckout";
import { Button } from "../commons"
import { useCartContent } from "../../../contexts/CartContext";
import { conectorServices } from '../../../services/api-conector';
import { increment } from 'firebase/firestore/lite';
import { getOuth } from '../../../services/storage.service';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


const serviceMappigns = conectorServices('mappings');
const serviceItems = conectorServices('products');

const mapItem = (item) => {
    const { id, name, price, qty } = item
    return {
        id,
        price,
        quantity: qty,
        title: `${name}`
    };
}

const Financial = () => {
    const navegate = useNavigate();
    const outh = getOuth();
    const [isShow, setIsShow] = useState(false);
    const [message, setMessage] = useState('');
    const { getTotal, getDiscount, getTaxes, getSubTotal, listCart, clear } = useCartContent();

    const handleClose = () => setIsShow(false)
    const handleCheckout = async () => {
        if (!outh) {
            navegate('/login?url=cart');
            return;
        }
        const data = {
            userId: outh.id,
            items: listCart.map(mapItem),
            subTotal: getSubTotal(),
            discount: getDiscount(),
            taxes: getTaxes(),
            total: getTotal(),
        }
        try {
            await serviceMappigns.create(data);
            listCart.map(async (i) => {
                const data = { stock: increment(- i.qty) }
                await serviceItems.update(i.id, data);
            })
            clear();
            navegate(`/myShopping/${outh.id}`);
        } catch (error) {
            console.error(error)
        }
    }
    const handleShow = () => {
        let message = '¿Estás seguro de completar la compra?'
        if (!outh) {
            message = 'Debe iniciar sesión para completar la compra'
        }
        setMessage(message);
        setIsShow(true);
    }
    const props = { handleClose, isShow, handleCheckout, message }
    return (
        <>
            <ModalCheckout {...props} />
            <div className="card mx-3 px-3">
                        <div className="card-header text-center mx-0 px-0">
                        <span><strong>Resumen del Pedido</strong></span>
                </div>
                <div className="card-body text-left">
                    <div className="row">
                        <div className='col-md-7 mt-2 mb-2'>Sub Total $</div>
                        <div className='col-md-5 mt-2 mb-2'> {getSubTotal()} </div>
                        <div className='col-md-7 mt-2'>Impuestos 16%</div>
                        <div className='col-md-5 mt-2 mb-2'> {getTaxes()} </div>
                        <div className='col-md-7 mt-2'>Descuento {listCart.length}%</div>
                        <div className='col-md-5 mt-2 mb-2'> {getDiscount()} </div>
                    </div>
                </div>
                <div className="card-footer text-left bg-transparent border-success mt-2 row">
                    <div className='col-md-7 mt-2'>Total $</div>
                    <div className='col-md-5 mt-2'>{getTotal()}</div>
                </div>
                <div className="m-4 text-center">
                    <Button variant="warning" textButton="Comprar Ahora" click={() => handleShow()} />
                </div>
            </div>

        </>
    )
}

export default Financial;