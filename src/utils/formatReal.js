const formatter = Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
});

function formatNumber(value) {
  return formatter.format(value);
}

export { formatNumber };
