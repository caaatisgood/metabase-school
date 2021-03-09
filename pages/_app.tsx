import type { AppProps } from 'next/app'
import '../src/components/layout.css'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App
