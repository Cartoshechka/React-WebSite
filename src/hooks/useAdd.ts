import axios from 'axios'
import type { ProductInterface } from '../types/product.interface'

export const useAdd = (url: string) => {
    const addProduct = async (product: Partial<ProductInterface>) => {
        try {
            const response = await axios.post(url, product)
            return response.data
        } catch (error) {
            console.error('Error adding product:', (error as Error).message)
            throw new Error('Error adding product')
        }
    }
    return { addProduct }
}