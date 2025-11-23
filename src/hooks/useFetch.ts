import { useEffect, useState } from 'react'
import axios from 'axios'

interface UseFetchResult<T> {
    data: T[]
    error: string | null
    isLoading: boolean
}

export const useFetch = <T>(
    url: string,
    limit?: number,
    reloadTrigger?: number | string
): UseFetchResult<T> => {
    const [data, setData] = useState<T[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)

                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(true)
                    }, 1000)
                })

                const response = await axios.get(limit ? `${url}?_limit=${limit}` : url)
                console.log('Reload Trigger:', reloadTrigger)

                if (response.status !== 200) {
                    throw new Error(
                        `Failed to fetch data with status: ${response.status}`
                    )
                }

                setData(response.data as T[])
            } catch (error) {
                console.error('Error fetching data:', error)
                setError(`Error fetching data: ${(error as Error).message}`)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [url, limit, reloadTrigger])

    return { data, error, isLoading }
}