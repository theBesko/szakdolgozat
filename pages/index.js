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
import { Col, Container, Row } from "react-bootstrap";

export async function getServerSideProps() {
  try {
    const repoInfo = await fetcher(API);

    return {
      props: {
        fallback: {
          [API]: repoInfo,
          pages: Math.ceil(numberOfProductsOnSale(repoInfo.productStorage) / 2),
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
  const renderProducts = renderProductsJSX(page, 2, sortedProducts);

  return (
    <Container fluid>
      <Row>
        <Col lg={3} className={"d-lg-flex d-none "}>
          <CategoryMenuDesktop lang={lang} category={"home"} />
        </Col>
        <Col md={12} lg={9}>
          <Row xs={1} md={2} lg={3} className="g-2">
            {renderProducts}
          </Row>
        </Col>
      </Row>
    </Container>
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
