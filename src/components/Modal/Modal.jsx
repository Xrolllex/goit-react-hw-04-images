import { useEffect } from "react"; 
import PropTypes from "prop-types";
import css from "./Modal.module.css";

const Modal = ({url, onClose}) => {
    const clickBackdrop = (event) => {
        if (event.target === event.currentTarget) {
            onClose()
        }
    }

   

    const clickEsc = (event) => {
        if (event.code === 'Escape') {
            onClose();
        }
    }
    
    useEffect(() => {
        window.addEventListener("keydown", clickEsc);
        return () => {
            window.removeEventListener("keydown", clickEsc);
        };
    });


    
        return (
            <div className={css.overlay} onClick={clickBackdrop}>
                <div className={css.modal}>
                    <img src={url} alt="" />
                </div>
            </div>
        )
    }



Modal.propTypes = {
    url: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Modal;