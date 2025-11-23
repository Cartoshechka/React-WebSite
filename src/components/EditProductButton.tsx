import { type ReactNode, useState } from 'react'
import type { ProductInterface } from '../types/product.interface'
import { API_URL } from '../utils/mockapi'
import { useUpdate } from '../hooks/useUpdate'
import ProductForm from './ProductForm'
import Modal from '../modals/Modal'

interface EditProductButtonProps {
    children: ReactNode
    product: ProductInterface
    reload: () => void
}
const EditProductButton = ({
                               children,
                               product,
                               reload
                           }: EditProductButtonProps) => {
    const [showModal, setShowModal] = useState(false)

    const { updateProduct } = useUpdate(API_URL)

    const handleOpenModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleSubmit = async (product: Partial<ProductInterface>) => {
        try {
            console.log('Submitted?', product)
            const updatedProduct = await updateProduct(product as ProductInterface)
            console.log('Updated product:', updatedProduct)
            handleCloseModal()
            reload()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <button className="product-item__edit" onClick={handleOpenModal}>
                {children}
            </button>
            {showModal && (
                <Modal onClose={handleCloseModal}>
                    <h2 className="modal__title">Edit product</h2>

                    <ProductForm onSubmit={handleSubmit} product={product} />
                </Modal>
            )}
        </>
    )
}

export default EditProductButton