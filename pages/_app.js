import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "@/store";
import Layout from "@/components/Layout";
import "@/styles/globals.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </QueryClientProvider>
  );
}
