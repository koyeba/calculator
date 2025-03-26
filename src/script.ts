const display: HTMLInputElement | null = document.querySelector(
  "#display"
) as HTMLInputElement;

const keyboard: HTMLElement | null = document.querySelector("#keyboard");

function addCalculatorKey(
  RowOfKeys: string,
  textOnKey: string,
  personnalizedClass: string,
  numberOfColspan: Number
) {
  const rowSelected = document.querySelector(`${RowOfKeys}`);
  const newKey = document.createElement("td");
  newKey.innerText = textOnKey;
  newKey.classList.add("calculator__key", personnalizedClass);
  newKey.setAttribute("colspan", `${numberOfColspan}`);
  rowSelected.append(newKey);
}

addCalculatorKey("#firstRowOfKeys", "AC", "calculator__key--ac", 3);
addCalculatorKey("#firstRowOfKeys", "%", "calculator__key--operator", 1);

addCalculatorKey("#secondRowOfKeys", "7", "calculator__key", 1);
addCalculatorKey("#secondRowOfKeys", "8", "calculator__key", 1);
addCalculatorKey("#secondRowOfKeys", "9", "calculator__key", 1);
addCalculatorKey("#secondRowOfKeys", "x", "calculator__key--operator", 1);

addCalculatorKey("#thirdRowOfKeys", "4", "calculator__key", 1);
addCalculatorKey("#thirdRowOfKeys", "5", "calculator__key", 1);
addCalculatorKey("#thirdRowOfKeys", "6", "calculator__key", 1);
addCalculatorKey("#thirdRowOfKeys", "-", "calculator__key--operator", 1);

addCalculatorKey("#fourthRowOfKeys", "1", "calculator__key", 1);
addCalculatorKey("#fourthRowOfKeys", "2", "calculator__key", 1);
addCalculatorKey("#fourthRowOfKeys", "3", "calculator__key", 1);
addCalculatorKey("#fourthRowOfKeys", "+", "calculator__key--operator", 1);

addCalculatorKey("#fifthRowOfKeys", "0", "calculator__key--zero", 3);
addCalculatorKey("#fifthRowOfKeys", "=", "calculator__key--operator", 1);

function addValue(value: string): void {
  if (!display) return;
  const operators: string[] = ["+", "-", "*", "/"];

  if (!operators.includes(value)) {
    display.value += value;
  } else {
    const regex = /\d[+\-*\/]$/;
    if (!regex.test(display.value)) {
      display.value += value;
    }
  }
}

function clearDisplay(): void {
  if (display) {
    display.value = "";
  }
}

function calculateResult(): void {
  if (!display) return;

  try {
    display.value = eval(display.value);
  } catch (e) {
    alert("Erreur de calcul");
  }
}
