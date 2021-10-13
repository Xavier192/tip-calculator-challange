/*CONFIG SPLITTER VALUES*/

const splitterData = function () {
    const inputData = [0, 0, 0];
    const inputConstraints = [999999, 150, 10000];

    function getInputData() { return inputData }
    function getInputConstraints() { return inputConstraints }
    function setInputData(index, data) { inputData[index] = data }
    function setInputConstraint(index, data) { inputConstraints[index] = data }

    return {
        getInputData: getInputData,
        getInputConstraints: getInputConstraints,
        setInputData: setInputData,
        setInputConstraint: setInputConstraint
    }
}();

/*TIP CALCULATOr MAIN SCRIPT*/

const tipCalculator = function () {
    /*DOM OBJECTS*/
    const inputs = Array.from(document.getElementsByTagName('input'));
    const tipButtons = Array.from(document.querySelectorAll('.grid button'));
    const inputsLength = inputs.length;
    const buttonsLength = tipButtons.length;
    const splitterTotal = document.querySelector('.splitter__total');
    const splitterTip = document.querySelector('.splitter__tip');
    const splitterSize = document.querySelector('.splitter__results');
    const resetButton = document.querySelector('.splitter__reset');
    const zeroContainer = document.querySelectorAll('.splitter__element')[2];

    /*DATA ARRAYS*/
    const inputConstraints = splitterData.getInputConstraints();
    const inputData = splitterData.getInputData();

    /*CHECKS VALID VALUES FOR INPUTS*/

    for (let input = 0; input < inputsLength; input++) {
        inputs[input].addEventListener('keyup', function () {
            setRange(input);
            eraseLetters(input);
        });
    }

    inputs[2].addEventListener('keyup',function(){
        if(inputs[2].value == '0'){
            zeroContainer.classList.add('zero');
        }else{
            zeroContainer.classList.remove('zero');
        }
    });

    function clearInputs() {
        for (let input = 0; input < inputsLength; input++) {
            inputs[input].value = '';
        }
    }

    function setRange(input) {
        if (inputs[input].value > inputConstraints[input]) {
            inputs[input].value = inputConstraints[input];
        }
    }

    function eraseLetters(input) {
        if (isNaN(inputs[input].value)) {
            inputs[input].value = '';
        }
    }

    /*STORE DATA FROM INPUTS AND BUTTONS IN INPUT DATA ARRAY */

    for (let input = 0; input < inputsLength; input++) {
        inputs[input].addEventListener('keyup', function () {
            splitterData.setInputData(input, parseInt(inputs[input].value));
        });
    }

    inputs[1].addEventListener('keyup', function () {
        setButtonBackground();
    });

    for (let button = 0; button < buttonsLength; button++) {
        tipButtons[button].addEventListener('click', function () {
            splitterData.setInputData(1, getButtonValueInt(tipButtons[button]));
            setButtonBackground(button);
        });
    }


    function getButtonValueInt(button) {
        let buttonValue = button.textContent;

        return parseInt(buttonValue.substring(0, buttonValue.length - 1));
    }

    function setButtonBackground(buttonException = -1) {

        for (let button = 0; button < buttonsLength; button++) {
            tipButtons[button].id = '';
        }
        if (buttonException > -1) {
            tipButtons[buttonException].id = 'button-active';
            inputs[1].value = '';
        }
    }

    /*CHECK IF WE ARE READY TO CALCULATE AND CALCULATES THE RESULT*/

    function calculate() {
        if (canCalculate()) {
            const tip = parseFloat((inputData[0] / 100 * inputData[1]).toFixed(2));
            const total = ((inputData[0] + tip) / inputData[2]).toFixed(2);
           
            splitterTotal.innerHTML = total;
            splitterTip.innerHTML = (tip/inputData[2]).toFixed(2);

            if (tip > 999 ||  total > 999) {
                splitterSize.classList.add('splitter__size');
            } else {
                splitterSize.classList.remove('splitter__size');
            }

        }
    }

    for (let inputCheck = 0; inputCheck < inputsLength; inputCheck++) {
        inputs[inputCheck].addEventListener('keyup', function () {
            calculate();
        });
    }

    for (let buttonCheck = 0; buttonCheck < buttonsLength; buttonCheck++) {
        tipButtons[buttonCheck].addEventListener('click', function () {
            calculate();
        });
    }

    function canCalculate() {
        let calculate = true;

        for (let data = 0; data < inputsLength; data++) {
            if (isNaN(inputData[data]) || inputData[data] <= 0) {
                calculate = false;
            }
        }

        return calculate;
    }

    resetButton.onclick = function () {
        setButtonBackground();
        clearInputs();

        for (let data = 0; data < inputsLength; data++) {
            inputData[data] = 0;
        }

        splitterTotal.textContent = '0.00';
        splitterTip.textContent = '0.00';
        splitterSize.classList.remove('splitter__size');
    }

    return {
        clearInputs: clearInputs,
    }

}();

tipCalculator.clearInputs();





