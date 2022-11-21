import ReactDOM from 'react-dom'

// import './Modal.css'

// styles
import './DocModal.css'

export default function DocModal({children}) {

    return ReactDOM.createPortal((
        <div className="modal-backdrop">
            <div className="docModal" style={{
                borderColor: "#555",
                textAlign: "center"
            }}>
                {/* {note} */}
                {children}
            </div>
        </div>
    ), document.body)
}
