import { createPinia } from 'pinia'
import { useAppStore } from './modules/app'

export const store = createPinia()

const storeObj = {
  app: useAppStore
}

export function useStore(key) {
  return storeObj[key]()
}
