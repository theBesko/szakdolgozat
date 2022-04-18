import useSWR, { SWRConfig } from "swr";
import { API, fetcher } from "../../global/global";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import ComponentList from "../../components/ComponentList";
import ComponentListDropdown from "../../components/ComponentListDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "../../styles/pcComponent.module.scss";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  const { pcComponent } = context.query;
  console.log(context.query);
  try {
    const repoInfo = await fetcher(API + pcComponent);
    return {
      props: {
        fallback: {
          [API + pcComponent]: repoInfo,
          component: pcComponent,
          pages: Math.ceil(repoInfo.storage.length / 20),
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

function Repo(props) {
  const router = useRouter();
  const { pcComponent } = router.query;
  const { data, error } = useSWR(API + pcComponent, fetcher, {
    refreshInterval: 1000,
  });

  if (error) return <h1>ERROR</h1>;
  if (!data) return <h1>LOADING</h1>;

  const array = [];

  const page = props.page;

  for (let i = page * 20 - 20; i < page * 20; i++) {
    if (i === data.storage.length) break;
    array.push(
      <div className={classes.card + " " + classes.stacked} key={"com_" + i}>
        <div className={classes.card_content}>
          <h2 className={classes.card_title}>{data.storage[i]["name"]}</h2>
          <p className={classes.card_p}>{"id: " + data.storage[i]["id"]}</p>
          <p className={classes.card_p}>{data.storage[i]["price"] + " Ft"}</p>
          <p className={classes.card_p}>
            {data.storage[i]["stock"] + " on stock"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={classes.wrapper}>
        <ComponentList lang={props.lang} component={pcComponent} />
      </div>
      <div className={classes.container}>
        <div className={classes.p_grid}>{array}</div>
      </div>
    </>
  );
}

export default function ComponentPage({ fallback }) {
  const [lang, setLang] = useState("");
  const [page, setPage] = useState(1);

  const buttons = [];
  for (let i = 1; i < fallback.pages + 1; i++) {
    buttons.push(
      <button
        className="btn btn-primary"
        onClick={() => {
          setPage(i);
        }}
        key={"btn" + i}
      >
        {i}
      </button>
    );
  }

  useEffect(() => {
    setLang(localStorage.getItem("lang"));
  }, []);

  return (
    <SWRConfig value={{ fallback }}>
      <Header />
      <ComponentListDropdown lang={lang} component={fallback.component} />
      {buttons}
      <Repo page={page} lang={lang} />
    </SWRConfig>
  );
}
