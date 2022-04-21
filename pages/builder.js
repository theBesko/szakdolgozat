import useSWR, { SWRConfig } from "swr";
import { API, fetcher } from "../global/global";
import { useRouter } from "next/router";
import Header from "../components/Header";
import ComponentListDropdown from "../components/ComponentListDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "../styles/category.module.scss";
import { useEffect, useState } from "react";
import CategoryMenuDesktop from "../components/CategoryMenuDesktop";
import { Nav, Navbar, Button, ButtonGroup } from "react-bootstrap";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

export async function getServerSideProps() {
  try {
    const repoInfo = await fetcher(API);
    return {
      props: {
        fallback: {
          [API]: repoInfo,
          pages: Math.ceil(Object.keys(repoInfo.productStorage).length / 20),
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
  const { data } = useSWR(API, fetcher, {
    refreshInterval: 1000,
  });

  const cats = router.query;

  for (const i in cats) {
    console.log(i + " " + cats[i]);
  }

  return (
    <>
      <div> a</div>
    </>
  );
}

export default function HomePage({ fallback }) {
  const [lang, setLang] = useState("hu");
  const [theme, setTheme] = useState("light");

  const router = useRouter();
  const page = parseInt(router.query.page ?? 1);

  useEffect(() => {
    setLang(localStorage.getItem("lang") ?? "hu");
    // setTheme(localStorage.getItem("theme") ?? "light");
  }, []);

  return (
    <SWRConfig value={{ fallback }}>
      <Header lang={lang} />
      <Repo page={page} lang={lang} />
      <Footer lang={lang} />
    </SWRConfig>
  );
}
