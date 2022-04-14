import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import ComponentList from "../../components/componentList";
import { API, fetcher } from "../../global/global";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { pcComponent } = context.query;
  const repoInfo = await fetcher(API + pcComponent);
  return {
    props: {
      fallback: {
        [API + pcComponent]: repoInfo,
      },
    },
  };
}
function Repo() {
  const router = useRouter();
  const { pcComponent } = router.query;
  const { data, error } = useSWR(API + pcComponent, fetcher, {
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
