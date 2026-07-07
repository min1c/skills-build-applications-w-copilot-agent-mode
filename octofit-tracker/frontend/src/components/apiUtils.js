export function normalizeCollectionResponse(payload) {
  if (Array.isArray(payload)) {
    return {
      items: payload,
      total: payload.length,
    }
  }

  if (payload && Array.isArray(payload.data)) {
    return {
      items: payload.data,
      total: typeof payload.count === 'number' ? payload.count : payload.data.length,
    }
  }

  if (payload && Array.isArray(payload.results)) {
    return {
      items: payload.results,
      total:
        typeof payload.count === 'number'
          ? payload.count
          : typeof payload.total === 'number'
            ? payload.total
            : payload.results.length,
    }
  }

  return {
    items: [],
    total: 0,
  }
}

export async function fetchCollection(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()
  return normalizeCollectionResponse(payload)
}
