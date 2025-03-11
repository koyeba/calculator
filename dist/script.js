const display = document.getElementById("display");
function addValue(value) {
    if (!display)
        return;
    const operators = ["+", "-", "*", "/"];
    if (!operators.includes(value)) {
        display.value += value;
    }
    else {
        const regex = /\d[+\-*\/]$/;
        if (!regex.test(display.value)) {
            display.value += value;
        }
    }
}
function clearDisplay() {
    if (display) {
        display.value = "";
    }
}
function calculateResult() {
    if (!display)
        return;
    try {
        display.value = eval(display.value);
    }
    catch (e) {
        alert("Erreur de calcul");
    }
}
