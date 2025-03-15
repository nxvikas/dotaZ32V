let res = document.querySelector(".res");
let numb = document.querySelector(".numb");
res.textContent = "";
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
});

let currentOperation = null; // Хранит текущую операцию (+, -, *, / и т.д.)
let operand1 = null;        // Хранит первый операнд
let operand2 = null;        // Хранит второй операнд (для повторных нажатий на равно)

function calculate(operation) {
    if (operand1 === null) {
        operand1 = +res.textContent;
        currentOperation = operation;
        if (currentOperation=="pow"){
            currentOperation="^";
        }
        res.textContent = operand1 + operation;
        operand2 = null; // Сбрасываем второй операнд
    } else {
        let currentDisplay = res.textContent;
        let lastOperand;
        // Если operand2 уже задан, используем его, иначе берём из дисплея
        if (operand2 === null) {
            let split = currentDisplay.split(currentOperation);
            if (split.length > 1) {
                lastOperand = +split[split.length - 1];
                operand2 = lastOperand; //Сохраняем второй операнд
            } else {
                return; // Если на экране только первый операнд и операция, ничего не делаем
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
                    res.textContent = "Ошибка: деление на ноль";
                    return;
                }
                result = operand1 / lastOperand;
                break;
        }

        res.textContent = result;
        operand1 = result; // Запоминаем результат для дальнейших операций
    }
}


function calculateSingle(operation) {
    let operand = +res.textContent;
    let result;
    switch (operation) {
        case 'sqrt':
            result = Math.sqrt(operand);
            break;
        case 'drob':
            if (operand === 0) {
                res.textContent = "Ошибка: деление на ноль";
                return;
            }
            result = 1 / operand;
            break;
    }
    res.textContent = result;
}

function handleButtonClick(event) {
    let target = event.target;
    let buttonValue = target.textContent;

    if (target.classList.contains("number")) {
        res.textContent += buttonValue;
    }
    else if (target.classList.contains("plus")) {
        calculate('+');
    }
    else if (target.classList.contains("minus")) {
        calculate('-');
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
    } else if (target.classList.contains("clear")) {
        res.textContent = "";
        operand1 = null;
        operand2 = null;
        currentOperation = null;
    }

    if (res.textContent == "NaN") {
        res.textContent = "";
    }
    if (res.textContent == "null") {
        res.textContent = "";
    }
}

//Привязываем функцию к кнопкам
document.addEventListener('click', handleButtonClick);