function addCalculatorKey(RowOfKeys, // Revoir le nom des variables
textOnKey, personnalizedClass, numberOfColspan) {
    const rowSelected = document.querySelector(`${RowOfKeys}`);
    const newKey = document.createElement("td");
    newKey.innerText = textOnKey;
    // Améliorer la fonction pour ne pas avoir de class en double
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
addCalculatorKey("#fifthRowOfKeys", "0", "calculator__key--zero", 3);
addCalculatorKey("#fifthRowOfKeys", "=", "calculator__key--operator", 1);
const display = document.querySelector("#display");
const keyboard = document.querySelector("#calculatorkeyboard");
keyboard.addEventListener("click", (e) => {
    const target = e.target;
    // target doit bien être un element HTML et on ne doit pas cliquer sur les bords de la calculatrice
    if (target instanceof HTMLElement && target.tagName !== "TABLE") {
        if (target.innerText === "=") {
            console.log("calculate", calculerExpression(display.value));
            display.value = calculerExpression(display.value);
        }
        else {
            display.value += target.innerText;
        }
    }
});
// CHATGPT Implémentation de l’algorithme Shunting-Yard de Dijkstra et une évaluation en notation postfixée (RPN - Reverse Polish Notation).
function calculerExpression(expression) {
    try {
        const postfix = convertirEnPostfix(expression);
        return evaluerPostfix(postfix);
    }
    catch (error) {
        return "Erreur";
    }
}
// 1️⃣ Convertit l'expression infixe (ex: "3 + 5 * 2") en notation postfixée (ex: "3 5 2 * +")
function convertirEnPostfix(expression) {
    const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };
    const output = [];
    const operators = [];
    const tokens = expression.match(/\d+(\.\d+)?|[\+\-\*\/\(\)]/g); // Tokenisation
    tokens.forEach((token) => {
        if (!isNaN(token)) {
            output.push(token); // Si c'est un nombre, l'ajouter directement
        }
        else if (token === "(") {
            operators.push(token);
        }
        else if (token === ")") {
            while (operators.length && operators[operators.length - 1] !== "(") {
                output.push(operators.pop());
            }
            operators.pop(); // Retirer la parenthèse ouvrante
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
// 2️⃣ Évalue la notation postfixée
function evaluerPostfix(postfix) {
    const stack = [];
    postfix.forEach((token) => {
        if (!isNaN(token)) {
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
// 🔹 Exemples d'utilisation :
// console.log(calculerExpression("3 + 5 * 2")); // 13
// console.log(calculerExpression("(10 - 2) / 4")); // 2
// console.log(calculerExpression("10 + 2 * (6 / 3)")); // 14
// console.log(calculerExpression("(2.5 + 3.5) / 2")); // doit faire 3
