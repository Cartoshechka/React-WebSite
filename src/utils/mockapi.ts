export const API_URL: string =
    'https://6910ddaa7686c0e9c20beb18.mockapi.io/products'

export const API_ITEMS_PER_PAGE_LIMIT = 12

export function createUrl(page: string | number, name: string, sortBy: string, order: 'asc' | 'desc'): string {
    const urlObj: URL = new URL(API_URL)
    urlObj.searchParams.append('page', `${page}`)
    urlObj.searchParams.append('limit', `${API_ITEMS_PER_PAGE_LIMIT}`)
    void (name && urlObj.searchParams.append('name', `${name}`))
    void (sortBy && urlObj.searchParams.append('sortBy', `${sortBy}`))
    void (order && urlObj.searchParams.append('order', `${order}`))

    return urlObj.toString()
}
