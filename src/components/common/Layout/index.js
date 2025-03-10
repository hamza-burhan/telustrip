import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Head from "next/head";


export default function Layout({ children }) {
    return (
      <>
        <Head>
          <title>Home - Telus</title>
          <meta name="description" content="Home page" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Navbar isBanner={true} />
        <main>{children}</main>
        <Footer />
      </>
    );
  }
  