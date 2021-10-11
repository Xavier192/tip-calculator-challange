const inputs = Array.from(document.getElementsByTagName('input'));
const tipButtons = Array.from(document.querySelectorAll('.grid button'));
const splitterTotal = document.querySelector('.splitter__total');
const splitterTip = document.querySelector('.splitter__tip');
const inputConstraints = [999999,150,10000];
let inputData = [0,0,0]; 


/*Set input constraints can't be letters and have to be in a range.*/

for(let input = 0 ; input < inputs.length ; input++){
    inputs[input].onkeyup = function(){
        setInputConstraints(input);
        getDataInput(input);
    }
}

function setInputConstraints(){
    for(let input= 0 ; input < inputs.length  ; input++){
        setConstraint(inputConstraints[input],inputs[input]);
    }
}

function setConstraint(value, input){
    if(input.value > value){
        input.value = value;
    }
    if(isNaN(input.value)){
        input.value = '';
    }
}

function getDataInput(input){
    inputData[input] = parseInt(inputs[input].value);
    checkInputData();
    if(input == 1){
        setbuttonBackground();
    }
}

/*Get data from form and stores it in inputData[]*/

for(let button = 0 ; button < tipButtons.length ; button++){
    tipButtons[button].onclick = function(){
        inputData[1] = getButtonValues(button);
        setbuttonBackground(button);
        checkInputData();
    }
}

function getButtonValues(button){
    let buttonText = tipButtons[button].textContent;

    return parseInt(buttonText.substring(0, buttonText.length - 1));
}

function setbuttonBackground(buttonException = -1){
    for(let buttons = 0 ; buttons < tipButtons.length ; buttons++){
        tipButtons[buttons].id = '';
    }
    if(buttonException > -1){
        tipButtons[buttonException].id = 'button-active';
    }
}

/*Calculates the total per person and the tip*/

function calculate(){
    let tip = calculateTip();
    let total = calculateTotal(tip);
    splitterTip.innerHTML = tip;
    splitterTotal.innerHTML = total;
}

function calculateTip(){return parseFloat((inputData[0]/100 * inputData[1]).toFixed(2))}

function calculateTotal(tip){return ((inputData[0]+tip)/inputData[2]).toFixed(2);}

function checkInputData(){
    if(canCalculate()){
        calculate();
    }
}

function canCalculate(){
    let calculate = true;

    for(let data = 0 ; data < inputData.length ; data++){
        if(isNaN(inputData[data]) || inputData[data] <= 0){
            calculate = false;
        }
    }

    return calculate;
}

//2. Activar botó de reset nomes si resultat != 0.



