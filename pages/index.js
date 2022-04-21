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

function Repo(props) {
  const router = useRouter();
  const { data } = useSWR(API, fetcher, {
    refreshInterval: 1000,
  });

  const page = parseInt(router.query.page ?? 1);
  const renderProducts = [];
  const sortedProducts = [];

  for (const i in data.productStorage) {
    // if (parseInt(data[i].sale) < 1)
    sortedProducts.push(data.productStorage[i]);
  }

  sortedProducts.sort((b, a) =>
    parseInt(a.price) > parseInt(b.price)
      ? 1
      : parseInt(b.price) > parseInt(a.price)
      ? -1
      : 0
  );

  for (let i = page * 20 - 20; i < page * 20; i++) {
    if (i === sortedProducts.length) break;
    renderProducts.push(
      <ProductCard key={"product_" + i} product={sortedProducts[i]} />
    );
  }
  return (
    <>
      <div className={classes.wrapper}>
        <CategoryMenuDesktop lang={props.lang} category={"home"} />
      </div>
      <div className={classes.container}>
        <div className={classes.p_grid}>{renderProducts}</div>
      </div>
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

  const handleChange = (page) => {
    router.push(`/?page=${page}`);
  };

  return (
    <SWRConfig value={{ fallback }}>
      <Header lang={lang} />
      <ComponentListDropdown lang={lang} category={fallback.category} />
      <Repo page={page} lang={lang} />
      <div className={classes.paginationBtn}>
        <Pagination change={handleChange} page={page} length={fallback.pages} />
      </div>
      <Footer lang={lang} />
    </SWRConfig>
  );
}
