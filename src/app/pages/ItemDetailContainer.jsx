import { useCallback, useEffect, useState } from 'react';
import { conectorServices } from '../../services/api-conector'
import { useParams } from 'react-router-dom';
import { Loading } from '../components/commons';
import ItemDetails from '../components/custom/ItemDetails';
import { useCartContent } from "../../contexts/CartContext";

const serviceItems = conectorServices('products');


export const ItemDetailContainer = () => {
    const { addItem } = useCartContent();
    const { id } = useParams();
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(false);
    const [qty, setQty] = useState(0);

    const promise = useCallback(async (id) => {
        setLoading(true);
        const item = await serviceItems.getById(id);
        setItem(item)
        setLoading(false);
    }, [setItem])

    const onAdd = (product, qty) => {
        alert(`Usted ha seleccionado ${qty} ${product.name}`)
        setQty(product.qty);
        addItem(product, qty)
    }
    useEffect(() => {
        promise(id)
    }, [promise, id])

    return (
        <>
            {
                loading ? <Loading loading={loading} /> :
                    <div>
                    <ItemDetails item={item} onAdd={onAdd} qty={qty} />
                    </div>
            }
        </>
    )
}

export default ItemDetailContainer;