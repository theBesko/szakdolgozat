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
          pages: Math.ceil(
            numberOfProductsOnSale(repoInfo.productStorage) / 20
          ),
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

function Repo({ lang }) {
  const {
    data: { productStorage },
  } = useSWR(API, fetcher, {
    refreshInterval: 1000,
  });

  const router = useRouter();
  const page = parseInt(router.query.page ?? 1);
  const sortedProducts = loadAndSortProducts("price", "ASC", productStorage);
  const renderProducts = renderProductsJSX(page, 20, sortedProducts);

  return (
    <>
      <div className={classes.wrapper}>
        <CategoryMenuDesktop lang={lang} category={"home"} />
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

function numberOfProductsOnSale(storage) {
  let amount = 0;

  for (const product in storage) {
    if (parseInt(storage[product].sale)) amount++;
  }

  return amount;
}
