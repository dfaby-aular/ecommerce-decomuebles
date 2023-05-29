import Item from "./Item";
import { Col, Container, Row} from 'react-bootstrap';

const ListItems = ({ list }) => {
    return (
        <>
            <div className='items-container' id="items">
                <Container>
                    <Row>
                        {
                            list.length ?
                                list?.map((i, index) => (
                                    <Col key={index}  className="mb-5 col-4">
                                        <Item item={i}/>
                                    </Col>
                                )) : (
                                    <Col className="col-12 text-center feature ">
                                        <h4 style={{ color: "#898585" }}>No hay datos para mostrar</h4>
                                    </Col>
                                )
                        }
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default ListItems;
