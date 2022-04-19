import { fetcher } from "../../global/global";

export default async function handler(req, res) {
  const { category } = req.query;
  const data = await fetcher(
    "https://buildapc-szakdolgozat-default-rtdb.europe-west1.firebasedatabase.app/DATABASE_ROOT/productStorage.json"
  );
  res.status(200).json(data);
}
