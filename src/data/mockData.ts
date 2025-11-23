import { type ProductInterface } from '../types/product.interface.ts'

export const PRODUCT_CATEGORIES: string[] = [
    'Laptops',
    'Desktops and All-in-Ones',
    'Graphics Cards',
    'Monitors',
    'Accessories and Peripherals'
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