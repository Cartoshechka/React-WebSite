import { type ProductInterface } from '../types/product.interface.ts'

export interface Option {
    value: string
    text: string
}

export const PRODUCT_CATEGORIES: Option[] = [
    {
        value: 'Laptops',
        text: 'Laptops'
    },{
        value: 'Desktops and All-in-Ones',
        text: 'Desktops and All-in-Ones'
    },{
        value: 'Graphics Cards',
        text: 'Graphics Cards'
    },{
        value: 'Monitors',
        text: 'Monitors'
    },{
        value: 'Accessories and Peripherals',
        text: 'Accessories and Peripherals'
    }
]

export const INITIAL_PRODUCT: ProductInterface = {
    id: 999,
    name: 'AMD Radeon RX 7800 XT Graphics Card',
    description:
        'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
    price: 386.0,
    image: 'https://loremflickr.com/640/480/random',
    category: 'Graphics Cards'
}

export const EMPTY_PRODUCT: Partial<ProductInterface> = {
    name: '',
    description: '',
    price: 0,
    image: '',
    category: ''
}

export const SORT_BY_LIST: Option[] = [
    { value: 'default', text: 'Default order' },
    { value: 'name', text: 'Name' },
    { value: 'price', text: 'Price' },
    { value: 'category', text: 'Category' }
]

export const ORDER_BY_LIST: Option[] = [
    { value: 'asc', text: 'Ascending' },
    { value: 'desc', text: 'Descending' }
]