const removeMascaraDevolveNumero = (value: string) => {
  return value.replace(/[^0-9]/g, '');
}

export default removeMascaraDevolveNumero;
