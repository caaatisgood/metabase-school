const getStorageKey = (key: string) => `MBS_${key}`

export const API_HOST_STORAGE_KEY = getStorageKey('API_ENDPOINT')
export const SESSION_ID_STORAGE_KEY = getStorageKey('SESSION_ID')
export const USERNAME_STORAGE_KEY = getStorageKey('USERNAME')
