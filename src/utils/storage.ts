type StorageKey = string

const _get = (key: StorageKey) => {
  if (typeof window === 'undefined') {
    return
  }
  return window.localStorage.getItem(key)
}

const _set = (key: StorageKey, value: any) => {
  if (typeof window === 'undefined') {
    return
  }
  return window.localStorage.setItem(key, value)
}

const _remove = (key: StorageKey) => {
  if (typeof window === 'undefined') {
    return
  }
  return window.localStorage.removeItem(key)
}

export default {
  get: _get,
  set: _set,
  remove: _remove,
}
