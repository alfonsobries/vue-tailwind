const isNumeric =  function isNumericFunction(value) {
  return !!String(value).match(/^-{0,1}\d+$/)
}

export default isNumeric;
