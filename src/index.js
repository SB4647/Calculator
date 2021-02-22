
//set initial calculator variables
const calculator = {
  currentOperand: '',
  previousOperand: '',
  operation: null
}
/* FUNCTIONS */

//clear calculator variables (called when clear Button clicked)
const clear = () => {
  calculator.currentOperand = '';
  calculator.previousOperand = '';
  calculator.operation = null;
}

//function used to remove the the last digit from current display when AC button clicked
const erase = () => {
  calculator.currentOperand = `${calculator.currentOperand}`.slice(0, -1);
}

//function used to update current operand when number button pressed
const appendNumber = number => {

  //condition to only allow '.' to be printed only once in current operand display
  if (number === '.' && `${calculator.currentOperand}`.includes('.')) {
    return;
  }

  //convert number to string and append it on the end of current display value 
  calculator.currentOperand = `${calculator.currentOperand}` + `${number}`;
}

//function used when operator button clicked. 
const chooseOperation = operation => {

  //condition to not allow operation to be selected if there is no current operand
  if (calculator.currentOperand === '') {
    return;
  }

  //condition to calculate result when a previous operand has been selected
  if (calculator.previousOperand !== '') {
    calculate();
  }

  //store current operation in memory and set the current operand as previous
  calculator.operation = operation;
  calculator.previousOperand = calculator.currentOperand;
  calculator.currentOperand = '';

}

//calculates value with passed in operands and operator
const calculate = () => {
  let result;

  //convert operands to numbers 
  const prev = parseFloat(calculator.previousOperand);
  const current = parseFloat(calculator.currentOperand);

  //if previous or current operand is not a number then exit function
  if (isNaN(prev) || isNaN(current)) {
    return;
  }

  //calculate the result according to which operator was selected.
  switch (calculator.operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '×':
      result = prev * current;
      break;
    case '÷':
      result = prev / current;
      break;
    default:
      return;
  }

  //update current operand to the calculated result.
  //remove selected operation and previousOperand from memory.
  calculator.currentOperand = result;
  calculator.operation = null;
  calculator.previousOperand = '';
}


//updates calculator display 
const updateDisplay = () => {

  //update current screen output to the current operand
  currentDisplayOutput.innerText = calculator.currentOperand;

  //condition that displays the operator and operand in previous display when operator has been selected
  if (calculator.operation != null) {
    previousDisplayOutput.innerText = `${calculator.previousOperand} ${calculator.operation}`;
  } else {
    previousDisplayOutput.innerText = '';
  }
}


//Retrive button information from index.html
const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operator]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const clearBtn = document.querySelector('[data-clear]');
const previousDisplayOutput = document.querySelector('[data-previous-operand]');
const currentDisplayOutput = document.querySelector('[data-current-operand]');

//EVENT HANDLER FUNCTIONS

//add 'click' event handler to all number buttons
numberBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    //update calculator operands and display to screen
    appendNumber(btn.innerText);
    updateDisplay();
  })
})

//Add 'click' event handler to all operator buttons
operationBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    //set operator, adjust operands and display to screen
    chooseOperation(btn.innerText);
    updateDisplay();
  })

})

//Add 'click' event handler to equals button
equalsBtn.addEventListener('click', () => {
  //calculate result and display to screen
  calculate();
  updateDisplay();

})

//Add 'click' event handler to clear (AC) button
clearBtn.addEventListener('click', () => {
  //clear all operands and operator from display 
  clear();
  updateDisplay();
})

//Add 'click' event handler to delete button
deleteBtn.addEventListener('click', () => {
  //remove digit from current operand and display to screen
  erase();
  updateDisplay();
})
