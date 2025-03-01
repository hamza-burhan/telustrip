import Navbar from "@/components/common/Navbar";
import ResultDetail from "@/components/Result";
import Head from "next/head";

export default function Result() {
  return (
    <>
      <Head>
        <title>Result - Telus</title>
        <meta name="description" content="Home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar isFixed={true} />
      <ResultDetail />
    </>
  );
}
