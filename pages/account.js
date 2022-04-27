import useSWR, { SWRConfig } from "swr";
import { API, fetcher } from "../global/global";
import { useRouter } from "next/router";
import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { auth } from "../global/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

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

function reg(email, pw) {
  createUserWithEmailAndPassword(auth, email, pw).then(({ user }) => {
    console.log(user);
  });
}

function login(email, pw) {
  signInWithEmailAndPassword(auth, email, pw).then(() => {
    // ...
  });
}

export default function AccountPage({ fallback }) {
  const [lang, setLang] = useState("hu");

  useEffect(() => {
    setLang(localStorage.getItem("lang") ?? "hu");
    // setTheme(localStorage.getItem("theme") ?? "light");
  }, []);

  // signOut(auth).then(console.log(auth));
  // reg("asdasdasd@gmail.com", "asdasdasdas");

  // login("asdasdasd@gmail.com", "asdasdasdas");
  console.log(auth.currentUser);

  return (
    <SWRConfig value={{ fallback }}>
      <Header lang={lang} />
      <Repo />
      <Footer lang={lang} />
    </SWRConfig>
  );
}
