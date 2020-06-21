// Fonte: https://www.todacarreira.com/calculo-salario-liquido/

const INSS_TABLE = [
  {
    id: 1,
    minValue: 0,
    maxValue: 1045,
    difference: 1045 - 0,
    discountPercentage: 0.075,
    discountValue: -1,
  },
  {
    id: 2,
    minValue: 1045.01,
    maxValue: 2089.6,
    difference: 2089.6 - 1045,
    discountPercentage: 0.09,
  },
  {
    id: 3,
    minValue: 2089.61,
    maxValue: 3134.4,
    difference: 3134.4 - 2089.6,
    discountPercentage: 0.12,
  },
  {
    id: 4,
    minValue: 3134.41,
    maxValue: 6101.06,
    difference: 6101.06 - 3134.4,
    discountPercentage: 0.14,
  },
];

let taxaINSS;
let taxaIRPF;
function round(value) {
  return +value.toFixed(2);
}

function calculateDiscountINSS(baseINSS) {
  let discountINSS = 0;

  if (baseINSS > 6101.07) {
    return 713.1;
  }

  for (var i = 0; i < INSS_TABLE.length; i++) {
    var currentItem = INSS_TABLE[i];
    let discountValue = 0;

    if (baseINSS > currentItem.maxValue) {
      // prettier-ignore
      discountValue = 
        round(currentItem.difference * currentItem.discountPercentage);
      discountINSS += discountValue;
    } else {
      // prettier-ignore
      discountValue = 
        round((baseINSS - currentItem.minValue) * currentItem.discountPercentage);
      console.log(currentItem.discountPercentage);
      taxaINSS = currentItem.discountPercentage * 100;
      discountINSS += discountValue;
      break;
    }
  }

  discountINSS = round(discountINSS);

  return discountINSS;
}

function calculateDiscountIRPF(baseIRPF) {
  let discountIRPF;

  if (baseIRPF < 1903.98) {
    taxaIRPF = 0;
    discountIRPF = 0;
  } else {
    if (baseIRPF < 2826.65) {
      discountIRPF = round(baseIRPF * 0.075) - 142.8;
      taxaIRPF = 7.5;
    } else {
      if (baseIRPF < 3751.05) {
        discountIRPF = round(baseIRPF * 0.15) - 354.8;
        taxaIRPF = 15;
      } else {
        if (baseIRPF < 4664.68) {
          discountIRPF = round(baseIRPF * 0.225) - 636.13;
          taxaIRPF = 22.5;
        } else {
          discountIRPF = round(baseIRPF * 0.275) - 869.36;
          taxaIRPF = 27.5;
        }
      }
    }
  }

  discountIRPF = round(discountIRPF);

  return discountIRPF;
}

function calculateSalaryFrom(fullSalary) {
  const baseINSS = fullSalary;
  const discountINSS = calculateDiscountINSS(baseINSS);

  const baseIRPF = baseINSS - discountINSS;
  const discountIRPF = calculateDiscountIRPF(baseIRPF);

  const netSalary = baseINSS - discountINSS - discountIRPF;

  return {
    baseINSS,
    discountINSS,
    baseIRPF,
    discountIRPF,
    netSalary,
    taxaINSS,
    taxaIRPF,
  };
}

export { calculateSalaryFrom };
