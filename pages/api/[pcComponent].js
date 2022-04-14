import { fetcher } from "../../global/global";

export default async function handler(req, res) {
  const { pcComponent } = req.query;
  const data = await fetcher(
    "https://buildapc-szakdolgozat-default-rtdb.europe-west1.firebasedatabase.app/DATABASE_ROOT/componentStorage/" +
      pcComponent +
      ".json"
  );
  res.status(200).json(data);
}
