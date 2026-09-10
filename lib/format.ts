/**
 * Числа — ровно так, как их показывает сам AvenirOS.
 *
 * В интерфейсе разряды отделены ТОЧКОЙ («3.480.000.000 so'm»), а не пробелом и
 * не запятой. Это не мелочь: сайт показывает те же экраны, и разное разделение
 * читалось бы как другой продукт.
 */

export function uzs(value: number): string {
  return new Intl.NumberFormat("de-DE").format(Math.round(value));
}

export function sum(value: number): string {
  return `${uzs(value)} so'm`;
}

/** «3,48 mlrd» — для крупных подписей, где полное число не помещается. */
export function short(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(2).replace(".", ",")} mlrd`;
  }
  if (value >= 1_000_000) {
    return `${Math.round(value / 1_000_000)} mln`;
  }
  if (value >= 1_000) {
    return `${Math.round(value / 1_000)} ming`;
  }
  return String(value);
}

export function percent(value: number, digits = 1): string {
  return `${value.toFixed(digits).replace(".", ",")}%`;
}
