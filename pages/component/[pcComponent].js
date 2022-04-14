import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import { API, fetcher } from "../../global/global";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import ComponentList from "../../components/ComponentList";

export async function getServerSideProps(context) {
  const { pcComponent } = context.query;
  try {
    const repoInfo = await fetcher(API + pcComponent);
    return {
      props: {
        fallback: {
          [API + pcComponent]: repoInfo,
        },
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
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
      <Header />
      <ComponentList />
      <Repo />
    </SWRConfig>
  );
}
