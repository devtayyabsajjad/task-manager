/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_API_REGISTER: string
  readonly VITE_API_LOGIN: string
  readonly VITE_API_LOGOUT: string
  readonly VITE_API_JWT_REFRESH: string
  readonly VITE_API_USER: string
  readonly VITE_API_WORKSPACES: string
  readonly VITE_API_BOARDS: string
  readonly VITE_API_LISTS: string
  readonly VITE_API_CARDS: string
  readonly VITE_WS_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
