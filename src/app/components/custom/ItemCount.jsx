import { useState } from "react";
import { Button } from '../commons';


const ItemCount = ({ product, initial, onAdd, id }) => {
    const [count, setCount] = useState(initial);

    return (
        <>
            <div className='d-flex'>
            <span style={{ marginRight: '10px', marginLeft: "20px", display:"flex", alignItems:"center" }}> <strong>Cantidad:</strong> </span>
                <Button className="m-2" disabled={count === initial} variant="outline-success" textButton="-" click={() => setCount(count - 1)} />
                <span style={{ marginRight: '20px', marginLeft: "20px", display:"flex", alignItems:"center" }}> {count}</span>
                <Button className="m-2" style={{ marginRight: '30px' }}  disabled={count === product.stock} variant="outline-warning" textButton="+" click={() => setCount(count + 1)} /> 
                <Button className="m-2" textButton="Agregar al Carrito" click={() => onAdd(product, count)} disabled={count === 0} />
            </div>
        </>
    )
}

export default ItemCount;