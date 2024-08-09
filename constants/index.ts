export const routes = [
  {
    href: "/",
    label: "Overview",
  },
  {
    href: "/transactions",
    label: "Transactions",
  },
  {
    href: "/accounts",
    label: "Accounts",
  },
  {
    href: "/categories",
    label: "Categories",
  },
  {
    href: "/settings",
    label: "Settings",
  },
];

export enum QKey {
  ACCOUNTS = "accounts",
  ACCOUNT = "account",
  CATEGORIES = "categories",
  CATEGORY = "category",
  TRANSACTIONS = "transactions",
  TRANSACTION = "transaction",
  SUMMARY = "summary",
}

export enum Variants {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

export enum chartTypes {
  AREA = "area",
  BAR = "bar",
  LINE = "line",
  PIE = "pie",
  RADAR = "radar",
  RADIAL = "radial",
}

export const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

export const dateFormat = "yyyy-MM-dd HH:mm:ss";
export const outputFormat = "yyyy-MM-dd";

export const requiredOptions = ["amount", "date", "payee"];

export const options = ["amount", "payee", "date"];

export const COLORS = ["#0062ff", "#12C6ff", "#ff647f", "#ff9354"];

export const FILTERS_DEFAULT_VALUE = "all";
