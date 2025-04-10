const expression = document.querySelector("#display");
expression.value = "0";
const keyboard = document.querySelector("#keyboard");
keyboard.addEventListener("click", (e) => {
    const target = e.target;
    if (target instanceof HTMLElement && target.tagName !== "TABLE") {
        const character = target.innerText;
        const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        if (character === "AC") {
            expression.value = "0";
        }
        else if (character === "=") {
            expression.value = calculate(expression.value);
        }
        else if (numbers.includes(character) && expression.value === "0") {
            expression.value = character;
        }
        else {
            expression.value += character;
        }
    }
    if (/([+\-*/])0(\d)/.test(expression.value)) {
        expression.value = expression.value.replace(/([+\-*/])0+(\d)/g, "$1$2");
    }
});
function calculate(expression) {
    try {
        const postfix = convertExpressionToPostfix(expression);
        return calculatePostfix(postfix);
    }
    catch (error) {
        return "Erreur";
    }
}
function convertExpressionToPostfix(expression) {
    const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };
    const output = [];
    const operators = [];
    const tokens = expression.match(/\d+(\.\d+)?|[\+\-\*\/\(\)]/g); // Tokenisation
    tokens.forEach((token) => {
        if (!isNaN(token)) {
            output.push(token); // Si nombre => l'ajouter directement
        }
        else if (token === "(") {
            operators.push(token);
        }
        else if (token === ")") {
            while (operators.length && operators[operators.length - 1] !== "(") {
                output.push(operators.pop());
            }
            operators.pop(); // Retire la parenthèse ouvrante
        }
        else {
            while (operators.length &&
                precedence[operators[operators.length - 1]] >= precedence[token]) {
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
function calculatePostfix(postfix) {
    const stack = [];
    postfix.forEach((token) => {
        if (!isNaN(Number(token))) {
            stack.push(parseFloat(token));
        }
        else {
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
function addCalculatorKey(rowOfKeys, textOnKey, personnalizedClass, numberOfColspan) {
    const rowSelected = document.querySelector(`${rowOfKeys}`);
    const newKey = document.createElement("td");
    newKey.innerText = textOnKey;
    // Améliorer fonction pour ne pas avoir les classes en double
    newKey.classList.add("calculator__key", personnalizedClass);
    newKey.setAttribute("colspan", `${numberOfColspan}`);
    rowSelected.append(newKey);
}
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
