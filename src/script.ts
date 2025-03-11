const display: HTMLInputElement | null = document.getElementById(
  "display"
) as HTMLInputElement;

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
