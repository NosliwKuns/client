import Head from "next/head";
import { ReactElement } from "react";

type Props = {
  children?: JSX.Element | JSX.Element[],
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Foxbel Music</title>
      </Head>

      <div className="container">
        { children }
      </div>
    </>
  )
};

export default Layout;