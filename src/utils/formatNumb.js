function formatNumb(numb) {
  return new Intl.NumberFormat('en').format(+numb);
}

console.log(formatNumb(9749763));

export default formatNumb;
