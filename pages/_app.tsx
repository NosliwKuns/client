import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import useLocalStorage from '../app/useLocalStorage';

function MyApp({ Component, pageProps }: AppProps) {
  const [ token, setToken ] = useLocalStorage('Auth-token', '')
  console.log(pageProps)
  return <Component {...pageProps} token={token} setToken={setToken}/>
}

export default MyApp
