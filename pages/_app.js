import { createClient, Provider } from "urql";
import Nav from "../components/Nav";
import { StateContext } from "../lib/context";
import "../styles/globals.css";

const client = createClient({ url: "http://localhost:1337/graphql" });
// const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });
function MyApp({ Component, pageProps }) {
  console.log("env here", process.env.NEXT_PUBLIC_BACKEND_API);
  return (
    <StateContext>
      <Provider value={client}>
        <Nav />
        <Component {...pageProps} />
      </Provider>
    </StateContext>
  );
}

export default MyApp;
