export const fetcher = (url) => fetch(url).then((res) => res.json());

export const API =
  process.env.NODE_ENV === "production"
    ? "https://buildapc-szakdolgozat.vercel.app/api/a"
    : "http://localhost:3000/api/a";

export const list = [
  { category: "Highlighted", hu: "Kiemelt", en: "Highlighted" },
  { category: "CPU_Cooler", hu: "Processzor hűtő", en: "CPU Cooler" },
  { category: "Case", hu: "Gépház", en: "Case" },
  { category: "GPU", hu: "Videókártya", en: "Graphics Card" },
  { category: "HDD", hu: "Merevlemez", en: "HDD" },
  { category: "RAM", hu: "Memória", en: "Memory" },
  { category: "Motherboard", hu: "Alaplap", en: "Motherboard" },
  { category: "PSU", hu: "Tápegység", en: "Powersupply Unit" },
  { category: "CPU", hu: "Processzor", en: "Processor" },
  { category: "SSD", hu: "SSD", en: "SSD" },
  { category: "Monitor", hu: "Monitor", en: "Monitor" },
  { category: "Peripherials", hu: "Perifériák", en: "Peripherials" },
  { category: "Pre-Built", hu: "Előre épített", en: "Pre-Built" },
];

export const lang = (lang) => (event) => {
  localStorage.setItem("lang", lang);
  location.reload();
};

//list.sort((a, b) => (a[LANG] > b[LANG] ? 1 : b[LANG] > a[LANG] ? -1 : 0));
