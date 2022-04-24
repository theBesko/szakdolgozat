import useSWR, { SWRConfig } from "swr";
import {
  API,
  fetcher,
  loadAndSortProducts,
  renderProductsJSX,
} from "../global/global";
import { useRouter } from "next/router";
import Header from "../components/Header";
import ComponentListDropdown from "../components/ComponentListDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "../styles/category.module.scss";
import { useEffect, useState } from "react";
import CategoryMenuDesktop from "../components/CategoryMenuDesktop";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";

export async function getServerSideProps() {
  try {
    const repoInfo = await fetcher(API);

    return {
      props: {
        fallback: {
          [API]: repoInfo,
        },
      },
    };
  } catch (error) {
    // return {
    //   redirect: {
    //     destination: "/",
    //     permanent: false,
    //   },
    // };
  }
}

function Repo({ lang }) {
  const router = useRouter();

  return (
    <>
      <div>
        <h1>{router.query.value}</h1>
      </div>
    </>
  );
}

export default function SearchPage({ fallback }) {
  const [lang, setLang] = useState("hu");

  useEffect(() => {
    setLang(localStorage.getItem("lang") ?? "hu");
    // setTheme(localStorage.getItem("theme") ?? "light");
  }, []);

  return (
    <SWRConfig value={{ fallback }}>
      <Header lang={lang} />
      <Repo />
      <Footer lang={lang} />
    </SWRConfig>
  );
}
