const display = document.querySelector("#display") as HTMLInputElement | null;
const keyboard = document.querySelector(
  "#calculatorkeyboard"
) as HTMLElement | null;

keyboard.addEventListener("click", (e) => {
  const target = e.target;

  if (target instanceof HTMLElement && target.tagName !== "TABLE") {
    if (target.innerText === "AC") {
      display.value = "0";
    } else if (target.innerText === "=") {
      display.value = calculate(display.value);
    } else {
      display.value += target.innerText;
    }
  }
});

function calculate(expression: string) {
  try {
    const postfix = expressionToPostfix(expression);
    return calculatePostfix(postfix);
  } catch (error) {
    return "Erreur";
  }
}

// Convertit l'expression infixe (ex: "3 + 5 * 2") en notation postfixée (ex: "3 5 2 * +")
function expressionToPostfix(expression): string[] {
  const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };
  const output = [];
  const operators = [];
  const tokens = expression.match(/\d+(\.\d+)?|[\+\-\*\/\(\)]/g); // Tokenisation

  tokens.forEach((token) => {
    if (!isNaN(token)) {
      output.push(token); // Si c'est un nombre, l'ajouter directement
    } else if (token === "(") {
      operators.push(token);
    } else if (token === ")") {
      while (operators.length && operators[operators.length - 1] !== "(") {
        output.push(operators.pop());
      }
      operators.pop(); // Retirer la parenthèse ouvrante
    } else {
      while (
        operators.length &&
        precedence[operators[operators.length - 1]] >= precedence[token]
      ) {
        output.push(operators.pop());
      }
      operators.push(token);
    }
  });

  while (operators.length) {
    output.push(operators.pop());
  }

  return output;
}

// Évalue la notation postfixée
// Fait le calcul en tenant compte des priorités
function calculatePostfix(postfix: string[]) {
  const stack = [];

  postfix.forEach((token) => {
    if (!isNaN(Number(token))) {
      stack.push(parseFloat(token));
    } else {
      const b = stack.pop();
      const a = stack.pop();
      switch (token) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          stack.push(a / b);
          break;
        default:
          throw new Error("Opérateur invalide");
      }
    }
  });

  return stack.pop();
}

// Ajout dynamique des touches

function addCalculatorKey(
  rowOfKeys: string,
  textOnKey: string,
  personnalizedClass: string,
  numberOfColspan: Number
) {
  const rowSelected = document.querySelector(`${rowOfKeys}`);
  const newKey = document.createElement("td");
  newKey.innerText = textOnKey;
  // Améliorer fonction pour ne pas avoir les classes en double
  newKey.classList.add("calculator__key", personnalizedClass);
  newKey.setAttribute("colspan", `${numberOfColspan}`);
  rowSelected.append(newKey);
}

// Améliorer le code pour ne pas avoir tout ses appels de fonctions, tableau ?

addCalculatorKey("#firstRowOfKeys", "AC", "calculator__key--ac", 3);
addCalculatorKey("#firstRowOfKeys", "/", "calculator__key--operator", 1);
addCalculatorKey("#secondRowOfKeys", "7", "calculator__key", 1);
addCalculatorKey("#secondRowOfKeys", "8", "calculator__key", 1);
addCalculatorKey("#secondRowOfKeys", "9", "calculator__key", 1);
addCalculatorKey("#secondRowOfKeys", "*", "calculator__key--operator", 1);
addCalculatorKey("#thirdRowOfKeys", "4", "calculator__key", 1);
addCalculatorKey("#thirdRowOfKeys", "5", "calculator__key", 1);
addCalculatorKey("#thirdRowOfKeys", "6", "calculator__key", 1);
addCalculatorKey("#thirdRowOfKeys", "-", "calculator__key--operator", 1);

addCalculatorKey("#fourthRowOfKeys", "1", "calculator__key", 1);
addCalculatorKey("#fourthRowOfKeys", "2", "calculator__key", 1);
addCalculatorKey("#fourthRowOfKeys", "3", "calculator__key", 1);
addCalculatorKey("#fourthRowOfKeys", "+", "calculator__key--operator", 1);

addCalculatorKey("#fifthRowOfKeys", "0", "calculator__key--zero", 2);
addCalculatorKey("#fifthRowOfKeys", ".", "calculator__key", 1);
addCalculatorKey("#fifthRowOfKeys", "=", "calculator__key--operator", 1);
