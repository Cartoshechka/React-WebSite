import { FaEdit, FaTrash } from 'react-icons/fa'
import type { ProductInterface } from '../types/product.interface'
import { API_URL } from '../utils/mockapi'
import { useDelete } from '../hooks/useDelete'
import EditProductButton from './EditProductButton'
import {useSelector} from "react-redux";
import type {RootState} from "../redux/store.ts";

interface ProductProps {
    product: ProductInterface
    reload: () => void
}

const Product = ({
                     product: { id, name, description, category, price, image },
                     reload
                 }: ProductProps) => {
    const { deleteProduct } = useDelete(API_URL)
    const {isAuthenticated} = useSelector((state: RootState) => state.auth)

    const handleDeleteProduct = async () => {
        try {
            await deleteProduct(id)
            reload()
        } catch (error) {
            console.error('Error deleting product:', (error as Error).message)
        }
    }

    const defaultImage: string = 'https://picsum.photos/640/480?random=graphics'

    const imageUrl: string =
        image || image.startsWith('https') ? image : defaultImage

    return (
        <li className="product-item">
            <h2 className="product-item__title">{name}</h2>
            <p className="product-item__description">{description}</p>
            <p className="product-item__category">{category}</p>
            <h3 className="product-item__price">${price}</h3>
            <img className="product-item__image" src={imageUrl} alt={name} />
            {isAuthenticated && ( <div className="product-item__actions">
                <button className="product-item__delete" onClick={handleDeleteProduct}>
                    <FaTrash />
                </button>
                <EditProductButton
                    product={{ id, name, description, category, price, image }}
                    reload={reload}
                >
                    <FaEdit />
                </EditProductButton>
            </div>)}
        </li>
    )
}

export default Product