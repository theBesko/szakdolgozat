import "bootstrap/dist/css/bootstrap.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

function Home() {
  const firebaseConfig = {
    apiKey: "AIzaSyDP8ygSOzXzFq30cQXdxcRYFKJKFRRRS3",
    authDomain: "buildapc-szakdolgozat.firebaseapp.com",
    databaseURL:
      "https://buildapc-szakdolgozat-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "buildapc-szakdolgozat",
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase();

  const reference = ref(database, `pelda/szai`);
  onValue(reference, (snap) => {
    const data = snap.val();
  });

  return (
    <>
      <h1>SZIA</h1>
      <h2>{}</h2>
    </>
  );
}

export default Home;
