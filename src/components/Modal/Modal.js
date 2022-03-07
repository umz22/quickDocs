import ReactDOM from 'react-dom'

import './Modal.css'

export default function Modal({ children, isSalesModal, handleClose }) {
    
    return ReactDOM.createPortal((
        <div className="modal-backdrop">
            <div className="modal" style={{
                border: "1px solid",
                borderColor: "#555",
                textAlign: "center"
            }}>
                {children}
            </div>
        </div>
    ), document.body)
}