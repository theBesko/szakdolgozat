import "bootstrap/dist/css/bootstrap.css";
import useSWR, { SWRConfig } from "swr";
import { app, database } from "../global/firebase";
import { getDatabase, get, set, ref, child } from "firebase/database";
import ComponentList from "../components/componentList";

const fetcher = (url) => fetch(url).then((res) => res.json());
const API =
  "https://buildapc-szakdolgozat-default-rtdb.europe-west1.firebasedatabase.app/DATABASE_ROOT.json";

export async function getServerSideProps() {
  const repoInfo = await fetcher(API);
  console.log(repoInfo);
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
      <h1>{}</h1>
    </>
  );
}

export default function Home({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <ComponentList />
      <Repo />
    </SWRConfig>
  );
}
