import useSWR, { SWRConfig } from "swr";
import { API, fetcher } from "../global/global";
import { useRouter } from "next/router";
import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useMemo, useState } from "react";
import Footer from "../components/Footer";
import { Button } from "react-bootstrap";

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
  return Math.ceil(parseInt(p?.price) * parseFloat(p?.sale));
}

function setProductToComponent(c, p, fnList, fnComp) {
  fnComp(c, p);
  fnList("");
}

function ListE({ com, p_id, fn1, fn2, p }) {
  return (
    <h2
      onClick={() => {
        setProductToComponent(com, p_id, fn1, fn2);
      }}
      key={p.name}
    >
      {`${p.name} - ${p.price} Ft`}
    </h2>
  );
}

function selectFirstComponent(
  component,
  { category, productStorage },
  fnList,
  fnComp
) {
  const renderList = [];

  for (const product in category[component]) {
    renderList.push(
      <ListE
        com={component}
        p_id={category[component][product]}
        fn1={fnList}
        fn2={fnComp}
        key={`${component}_${product}`}
        p={productStorage[category[component][product]]}
      />
    );
  }

  fnList(renderList);
}

function selectCPUAfterMotherboard(
  obj,
  { category, productStorage },
  fnList,
  fnComp
) {
  const renderList = [];
  const component = "CPU";

  for (const product in category[component]) {
    if (
      productStorage[[obj.Motherboard]].brand ===
      productStorage[category[component][product]].brand
    )
      renderList.push(
        <ListE
          com={component}
          p_id={category[component][product]}
          fn1={fnList}
          fn2={fnComp}
          key={`${component}_${product}`}
          p={productStorage[category[component][product]]}
        />
      );
  }

  fnList(renderList);
}

function selectMotherboardAfterCPU(
  obj,
  { category, productStorage },
  fnList,
  fnComp
) {
  const renderList = [];
  const component = "Motherboard";

  for (const product in category[component]) {
    if (
      productStorage[[obj.CPU]].brand ===
      productStorage[category[component][product]].brand
    )
      renderList.push(
        <ListE
          com={component}
          p_id={category[component][product]}
          fn1={fnList}
          fn2={fnComp}
          key={`${component}_${product}`}
          p={productStorage[category[component][product]]}
        />
      );
  }

  fnList(renderList);
}

function Repo() {
  const router = useRouter();
  const componentQuery = router.query;
  const { data } = useSWR(API, fetcher, {
    refreshInterval: 1000,
  });

  const [comps, setComps] = useState({});

  // const [component, setComponent] = useState("");
  // const [components, setComponents] = useState({
  //   ...dummy,
  //   ...componentQuery,
  // });

  // const compTable = [];

  // let index = 0;
  // for (const c in components) {
  //   if (index === 9) break;

  //   let temp = { [c]: "empty" };

  //   compTable.push(
  //     <tr
  //       key={"com_" + c}
  //       onClick={() => {
  //         if (components[c] === "empty") {
  //           setComponent(c);
  //         } else {
  //           setComponents((components) => ({ ...components, ...temp }));
  //         }
  //       }}
  //     >
  //       <td>
  //         <h2>{`${c}: `}</h2>
  //       </td>
  //       <td>
  //         <h2>
  //           {components[c] === "empty"
  //             ? ""
  //             : `${components[c]} --- ${discountedPrice(
  //                 productStorage[components[c]]
  //               )} Ft`}
  //         </h2>
  //       </td>
  //     </tr>
  //   );
  //   index++;
  // }

  // const renderList = [];

  // for (const product in category[component]) {
  //   let temp = {
  //     [component]: category[component][product],
  //   };

  //   renderList.push(
  //     <h2
  //       key={productStorage[category[component][product]].name}
  //       onClick={() => {
  //         setComponents((components) => ({ ...components, ...temp }));
  //         setComponent("");
  //       }}
  //     >
  //       {productStorage[category[component][product]].name +
  //         " " +
  //         productStorage[category[component][product]].price}
  //     </h2>
  //   );
  // }

  // const [finalPrice, setFinalPrice] = useState(0);

  // useEffect(() => {
  //   // try {
  //   //   if (Object.keys(dummy).length !== Object.keys(components).length)
  //   //     throw error;
  //   //   for (const q in componentQuery) {
  //   //     if (!productStorage[componentQuery[q]]) throw error;
  //   //   }

  //   let price = 0;
  //   let q = {};

  //   for (const c in components) {
  //     if (components[c] !== "empty") {
  //       q = { ...q, [c]: components[c] };
  //       price += discountedPrice(productStorage[components[c]]);
  //     }
  //   }

  //   setFinalPrice(price);
  //   router.push({ pathname: router.pathname, query: q });
  //   // } catch (error) {
  //   //   setComponents({ ...dummy });
  //   // }
  // }, [components]);

  const btn = [];
  const [list, setList] = useState([]);

  const listComps = (l) => {
    setList(l);
  };

  const setCom = (c, p) => {
    setComps({ ...comps, [c]: p });
  };

  btn.push(
    <Button
      key="cpu"
      onClick={() => {
        if (Object.keys(comps).includes("Motherboard")) {
          selectCPUAfterMotherboard(comps, data, listComps, setCom);
        } else {
          selectFirstComponent("CPU", data, listComps, setCom);
        }
      }}
    >
      CPU
    </Button>
  );
  btn.push(
    <Button
      key="mb"
      onClick={() => {
        if (Object.keys(comps).includes("CPU")) {
          selectMotherboardAfterCPU(comps, data, listComps, setCom);
        } else {
          selectFirstComponent("Motherboard", data, listComps, setCom);
        }
      }}
    >
      Motherboard
    </Button>
  );

  const [rc, setRc] = useState([]);

  useEffect(() => {
    const a = [];
    for (const c in comps) {
      a.push(<h2 key={`c_${c}`}>{`${c}: ${comps[c]}`}</h2>);
    }
    console.log(a);
    setRc(a);
  }, [comps]);

  return (
    <div>
      <div>{rc}</div>
      <div>{btn}</div>
      <div>{list}</div>
      {/* <div>
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
      <div>{renderList}</div> */}
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
