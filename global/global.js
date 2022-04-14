export const LANG = "en";

export const fetcher = (url) => fetch(url).then((res) => res.json());

export const API =
  process.env.NODE_ENV === "production"
    ? "https://buildapc-szakdolgozat.vercel.app/api/"
    : "http://localhost:3000/api/";
