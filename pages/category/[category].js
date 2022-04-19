import useSWR, { SWRConfig } from "swr";
import { API, fetcher } from "../../global/global";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import ComponentListDropdown from "../../components/ComponentListDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "../../styles/category.module.scss";
import { useEffect, useState } from "react";
import CategoryMenuDesktop from "../../components/CategoryMenuDesktop";
import { Nav, Navbar } from "react-bootstrap";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";

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
  const { data, error } = useSWR(API, fetcher, {
    refreshInterval: 1000,
  });

  const page = props.page;
  const renderProducts = [];
  const sortedProducts = [];

  for (const i in data.category[category]) {
    sortedProducts.push(data[data.category[category][i]]);
  }

  sortedProducts.sort((a, b) =>
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
        <CategoryMenuDesktop lang={props.lang} category={category} />
      </div>
      <div className={classes.container}>
        <div className={classes.p_grid}>{renderProducts}</div>
      </div>
    </>
  );
}

export default function CategoryPage({ fallback }) {
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
      <Header lang={lang} />
      <ComponentListDropdown lang={lang} category={fallback.category} />
      <Repo page={page} lang={lang} />
      <div className={classes.paginationBtn}>{buttons}</div>
      <Footer />
    </SWRConfig>
  );
}
