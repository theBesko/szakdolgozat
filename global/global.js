export const fetcher = (url) => fetch(url).then((res) => res.json());

export const API =
  process.env.NODE_ENV === "production"
    ? "https://buildapc-szakdolgozat.vercel.app/api/"
    : "http://localhost:3000/api/";

export const list = [
  { component: "CPU_Cooler", hu: "Processzor hűtő", en: "CPU Cooler" },
  { component: "Case", hu: "Gépház", en: "Case" },
  { component: "GPU", hu: "Videókártya", en: "Graphics Card" },
  { component: "HDD", hu: "Merevlemez", en: "HDD" },
  { component: "RAM", hu: "Memória", en: "Memory" },
  { component: "Monitor", hu: "Monitor", en: "Monitor" },
  { component: "Motherboard", hu: "Alaplap", en: "Motherboard" },
  { component: "PSU", hu: "Tápegység", en: "Powersupply Unit" },
  { component: "CPU", hu: "Processzor", en: "Processor" },
  { component: "SSD", hu: "SSD", en: "SSD" },
];

//list.sort((a, b) => (a[LANG] > b[LANG] ? 1 : b[LANG] > a[LANG] ? -1 : 0));
