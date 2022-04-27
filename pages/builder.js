import useSWR, { SWRConfig } from "swr";
import { API, fetcher } from "../global/global";
import { useRouter } from "next/router";
import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useMemo, useState } from "react";
import Footer from "../components/Footer";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import BuilderComponentItem from "../components/BuilderComponentItem";

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
    <Col
      onClick={() => {
        setProductToComponent(com, p_id, fn1, fn2);
      }}
      key={p.name}
    >
      <Card border="dark">
        <Card.Body>
          <Card.Title>{p.name}</Card.Title>
          <Card.Text>{p.price}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
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

function selectPSU(obj, { category, productStorage }, fnList, fnComp) {
  const renderList = [];
  const component = "PSU";

  for (const product in category[component]) {
    if (
      parseInt(productStorage[[obj.GPU]].watt) <=
      parseInt(productStorage[category[component][product]].watt)
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

function selectRAM(obj, { category, productStorage }, fnList, fnComp) {
  const renderList = [];
  const component = "RAM";

  for (const product in category[component]) {
    if (
      parseInt(productStorage[[obj.Motherboard]].ram_type) >=
      parseInt(productStorage[category[component][product]].ram_type)
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
      productStorage[[obj.Motherboard]].socket ===
      productStorage[category[component][product]].socket
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
      productStorage[[obj.CPU]].socket ===
      productStorage[category[component][product]].socket
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

  const [list, setList] = useState([]);

  const listComps = (l) => {
    setList(l);
  };

  const setCom = (c, p) => {
    setComps({ ...comps, [c]: p });
    console.log(comps);
  };

  const [order, setOrder] = useState([]);

  const compList = [
    <Col
      key="CPU"
      onClick={() => {
        if (Object.keys(comps).includes("Motherboard")) {
          selectCPUAfterMotherboard(comps, data, listComps, setCom);
        } else {
          selectFirstComponent("CPU", data, listComps, setCom);
        }
      }}
    >
      <BuilderComponentItem
        component="CPU"
        chosen={data.productStorage[comps.CPU]?.name ?? ""}
      />
    </Col>,
    <Col
      key="Motherboard"
      onClick={() => {
        if (Object.keys(comps).includes("CPU")) {
          selectMotherboardAfterCPU(comps, data, listComps, setCom);
        } else {
          selectFirstComponent("Motherboard", data, listComps, setCom);
        }
      }}
    >
      <BuilderComponentItem
        component="Motherboard"
        chosen={data.productStorage[comps.Motherboard]?.name ?? ""}
      />
    </Col>,
    <Col
      key="GPU"
      onClick={() => {
        if (Object.keys(comps).length > 1)
          selectFirstComponent("GPU", data, listComps, setCom);
      }}
    >
      <BuilderComponentItem
        forbidden={Object.keys(comps).length < 2}
        component="GPU"
        chosen={data.productStorage[comps.GPU]?.name ?? ""}
      />
    </Col>,
    <Col
      key="RAM"
      onClick={() => {
        if (
          Object.keys(comps).includes("Motherboard") &&
          Object.keys(comps).length > 1
        ) {
          selectRAM(comps, data, listComps, setCom);
        }
      }}
    >
      <BuilderComponentItem
        forbidden={Object.keys(comps).length < 2}
        component="RAM"
        chosen={data.productStorage[comps.RAM]?.name ?? ""}
      />
    </Col>,
    <Col
      key="Cooler"
      onClick={() => {
        if (Object.keys(comps).length > 1)
          selectFirstComponent("CPU_Cooler", data, listComps, setCom);
      }}
    >
      <BuilderComponentItem
        forbidden={Object.keys(comps).length < 2}
        component="Cooler"
        chosen={data.productStorage[comps.CPU_Cooler]?.name ?? ""}
      />
    </Col>,
    <Col
      key="SSD"
      onClick={() => {
        if (Object.keys(comps).length > 1)
          selectFirstComponent("SSD", data, listComps, setCom);
      }}
    >
      <BuilderComponentItem
        forbidden={Object.keys(comps).length < 2}
        component="SSD"
        chosen={data.productStorage[comps.SSD]?.name ?? ""}
      />
    </Col>,
    <Col
      key="HDD"
      onClick={() => {
        if (Object.keys(comps).length > 1)
          selectFirstComponent("HDD", data, listComps, setCom);
      }}
    >
      <BuilderComponentItem
        forbidden={Object.keys(comps).length < 2}
        component="HDD"
        chosen={data.productStorage[comps.HDD]?.name ?? ""}
      />
    </Col>,
    <Col
      key="PSU"
      onClick={() => {
        if (
          Object.keys(comps).includes("GPU") &&
          Object.keys(comps).length > 6
        ) {
          selectPSU(comps, data, listComps, setCom);
        }
      }}
    >
      <BuilderComponentItem
        forbidden={Object.keys(comps).length < 7}
        component="PSU"
        chosen={data.productStorage[comps.PSU]?.name ?? ""}
      />
    </Col>,
    <Col
      key="Case"
      onClick={() => {
        if (Object.keys(comps).length > 6)
          selectFirstComponent("Case", data, listComps, setCom);
      }}
    >
      <BuilderComponentItem
        forbidden={Object.keys(comps).length < 7}
        component="Case"
        chosen={data.productStorage[comps.Case]?.name ?? ""}
      />
    </Col>,
  ];

  let finalPrice = 0;

  for (const c in comps) {
    finalPrice += parseInt(data.productStorage[comps[c]].price);
  }

  let rsBtn;

  const restart = () => {
    setComps({});
  };

  return (
    <div style={{ marginBottom: 100, marginTop: 20 }}>
      <div>
        <Button onClick={restart}>Restart</Button>
        <h1 style={{ textAlign: "center" }}>{finalPrice} Ft</h1>
      </div>
      <Container fluid>
        <Row>
          <Col xs={6}>
            <Row lg={1} className="g-2">
              {compList}
            </Row>
          </Col>
          <Col xs={6}>
            <Row lg={1} className="g-2">
              {list}
            </Row>
          </Col>
        </Row>
      </Container>
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
