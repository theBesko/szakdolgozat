import ProductCard from "../components/ProductCard";

export const fetcher = (url) => fetch(url).then((res) => res.json());

export const API =
  process.env.NODE_ENV === "production"
    ? "https://buildapc-szakdolgozat.vercel.app/api/"
    : "http://localhost:3000/api/";

export const list = [
  { category: "home", hu: "Kiemelt", en: "Highlighted" },
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
  { category: "Peripherial", hu: "Perifériák", en: "Peripherials" },
  { category: "Pre-Built", hu: "Előre épített", en: "Pre-Built" },
];

export const lang = () => {
  localStorage.setItem(
    "lang",
    !localStorage.getItem("lang")
      ? "en"
      : localStorage.getItem("lang") === "en"
      ? "hu"
      : "en"
  );
  location.reload();
};

export const theme = () => {
  localStorage.setItem(
    "theme",
    !localStorage.getItem("theme")
      ? "dark"
      : localStorage.getItem("theme") === "dark"
      ? "light"
      : "dark"
  );
  location.reload();
};

export function loadAndSortProducts(sortBy, sortOrder, ...storage) {
  const products = [];

  // ! home page / highlighted products
  if (storage.length === 1) {
    for (const product in storage[0]) {
      if (parseInt(storage[0][product].sale) < 1)
        products.push(storage[0][product]);
    }
  }

  // ! category pages
  if (storage.length > 1) {
    for (const product in storage[1]) {
      products.push(storage[0][storage[1][product]]);
    }
  }

  products.sort((a, b) =>
    sortOrder === "ASC" ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]
  );

  return products;
}

export function renderProductsJSX(page, limit, products) {
  const renderProducts = [];

  for (
    let productIndex = page * limit - limit;
    productIndex < page * limit;
    productIndex++
  ) {
    if (productIndex === products.length) break;
    renderProducts.push(
      <ProductCard
        key={"product_" + productIndex}
        product={products[productIndex]}
      />
    );
  }

  return renderProducts;
}

//list.sort((a, b) => (a[LANG] > b[LANG] ? 1 : b[LANG] > a[LANG] ? -1 : 0));
