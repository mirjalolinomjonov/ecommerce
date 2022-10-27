export function formatNum(num) {
  return new Intl.NumberFormat("fr-FR").format(num);
}
