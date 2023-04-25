import { Link } from "react-router-dom";

const Item = ({ item }) => {
    return (
        <>
            <div className="col-sm-3 text-center feature">
                    <>
                        <div className="hover" style={{ backgroundImage: `url(${item?.imageURL})`, paddingTop: "55%", backgroundPosition: "top center", backgroundSize: "100%", height:"300px", backgroundRepeat:"no-repeat" }}>
                        </div>
                        <div className="text">
                                <div className="modal-video-container">
                                    <Link to={`/detail/${item?.id}`} style={{ color: 'red', fontSize: '30px', cursor: "pointer" }}>
                                        Ver detalle
                                    </Link>
                                </div>
                        </div>
                    </>
                <div >
                    <span style={{ fontSize: 'inherit' }}><strong>Precio $</strong> {item.price}.</span>
                    <strong> / </strong>
                    <span style={{ fontSize: 'inherit' }}><strong>Stock </strong> {item.stock}.</span>
                </div>
            </div>
        </>
    )
}

export default Item;