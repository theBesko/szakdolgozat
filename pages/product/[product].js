import useSWR, { SWRConfig } from "swr";
import { API, fetcher } from "../../global/global";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import ComponentListDropdown from "../../components/ComponentListDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "../../styles/category.module.scss";
import { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import Footer from "../../components/Footer";

export async function getServerSideProps(context) {
  const { product } = context.query;

  try {
    const repoInfo = await fetcher(API + product);
    if (!repoInfo) throw "";
    return {
      props: {
        fallback: {
          [API + product]: repoInfo,
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
  const { product } = router.query;
  const { data, error } = useSWR(API + product, fetcher, {
    refreshInterval: 1000,
  });

  const { name, price, sale } = data;

  return (
    <div>
      <div>{`${name} ${price}   ${sale}`}</div>
    </div>
  );
}

export default function ProductPage({ fallback }) {
  const [lang, setLang] = useState("");

  useEffect(() => {
    setLang(localStorage.getItem("lang"));
  }, []);

  return (
    <SWRConfig value={{ fallback }}>
      {/* <Header lang={lang} /> */}
      <Repo lang={lang} />
      <Footer />
    </SWRConfig>
  );
}
