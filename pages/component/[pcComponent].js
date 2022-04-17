import useSWR, { SWRConfig } from "swr";
import { API, fetcher } from "../../global/global";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import ComponentList from "../../components/ComponentList";
import ComponentListDropdown from "../../components/ComponentListDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/pcComponent.module.scss";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  const { pcComponent } = context.query;
  try {
    const repoInfo = await fetcher(API + pcComponent);
    return {
      props: {
        fallback: {
          [API + pcComponent]: repoInfo,
          component: pcComponent,
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

  const array = [];

  for (const i in data.storage) {
    array.push(<h1 key={"com_" + i}>{data.storage[i]["id"]}</h1>);
  }

  return (
    <>
      <div>{array}</div>
    </>
  );
}

export default function ComponentPage({ fallback }) {
  const [lang, setLang] = useState([""]);

  useEffect(() => {
    setLang(localStorage.getItem("lang"));
  }, []);

  return (
    <SWRConfig value={{ fallback }}>
      <Header />
      <ComponentList lang={lang} component={fallback.component} />
      <ComponentListDropdown lang={lang} component={fallback.component} />
      <Repo />
    </SWRConfig>
  );
}
