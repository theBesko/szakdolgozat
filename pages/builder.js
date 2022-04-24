import useSWR, { SWRConfig } from "swr";
import { API, fetcher } from "../global/global";
import { useRouter } from "next/router";
import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useMemo, useState } from "react";
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

const dummy = {
  CPU: "empty",
  RAM: "empty",
  SSD: "empty",
  HDD: "empty",
  Motherboard: "empty",
  PSU: "empty",
  CPU_Cooler: "empty",
  Case: "empty",
  GPU: "empty",
};

function discountedPrice(p) {
  return Math.ceil(parseInt(p.price) * parseFloat(p.sale));
}

function Repo() {
  const [component, setComponent] = useState("");
  const router = useRouter();
  const componentQuery = router.query;
  const {
    data: { category, productStorage },
  } = useSWR(API, fetcher, {
    refreshInterval: 1000,
  });

  const [components, setComponents] = useState({
    ...dummy,
    ...componentQuery,
  });

  const compTable = [];

  for (const c in components) {
    let temp = { [c]: "empty" };

    compTable.push(
      <tr
        key={"com_" + c}
        onClick={() => {
          if (components[c] === "empty") {
            setComponent(c);
          } else {
            setComponents((components) => ({ ...components, ...temp }));
          }
        }}
      >
        <td>
          <h2>{`${c}: `}</h2>
        </td>
        <td>
          <h2>
            {components[c] === "empty"
              ? ""
              : `${components[c]} --- ${discountedPrice(
                  productStorage[components[c]]
                )} Ft`}
          </h2>
        </td>
      </tr>
    );
  }

  const renderList = [];

  for (const product in category[component]) {
    let temp = {
      [component]: category[component][product],
    };

    renderList.push(
      <h2
        key={productStorage[category[component][product]].name}
        onClick={() => {
          setComponents((components) => ({ ...components, ...temp }));
          setComponent("");
        }}
      >
        {productStorage[category[component][product]].name +
          " " +
          productStorage[category[component][product]].price}
      </h2>
    );
  }

  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    let price = 0;
    let q = {};

    for (const c in components) {
      if (components[c] !== "empty") {
        q = { ...q, [c]: components[c] };
        price += discountedPrice(productStorage[components[c]]);
      }
    }

    setFinalPrice(price);
    router.push({ pathname: router.pathname, query: q });
  }, [components]);

  return (
    <div>
      <div>
        <table style={{ textAlign: "right" }}>
          <tbody>
            <tr>
              <th>Component</th>
              <th>Chosen</th>
            </tr>
            {compTable}
          </tbody>
        </table>
      </div>
      <div>
        <h1>{finalPrice}</h1>
      </div>
      <div>{renderList}</div>
    </div>
  );
}

export default function BuilderPage({ fallback }) {
  const [lang, setLang] = useState("hu");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setLang(localStorage.getItem("lang") ?? "hu");
    // setTheme(localStorage.getItem("theme") ?? "light");
  }, []);

  return (
    <SWRConfig value={{ fallback }}>
      <Header lang={lang} />
      <Repo lang={lang} />
      <Footer lang={lang} />
    </SWRConfig>
  );
}
