import { useState, useEffect, useRef} from 'react'
import { useSearchParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import type { ProductInterface } from '../types/product.interface'
import { API_ITEMS_PER_PAGE_LIMIT, createUrl } from '../utils/mockapi'
import Product from '../components/Product'
import AddProductButton from '../components/AddProductButton'
// import {debounce} from "../utils/debounce.tsx";
import {ORDER_BY_LIST, SORT_BY_LIST} from "../data/mockData.ts";
import {MdRefresh} from "react-icons/md";
import InputField from "../components/InputField.tsx";
import SelectField from "../components/SelectField.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../redux/store.ts";

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [name, setName] = useState('')
    const [sort, setSort] = useState<string>('')
    const [order, setOrder] = useState<'asc' | 'desc'>('asc')
    const {isAuthenticated} = useSelector((state: RootState) => state.auth)
    const [page, setPage] = useState(() => {
        const pageParam = searchParams.get('page')
        return pageParam ? parseInt(pageParam) : 1
    })
    const [reloadTrigger, setReloadTrigger] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)
    const {
        data: products,
        error,
        isLoading
    } = useFetch<ProductInterface>(createUrl(page, name, sort, order), undefined, reloadTrigger)
/*    const debouncedSetName = debounce(setName, 1000)*/

    const resetFilters = () => {
        setName('')
        setSort('')
        setOrder('asc')
        if(inputRef.current) inputRef.current.value = ''
    }

    useEffect(() => {
        setSearchParams({ page: page.toString() })
    }, [page, setSearchParams])

    return (
        <div>
            <h1>Products List</h1>
            <div className='products-filter'>
               {/* <div className='form-group'>
                    <label htmlFor="filter">Filter</label>
                    <input
                        ref={inputRef}
                        id={'filter'}
                        type="text"
                        placeholder='Filter by name'
                        onChange={(e) => debouncedSetName(e.target.value)}
                    />
                </div>*/}
                <InputField
                    ref={inputRef}
                    id="filter"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Filter by name'
                />
                {/*<div className='form-group'>
                    <label htmlFor="sort">Sort by</label>
                    <select id={'sort'} value={sort} onChange={(e) => setSort(e.target.value)}>
                        {SORT_BY_LIST.map((el, index)  => (
                            <option key={index} value={el.value}>{el.text}</option>
                        ))}
                    </select>
                </div>*/}
                <SelectField
                    id="sort"
                    label="Sort by"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    options={SORT_BY_LIST}
                />
                {/*<div className='form-group'>
                    <label htmlFor="order">Order</label>
                    <select id={'order'} value={order} onChange={(e) => setOrder(e.target.value as 'asc' | 'desc')}>
                        {ORDER_BY_LIST.map((el, index)  => (
                            <option key={index} value={el.value}>{el.text}</option>
                        ))}
                    </select>
                </div>*/}
                <SelectField
                id="order"
                label="Order"
                value={order}
                onChange={(e) => setOrder(e.target.value as 'asc' | 'desc')}
                options={ORDER_BY_LIST}
                />
                <button onClick={resetFilters} className='reset-filters'>
                    <MdRefresh className='icon' onClick={resetFilters} />
                </button>
            </div>
            {isLoading && <h2 className="loading">Loading products...</h2>}
            {error && <h2 className="error">{error}</h2>}
            {!isLoading && !error && (
                <div className="content">
                <div>
                    {isAuthenticated && <AddProductButton />}
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
                </div>
                    {products.length > 0 ? (<ul className="products-list">
                            {products.map((product: ProductInterface) => (
                                <Product
                                    key={product.id}
                                    product={product}
                                    reload={() => setReloadTrigger(product.id)}
                                />
                            ))}
                        </ul>
                    ) : (
                        <p className='products-empty'>No products found.</p>
                    )
                    }

                </div>
            )}
        </div>
    )
}

export default Products