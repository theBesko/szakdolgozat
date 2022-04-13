import "bootstrap/dist/css/bootstrap.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import useSWR, { SWRConfig, isValidating, useSWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
const API =
  "https://buildapc-szakdolgozat-default-rtdb.europe-west1.firebasedatabase.app/pelda.json";

export async function getServerSideProps() {
  const repoInfo = await fetcher(API);
  console.log(repoInfo);
  return {
    props: {
      fallback: {
        [API]: repoInfo,
      },
    },
  };
}

function Repo() {
  const { data, error, isValidating } = useSWR(API, fetcher, {
    refreshInterval: 1000,
  });

  const firebaseConfig = {
    apiKey: "AIzaSyDP8ygSOzXzFq30cQXdxcRYFKJKFRRRS3",
    authDomain: "buildapc-szakdolgozat.firebaseapp.com",
    databaseURL:
      "https://buildapc-szakdolgozat-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "buildapc-szakdolgozat",
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase();

  // const reference = ref(database, `pelda/szai`);
  // onValue(reference, (snap) => {
  //   const data = snap.val();
  //   console.log(data);
  // });

  if (error) return <h1>ERROR</h1>;
  if (!data) return <h1>LOADING</h1>;

  return (
    <>
      <h1>{data["aa"]}</h1>
    </>
  );
}

export default function Home({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Repo />
    </SWRConfig>
  );
}
