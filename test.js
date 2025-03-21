let res = document.querySelector(".res");
let numb = document.querySelector(".numb");
res.textContent = "";

function roundToSeven(num) {
    return parseFloat(num.toFixed(7));
}

numb.addEventListener("click", function (event) {
    if (event.target.className != "del") {
        if (event.target.className == "n") {
            res.textContent += event.target.textContent;
        }

    }
});
let del = document.querySelector(".del");
del.addEventListener("click", function () {
    res.textContent = "";
    operand1=null;
    operand2=null;
    currentOperation=null;
});

let currentOperation = null; // Хранит текущую операцию (+, -, *, / и т.д.)
let operand1 = null;        // Хранит первый операнд
let operand2 = null;        // Хранит второй операнд (для повторных нажатий на равно)


function calculate(operation) {
    try {
        if (operand1 === null) {
            operand1 = +res.textContent;
            currentOperation = operation;
            res.textContent = operand1 + operation;
            operand2 = null;
        } else {
            let currentDisplay = res.textContent;
            let lastOperand;

            if (operand2 === null) {
                let split = currentDisplay.split(currentOperation);
                if (split.length > 1) {
                    lastOperand = +split[split.length - 1];
                    operand2 = lastOperand;
                } else {
                    return;
                }
            } else {
                lastOperand = operand2;
            }

            let result;
            switch (currentOperation) {
                case '+':
                    result = operand1 + lastOperand;
                    break;
                case '-':
                    result = operand1 - lastOperand;
                    break;
                case '^':
                    result = operand1 ** lastOperand;
                    break;
                case '*':
                    result = operand1 * lastOperand;
                    break;
                case '/':
                    if (lastOperand === 0) {
                        throw new Error("Ошибка: деление на ноль");
                    }
                    result = operand1 / lastOperand;
                    break;
                default:
                    throw new Error("Неизвестная операция");
            }

            // Проверка на слишком маленькие или большие числа
            if (Math.abs(result) < 1e-7) {
                throw new Error("Число слишком маленькое");
            }
            if (Math.abs(result) > 1e+7) {
                throw new Error("Число слишком большое");
            }

            res.textContent = roundToSeven(result);
            operand1 = result;
        }
    } catch (error) {
        res.textContent = error.message;
    }
}


function calculateSingle(operation) {
    try {
        let operand = +res.textContent;
        let result;

        switch (operation) {
            case 'sqrt':
                if (operand < 0) throw new Error("Ошибка: корень из отрицательного числа");
                result = Math.sqrt(operand);
                break;
            case 'drob':
                if (operand === 0) throw new Error("Ошибка: деление на ноль");
                result = 1 / operand;
                break;
            default:
                throw new Error("Неизвестная операция");
        }

        if (Math.abs(result) < 1e-7) throw new Error("Число слишком маленькое");
        if (Math.abs(result) > 1e+7) throw new Error("Число слишком большое");

        res.textContent = roundToSeven(result);
    } catch (error) {
        res.textContent = error.message;
    }
}

function handleButtonClick(event) {
    try {
        let target = event.target;
        let buttonValue = target.textContent;

        if (target.classList.contains("number")) {
            res.textContent = res.textContent === "0" ? buttonValue : res.textContent + buttonValue;
        } 
        else if (target.classList.contains("minus")) {
            if (res.textContent === "" || res.textContent === "0") {
                res.textContent = "-";
            } 
            else if (currentOperation && res.textContent.endsWith(currentOperation)) {
                res.textContent += "-";
            } 
            else {
                calculate('-');
            }
        } 
        else if (target.classList.contains("plus")) {
            calculate('+');
        } 
        else if (target.classList.contains("multy")) {
            calculate('*');
        } 
        else if (target.classList.contains("division")) {
            calculate('/');
        } 
        else if (target.classList.contains("pow")) {
            calculate('^');
        } 
        else if (target.classList.contains("sqrt")) {
            calculateSingle('sqrt');
        } 
        else if (target.classList.contains("drob")) {
            calculateSingle('drob');
        } 
        else if (target.classList.contains("ravno")) {
            calculate(currentOperation);
        } 
        else if (target.classList.contains("clear")) {
            res.textContent = "0";
            operand1 = null;
            operand2 = null;
            currentOperation = null;
        }

        // Проверка на ошибки
        if (res.textContent === "NaN" || res.textContent === "null") {
            res.textContent = "Ошибка";
        }
    } catch (error) {
        res.textContent = error.message;
    }
}

//Привязываем функцию к кнопкам
document.addEventListener('click', handleButtonClick);
