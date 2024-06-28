import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import store from "@/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const router = useRouter();

  console.log(router.pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        {router.pathname.startsWith("/auth") ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </Provider>
    </QueryClientProvider>
  );
}
