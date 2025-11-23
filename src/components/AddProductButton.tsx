import { useState } from 'react'
import type { ProductInterface } from '../types/product.interface'
import Modal from '../modals/Modal'
import { API_URL } from '../utils/mockapi'
import { useAdd } from '../hooks/useAdd'
import ProductForm from '../components/ProductForm'
// import { INITIAL_PRODUCT } from '../data/mockData'
import { EMPTY_PRODUCT } from '../data/mockData'


const AddProductButton = () => {
    const [showModal, setShowModal] = useState(false)
    const { addProduct } = useAdd(API_URL)

    const handleOpenModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleSubmit = async (product: Partial<ProductInterface>) => {
        try {
            const newProduct = await addProduct(product)
            console.log('New product:', newProduct)
            handleCloseModal()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <button className="add-product-btn" onClick={handleOpenModal}>
                Add Product
            </button>
            {showModal && (
                <Modal onClose={handleCloseModal}>
                    <h2 className="modal__title">Add a new product</h2>

                    <ProductForm onSubmit={handleSubmit} product={EMPTY_PRODUCT} />
                </Modal>
            )}
        </>
    )
}

export default AddProductButton