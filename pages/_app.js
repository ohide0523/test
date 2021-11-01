import '../styles/globals.css'
import ContextProvider from "../components/globalContext"

function MyApp({ Component, pageProps }) {
  return <ContextProvider><Component {...pageProps} /></ContextProvider>
}

export default MyApp
