import useSWR, { SWRConfig } from "swr";
import {
  API,
  fetcher,
  loadAndSortProducts,
  renderProductsJSX,
} from "../../global/global";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import ComponentListDropdown from "../../components/ComponentListDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "../../styles/category.module.scss";
import { useEffect, useState } from "react";
import CategoryMenuDesktop from "../../components/CategoryMenuDesktop";
import { Nav, Navbar, Button, ButtonGroup } from "react-bootstrap";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import Pagination from "../../components/Pagination";

export async function getServerSideProps(context) {
  const { category } = context.query;

  try {
    const repoInfo = await fetcher(API);
    return {
      props: {
        fallback: {
          [API]: repoInfo,
          category: category,
          pages: Math.ceil(repoInfo.category[category].length / 20),
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
  const { category } = router.query;
  const {
    data: { productStorage, category: categoryArray },
  } = useSWR(API, fetcher, {
    refreshInterval: 1000,
  });

  const page = parseInt(router.query.page ?? 1);
  const sortedProducts = loadAndSortProducts(
    "price",
    "ASC",
    productStorage,
    categoryArray[category]
  );
  const renderProducts = renderProductsJSX(page, 20, sortedProducts);

  return (
    <>
      <div className={classes.wrapper}>
        <CategoryMenuDesktop lang={props.lang} category={category} />
      </div>
      <div className={classes.container}>
        <div className={classes.p_grid}>{renderProducts}</div>
      </div>
    </>
  );
}

export default function CategoryPage({ fallback }) {
  const [lang, setLang] = useState("hu");
  const [theme, setTheme] = useState("light");

  const router = useRouter();
  const page = parseInt(router.query.page ?? 1);

  useEffect(() => {
    setLang(localStorage.getItem("lang") ?? "hu");
    // setTheme(localStorage.getItem("theme") ?? "light");
  }, []);

  const handleChange = (page) => {
    router.push(`${fallback.category}/?page=${page}`);
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
