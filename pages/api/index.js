import { fetcher } from "../../global/global";

export default async function handler(req, res) {
  const data = await fetcher(
    `https://buildapc-szakdolgozat-default-rtdb.europe-west1.firebasedatabase.app/DATABASE_ROOT.json`
  );
  res.status(200).json(data);
}
