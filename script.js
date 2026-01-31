const prevDisplay = document.querySelector('.previous-operand');
const currDisplay = document.querySelector('.current-operand');
const btnsContainer = document.querySelector('.buttons-grid');

let currentVal = "";
let previousVal = "";
let operation = undefined;

btnsContainer.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.matches('button')) return;

    const val = target.innerText;

    if (target.classList.contains('number')) {
        if (currentVal.length < 12) currentVal += val;
    } 
    else if (target.classList.contains('operator')) {
        chooseOperation(val);
    } 
    else if (target.id === 'delete') {
        currentVal = currentVal.toString().slice(0, -1);
    } 
    else if (target.id === 'clear') {
        currentVal = "";
        previousVal = "";
        operation = undefined;
    } 
    else if (target.id === 'decimal') {
        if (!currentVal.includes('.')) currentVal += '.';
    } 
    else if (target.id === 'equals') {
        compute();
    }
    updateUI();
});

function chooseOperation(op) {
    if (currentVal === "") return;
    if (previousVal !== "") compute();
    operation = op;
    previousVal = currentVal;
    currentVal = "";
}

function compute() {
    let computation;
    const prev = parseFloat(previousVal);
    const current = parseFloat(currentVal);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+': computation = prev + current; break;
        case '-': computation = prev - current; break;
        case '×': computation = prev * current; break;
        case '÷': 
            if(current === 0) { alert("Math Error!"); return; }
            computation = prev / current; 
            break;
        default: return;
    }
    // Round to 4 decimal places to avoid JS floating point errors
    currentVal = Math.round(computation * 10000) / 10000;
    operation = undefined;
    previousVal = "";
}

function updateUI() {
    currDisplay.innerText = currentVal || "0";
    if (operation != null) {
        prevDisplay.innerText = `${previousVal} ${operation}`;
    } else {
        prevDisplay.innerText = "";
    }
}