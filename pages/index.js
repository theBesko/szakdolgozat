import "bootstrap/dist/css/bootstrap.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import useSWR, { SWRConfig, useSWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
const API =
  "https://buildapc-szakdolgozat-default-rtdb.europe-west1.firebasedatabase.app/DATABASE_ROOT.json";

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
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
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
      <h1>{data.placeholder}</h1>
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
