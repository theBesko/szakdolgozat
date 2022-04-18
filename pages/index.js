import useSWR, { SWRConfig } from "swr";
import { app, database } from "../global/firebase";
import { getDatabase, get, set, ref, child } from "firebase/database";
import ComponentList from "../components/ComponentList";
import Header from "../components/Header";
import { API, fetcher } from "../global/global";
import "bootstrap/dist/css/bootstrap.min.css";

export async function getServerSideProps() {
  const repoInfo = await fetcher(API);
  return {
    props: {
      fallback: {
        [API]: repoInfo,
      },
    },
  };
}

function Repo() {
  const { data, error } = useSWR(API, fetcher, {
    refreshInterval: 1000,
  });

  if (error) return <h1>ERROR</h1>;
  if (!data) return <h1>LOADING</h1>;

  return (
    <>
      <h1>szia</h1>
    </>
  );
}

export default function Home({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Header />
      <ComponentList />
      <Repo />
    </SWRConfig>
  );
}
