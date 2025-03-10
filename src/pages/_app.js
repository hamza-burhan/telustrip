import "@/styles/globals.scss";
import Layout from "@/components/common/Layout";
export default function App({ Component, pageProps }) {
  return (
    <Layout>
        <Component {...pageProps} />
    </Layout>
  );
}
