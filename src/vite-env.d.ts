/// <reference types="vite/client" />

declare global {
  interface Window {
    mountChainlitWidget?: (config: { chainlitServer: string }) => void;
  }
}
