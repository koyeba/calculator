function addValue(value) {
  const operators = ["+", "-", "*", "/"];
  if (!operators.includes(value)) {
    document.getElementById("display").value += value;
  } else {
    const regex = /\d[+\-/*]/;
    !regex.test(document.getElementById("display").value) && (document.getElementById("display").value += value);
  }
} 