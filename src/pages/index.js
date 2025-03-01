import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Main from "@/components/Home";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - Telus</title>
        <meta name="description" content="Home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar isBanner={true} />
      <Main />
      <Footer />
    </>
  );
}
