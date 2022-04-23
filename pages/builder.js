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

// function listComponent(categoryArray, storage, component) {
//   const array = [];

//   for (const product in categoryArray) {
//     array.push(
//       <h2 key={storage[categoryArray[product]].name} onClick={() => {}}>
//         {storage[categoryArray[product]].name}
//       </h2>
//     );
//   }

//   return array;
// }

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

  // useEffect(() => {
  //   setComponents((components) => ({ ...components, ...componentQuery }));
  // }, []);

  const compTable = [];

  for (const c in components) {
    compTable.push(
      <tr
        key={"com_" + c}
        onClick={() => {
          setComponent(c);
        }}
      >
        <td>{c}</td>
        <td>{components[c] === "empty" ? "" : components[c]}</td>
      </tr>
    );
  }

  const renderList = [];
  // component !== ""
  //   ? listComponent(category[component], productStorage, component)
  //   : [];

  for (const product in category[component]) {
    let temp = { [component]: category[component][product] };
    renderList.push(
      <h2
        key={productStorage[category[component][product]].name}
        onClick={() => {
          setComponents((components) => ({ ...components, ...temp }));
          setComponent("");
        }}
      >
        {productStorage[category[component][product]].name}
      </h2>
    );
  }

  useEffect(() => {
    let final = router.pathname + "?";

    for (const c in components) {
      final += components[c] === "empty" ? "" : `${c}=${components[c]}&`;
    }

    router.push(final.slice(0, -1));
  }, [components]);

  return (
    <div>
      <div>
        <table>
          <tbody>
            <tr>
              <th>Component</th>
              <th>Chosen</th>
            </tr>
            {compTable}
          </tbody>
        </table>
      </div>
      <div>{renderList}</div>
    </div>
  );
}

export default function HomePage({ fallback }) {
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
