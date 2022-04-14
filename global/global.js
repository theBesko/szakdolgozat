export const LANG = "en";

export const fetcher = (url) => fetch(url).then((res) => res.json());

export const genAPI = (child = "", final) => {
  return {
    final: `https://buildapc-szakdolgozat-default-rtdb.europe-west1.firebasedatabase.app/DATABASE_ROOT/${child}/${final}.json`,
  };
};
