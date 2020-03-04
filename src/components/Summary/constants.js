const notAllowedProject = {
  1: 'Все зерновые, яйца, молочные продукты, мучные изделия',
  2: 'Все молочные продукты, изделия из пшеничной муки, красное мясо',
  3: 'Все изделия из пшеничной муки, чечевица, арахис, гречка, кукуруза',
  4: 'Все мучные изделия, красное мясо, орехи, кукуруза, фасоль, гречка'
};

const getProductsByGroupBlood = groupBlood => notAllowedProject[groupBlood];

const getCcalSumm = products =>
  products.reduce(
    (accumulator, currentValue) => accumulator + currentValue.calories,
    0
  );

export { getProductsByGroupBlood, getCcalSumm };
