import "@/styles/globals.scss";
import Layout from "@/components/common/Layout";
import { DataProvider } from "@/contexts/DataContext";
export default function App({ Component, pageProps }) {
  return (
    <DataProvider>
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </DataProvider>
  );
}
