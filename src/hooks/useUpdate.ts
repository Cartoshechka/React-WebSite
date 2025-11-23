import axios from 'axios'
import type { ProductInterface } from '../types/product.interface'

export const useUpdate = (url: string) => {
    const updateProduct = async (data: ProductInterface) => {
        try {
            const response = await axios.put(`${url}/${data.id}`, data)
            return response.data
        } catch (error) {
            console.error('Error updating product:', (error as Error).message)
            throw new Error('Error updating product')
        }
    }

    return { updateProduct }
}