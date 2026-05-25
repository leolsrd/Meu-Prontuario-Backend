const cepStringVaziaSetZero = (val: string) => {
  if (val === "") {
    return "00000000"
  }
  return val
}


const cepUndefinedSetZero = (val: string) => {
  if (val === undefined) {
    return "00000000"
  }
  return val
}

const cpfCnpjStringVaziaSetZero = (val: string) => {
  if (val === "") {
    return "00000000000"
  }
  return val
}

const cpfCnpjUndefinedVaziaSetZero = (val: string) => {
  if (val === undefined) {
    return "00000000000"
  }
  return val
}

const telefoneStringVaziaSetZero = (val: string) => {
  if (val === "") {
    return "00000000000"
  }
  return val
}

const telefoneUndefinedSetZero = (val: string) => {
  if (val === undefined) {
    return "00000000000"
  }
  return val
}

export {
  cepStringVaziaSetZero,
  cpfCnpjStringVaziaSetZero,
  telefoneStringVaziaSetZero,
  cpfCnpjUndefinedVaziaSetZero,
  cepUndefinedSetZero,
  telefoneUndefinedSetZero
};

