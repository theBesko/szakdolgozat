import useSWR, { SWRConfig } from "swr";
import { API, fetcher } from "../global/global";
import { useRouter } from "next/router";
import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

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
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}

function Repo({ lang }) {
  const router = useRouter();
  const {
    data: { productStorage },
  } = useSWR(API, fetcher, {
    refreshInterval: 1000,
  });

  return (
    <>
      <div></div>
    </>
  );
}

export default function CartPage({ fallback }) {
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
