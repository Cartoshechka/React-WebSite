import type { ReactNode, MouseEvent } from 'react'
import { createPortal } from 'react-dom'

// const modalRoot = document.getElementById('modal-root')

const getModalRoot = () => {
    let root = document.getElementById('modal-root')
    if (!root) {
        root = document.createElement('div')
        root.id = 'modal-root'
        document.body.appendChild(root)
    }
    return root
}
interface ModalProps {
    children: ReactNode
    onClose: () => void
}
const Modal = ({ children, onClose }: ModalProps) => {
    // if (!modalRoot) return null
    const modalRoot = getModalRoot()
    let mouseDownTarget: EventTarget | null = null

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        mouseDownTarget = e.target
    }

    const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === mouseDownTarget && e.target === e.currentTarget) {
            onClose()
        }
    }

    const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
    }

    return createPortal(
        <div
            className="modal-overlay"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <div className="modal" onClick={handleContentClick}>
        <span className="modal__close" onClick={onClose}>
          &times;
        </span>
                {children}
            </div>
        </div>,
        modalRoot
    )
}

export default Modal