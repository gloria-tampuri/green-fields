import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function useBatch(cropId) {
    const { data, error } = useSWR(`/api/crop/${cropId}`, fetcher,{refreshInterval: 100 })
  
    return {
      batch: data,
      isLoading: !error && !data,
      isError: error
    }
  }