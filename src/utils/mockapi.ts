export const API_URL: string =
    'https://6910ddaa7686c0e9c20beb18.mockapi.io/products'

export const API_ITEMS_PER_PAGE_LIMIT = 12

export function createUrl(page: string | number): string {
    const urlObj: URL = new URL(API_URL)
    urlObj.searchParams.append('page', `${page}`)
    urlObj.searchParams.append('limit', `${API_ITEMS_PER_PAGE_LIMIT}`)

    return urlObj.toString()
}
