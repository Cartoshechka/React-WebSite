import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import type { ProductInterface } from '../types/product.interface'
import { API_ITEMS_PER_PAGE_LIMIT, createUrl } from '../utils/mockapi'
import Product from '../components/Product'
import AddProductButton from '../components/AddProductButton'

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = useState(() => {
        const pageParam = searchParams.get('page')
        return pageParam ? parseInt(pageParam) : 1
    })
    const [reloadTrigger, setReloadTrigger] = useState(0)
    const {
        data: products,
        error,
        isLoading
    } = useFetch<ProductInterface>(createUrl(page), undefined, reloadTrigger)

    useEffect(() => {
        setSearchParams({ page: page.toString() })
    }, [page, setSearchParams])

    return (
        <div>
            <h1>Products List</h1>
            <AddProductButton />
            {isLoading && <h2 className="loading">Loading products...</h2>}
            {error && <h2 className="error">{error}</h2>}
            {!isLoading && !error && products.length > 0 && (
                <div className="content">
                    <div className="pagination">
                        <button
                            className="pagination__btn"
                            disabled={page === 1}
                            onClick={() => setPage((prevState) => prevState - 1)}
                        >
                            Previous
                        </button>
                        <span className="pagination__page">Page {page}</span>
                        <button
                            className="pagination__btn"
                            disabled={products.length < API_ITEMS_PER_PAGE_LIMIT}
                            onClick={() => setPage((prevState) => prevState + 1)}
                        >
                            Next
                        </button>
                    </div>

                    <ul className="products-list">
                        {products.map((product: ProductInterface) => (
                            <Product
                                key={product.id}
                                product={product}
                                reload={() => setReloadTrigger(product.id)}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Products