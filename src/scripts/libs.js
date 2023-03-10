export default {
  getNumberFormatted(val) {
    const regexp = /\B(?=(\d{3})+(?!\d))/g;
    return val.toString().replace(regexp, ',');
  }
}