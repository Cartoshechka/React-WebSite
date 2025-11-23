import { useState } from 'react'
import type { FormEvent } from 'react'
import { PRODUCT_CATEGORIES } from '../data/mockData'
import type { ProductInterface } from '../types/product.interface'
import InputField from './InputField'
import SelectField from './SelectField'

interface ProductFormProps {
    onSubmit: (product: Partial<ProductInterface>) => void
    product: Partial<ProductInterface>
}

const ProductForm = ({ onSubmit, product }: ProductFormProps) => {

    const [name, setName] = useState(product.name ?? '')
    const [description, setDescription] = useState(product.description ?? '')
    const [price, setPrice] = useState(product.price ?? 0)
    const [image, setImage] = useState(product.image ?? '')
    const [category, setCategory] = useState(product.category ?? '')


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        const returnedProduct: Partial<ProductInterface> = {
            name,
            description,
            price,
            image,
            category
        }

        if (product.id) {
            returnedProduct.id = product.id
        }

        onSubmit(returnedProduct)
    }

    return (
        <form onSubmit={handleSubmit}>
            <InputField
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='e.g. "AMD Radeon RX 7800 XT Graphics Card"'
            />

            <InputField
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='e.g. "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J"'
            />

            <InputField
                id="price"
                type='number'
                value={price === 0 ? '' : `${price}`}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                placeholder="e.g. 386.0"
            />

            <InputField
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder='e.g. "https://loremflickr.com/640/480/random"'
            />

            <SelectField
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={PRODUCT_CATEGORIES}
            />

            <div className="form-group">
                <button type="submit" className="form-button">
                    Submit
                </button>
            </div>
        </form>
    )
}

export default ProductForm