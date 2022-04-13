import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.css";

export default function ComponentPage() {
  const router = useRouter();

  const id = router.query["pcComponent"];

  return (
    <>
      <h1>{id}</h1>
    </>
  );
}
