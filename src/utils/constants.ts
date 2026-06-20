export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
export const WS_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://localhost:3001";

export const CABIN_CLASSES = {
  ECONOMY: "economy",
  PREMIUM_ECONOMY: "premium",
  BUSINESS: "business",
  FIRST: "first",
} as const;

export const CABIN_CLASS_LABELS = {
  economy: "اکونومی",
  premium: "پریمیوم اکونومی",
  business: "بیزینس",
  first: "فرست کلاس",
};

export const SOURCES = {
  TRIP: "trip.com",
  ALIBABA: "علی‌بابا",
  FLYTODAY: "فلای‌تودی",
} as const;

export const CURRENCIES = {
  EUR: "EUR",
  IRR: "IRR",
  USD: "USD",
} as const;

export const DEFAULT_CURRENCY = "IRR";
export const EUR_TO_IRR = Number(process.env.NEXT_PUBLIC_EUR_TO_IRR) || 92500;

export const DATE_FORMATS = {
  DISPLAY: "YYYY/MM/DD",
  API: "YYYY-MM-DD",
  PERSIAN: "jYYYY/jMM/jDD",
};

export const MESSAGES = {
  SEARCH: {
    NO_RESULTS: "هیچ پروازی یافت نشد",
    SEARCH_ERROR: "خطا در جستجوی پروازها",
    LOADING: "در حال جستجو...",
  },
  COMPARE: {
    COMPARING: "در حال مقایسه قیمت‌ها...",
    NO_DATA: "داده‌ای برای مقایسه موجود نیست",
    ERROR: "خطا در مقایسه قیمت‌ها",
  },
  AUTH: {
    LOGIN_SUCCESS: "ورود با موفقیت انجام شد",
    LOGIN_ERROR: "خطا در ورود",
    REGISTER_SUCCESS: "ثبت نام با موفقیت انجام شد",
    REGISTER_ERROR: "خطا در ثبت نام",
    LOGOUT_SUCCESS: "خروج با موفقیت انجام شد",
  },
}; 
