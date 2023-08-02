function formatNumb(numb) {
  return new Intl.NumberFormat('en').format(+numb);
}

export default formatNumb;
