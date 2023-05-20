import { Button } from "../commons";
import { Link } from 'react-router-dom';

const ItemCart = ({ product, remove }) => {

    return (
        <>
            <div className="row mb-4">
                <div className="col-3 pr-0">
                    <div className="d-flex" style={{justifyContent: "center"}}>
                        <div className="hover" style={{ backgroundImage: `url(${product?.imageURL})`, paddingTop: "55%", backgroundPosition: "center", backgroundSize: "100%", height: "180px", width: "150px" }}>
                        </div>
                    </div>
                </div>
                <div className="col-5 pl-0">
                    <div className="text-left">
                        <ul>
                            <li className="mt-2"><strong>Nombre:</strong> {product?.name}</li>
                            <li className="mt-2" style={{fontSize: "16px"}}><strong>Descripción:</strong> {product?.description}</li>
                        </ul>
                    </div>
                    <div style={{ margin: "30px 30px 0px 0px" }}>
                        <Link to={`/detail/${product.id}`} className="btn btn-success" style={{ marginRight: 10 }}> Detalle </Link>
                        <Button variant="danger" textButton="Eliminar" click={() => remove(product)} />
                    </div>
                </div>
                <div className="col-3 text-center p-0">
                    <div className="mt-4">
                        <span style={{ fontSize: 18 }}>{product?.qty} <strong>Producto(s)</strong> - $ {product?.price} </span>
                    </div>
                    <div className="mt-4">
                        <span style={{ fontSize: 30 }} > $ {product?.total}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ItemCart;