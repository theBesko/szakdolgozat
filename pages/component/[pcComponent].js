import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import ComponentList from "../../components/componentList";
import { genAPI, fetcher } from "../../global/global";
import { useRouter } from "next/router";

const API =
  "https://buildapc-szakdolgozat-default-rtdb.europe-west1.firebasedatabase.app/DATABASE_ROOT/componentStorage/"; //"http://localhost:3000/api/";

export async function getServerSideProps(context) {
  const { pcComponent } = context.query;
  const repoInfo = await fetcher(API + pcComponent + ".json");
  return {
    props: {
      fallback: {
        [API + pcComponent + ".json"]: repoInfo,
      },
    },
  };
}
function Repo() {
  const router = useRouter();
  const { pcComponent } = router.query;
  const { data, error } = useSWR(API + pcComponent + ".json", fetcher, {
    refreshInterval: 1000,
  });

  if (error) return <h1>ERROR</h1>;
  if (!data) return <h1>LOADING</h1>;

  return (
    <>
      <h1>{data.storage}</h1>
    </>
  );
}

export default function ComponentPage({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <ComponentList />
      <Repo />
    </SWRConfig>
  );
}
