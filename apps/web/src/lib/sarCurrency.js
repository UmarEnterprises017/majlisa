/** Display amounts in Saudi Riyal regardless of store backend currency. */
export function formatSar(priceInCents, decimalDigits = 2) {
  if (priceInCents === null || priceInCents === undefined || Number.isNaN(Number(priceInCents))) {
    return '';
  }
  const digits = Number.isInteger(decimalDigits) ? decimalDigits : 2;
  const amount = (Number(priceInCents) / Math.pow(10, digits)).toFixed(digits);
  return `${amount} ر.س`;
}

export function formatVariantPrice(variant) {
  if (!variant) return '';
  const cents = variant.sale_price_in_cents ?? variant.price_in_cents;
  return formatSar(cents);
}

export function formatVariantOriginalPrice(variant) {
  if (!variant || variant.sale_price_in_cents == null) return null;
  return formatSar(variant.price_in_cents);
}
