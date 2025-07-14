export type CurrencyCode = "BDT" | "USD" | "EUR" | "GBP" | "JPY" | "INR" | "AUD" | "CAD" | "SGD" | "AED";

type CurrencyFormatOptions = {
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

const currencySymbols: Record<CurrencyCode, string> = {
  BDT: "৳",
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  INR: "₹",
  AUD: "A$",
  CAD: "C$",
  SGD: "S$",
  AED: "د.إ",
};

const defaultLocales: Record<CurrencyCode, string> = {
  BDT: "bn-BD",
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
  JPY: "ja-JP",
  INR: "en-IN",
  AUD: "en-AU",
  CAD: "en-CA",
  SGD: "en-SG",
  AED: "ar-AE",
};

export function formatCurrency(
  amount: number,
  currencyCode: CurrencyCode,
  options: CurrencyFormatOptions = {},
): string {
  const {
    locale = defaultLocales[currencyCode],
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
  } = options;

  if (currencyCode === "BDT") {
    const formattedAmount = new Intl.NumberFormat(locale, {
      style: "decimal",
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(amount);

    return `${currencySymbols[currencyCode]}${formattedAmount}`;
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits,
      maximumFractionDigits,
      currencyDisplay: "symbol",
    }).format(amount);
  }
  catch {
    return `${currencySymbols[currencyCode]}${amount.toFixed(maximumFractionDigits)}`;
  }
}

export function getCurrencySymbol(currencyCode: CurrencyCode): string {
  return currencySymbols[currencyCode] || currencyCode;
}
