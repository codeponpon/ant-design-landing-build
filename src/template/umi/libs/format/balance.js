import Numeral from 'numeral';

const Balance = (balance) =>
  Numeral((Math.floor(balance * 100) / 100).toFixed(2)).format('0,0.00');

export default Balance;
