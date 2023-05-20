import { Modal } from "react-bootstrap";
import { Button } from '.'

const ModalSave = ({ isShow, handleClose, title, children, handleSave, variant }) => {
    return (
        <>
            <Modal
                show={isShow}
                onHide={handleClose}
                scrollable={false}
            >
                <Modal.Header closeButton className={`bg-${variant}`}>
                    <Modal.Title className="text-dark font-weight-bolder">
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
                <div className="m-3 d-flex justify-content-center">
                    <Button style={{marginRight:"20px"}} variant="danger" click={handleClose} textButton="Cerrar" /> 
                    <Button variant="success" click={handleSave} textButton="Aceptar" />
                </div>


            </Modal>

        </>
    )
}
export default ModalSave;