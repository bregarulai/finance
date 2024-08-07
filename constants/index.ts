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
}

export enum Variants {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

export const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};
