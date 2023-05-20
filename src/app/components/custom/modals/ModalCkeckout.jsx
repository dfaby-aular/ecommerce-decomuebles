import { ModalSave } from "../../commons"

const ModalCheckout = ({ handleCheckout, isShow, handleClose, message, variant = 'warning' }) => {
    const handleSave = () => {
        handleCheckout();
        handleClose();
    }

    const props = { isShow, handleClose, handleSave, title: 'Verificación', variant };
    return (
        <>
            <ModalSave {...props}>
                <h4>{message}</h4>
            </ModalSave>
        </>
    )
} 
export default ModalCheckout;