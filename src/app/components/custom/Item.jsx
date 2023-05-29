import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Item = ({ item }) => {
    return (
        <>
            <Row className="d-flex align-item-center col-12">
                    <Col sm={12} style={{ backgroundImage: `url(${item?.imageURL})`, paddingTop: "10%", backgroundPosition: "center", backgroundSize: "100%", height: "350px", width: "290px", backgroundRepeat: "no-repeat", borderRadius: "15px", boxShadow: "0em 0.1rem 0.3rem 0.2px", opacity: "0.9" }}>
                    </Col>
                    <Col sm={12}>
                        <strong style={{ fontSize: "20px", display: "flex", justifyContent: "flex-start", textTransform: "capitalize" }}>{item?.name}
                        </strong><Link to={`/detail/${item?.id}`} style={{ color: 'red', fontSize: '18px', cursor: "pointer" }}>
                            Ver detalle
                        </Link> <br />
                        <span style={{ fontSize: 'inherit' }}><strong>Precio $</strong> {item?.price}.</span>
                        <strong> / </strong>
                        <span style={{ fontSize: 'inherit' }}><strong>Stock </strong> {item?.stock}.</span>
                    </Col>
                </Row>
        </>
    )
}

export default Item;