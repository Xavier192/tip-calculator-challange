/*SPLITTER VALUES*/

const splitterData = function (){
    const inputData = [0,0,0];
    const inputConstraints = [999999,150,10000];

    function getInputData(){ return inputData}
    function getInputConstraints(){return inputConstraints}
    function setInputData(index, data){inputData[index] = data}
    function setInputConstraint(index, data){inputConstraints[index] = data}  

    return{
      getInputData: getInputData,
      getInputConstraints: getInputConstraints,
      setInputData: setInputData,
      setInputConstraint: setInputConstraint
    }
}();

const tipCalculator = function(){
    /*DOM OBJECTS*/
    const inputs = Array.from(document.getElementsByTagName('input'));
    const tipButtons = Array.from(document.querySelectorAll('.grid button'));
    const inputsLength = inputs.length;
    const buttonsLength = tipButtons.length;
    const splitterTotal = document.querySelector('.splitter__total');
    const splitterTip = document.querySelector('.splitter__tip');
    const splitterSize = document.querySelector('.splitter__results');
    const resetButton = document.querySelector('.splitter__reset');

    /*DATA ARRAYS*/
    const inputConstraints = splitterData.getInputConstraints();
    const inputData = splitterData.getInputData();


    function start(){
        clearInputs();
        setInputConstraints();
        storeDataFromInputs();
        changeButtonsBackgroundOnInput();
        storeDataFromButtons();
        calculateListenerInputs();
        calculateListenerButtons();
        reset();
    }

    /*CHECKS VALID VALUES FOR INPUTS*/

    function clearInputs(){
        for(let input = 0 ; input < inputsLength ; input++){
            inputs[input].value = '';
        }
    }

    function setInputConstraints(){
        for(let input = 0 ; input < inputsLength ; input++){
            inputs[input].addEventListener('keyup',function(){
                setRange(input);
                eraseLetters(input);
            });
        }
    }

    function setRange(input){
        if(inputs[input].value > inputConstraints[input]){
            inputs[input].value = inputConstraints[input];
        }
    }

    function eraseLetters(input){
        if(isNaN(inputs[input].value)){
            inputs[input].value = '';
        }
    }

    /*STORE DATA FROM INPUTS  AND BUTTONS IN INPUTDATA ARRAY */

    function storeDataFromInputs(){
        for(let input = 0 ; input < inputsLength ; input++){
            inputs[input].addEventListener('keyup',function(){
                splitterData.setInputData(input,parseInt(inputs[input].value));
            });
        }
    }

    function changeButtonsBackgroundOnInput(){
        inputs[1].addEventListener('keyup',function(){
            setButtonBackground();
        });
    }

    function storeDataFromButtons(){
        for(let button = 0 ; button < buttonsLength ; button++){
            tipButtons[button].addEventListener('click',function(){
               splitterData.setInputData(1,getButtonValueInt(tipButtons[button]));
               setButtonBackground(button);
            });
        }
    }

    function getButtonValueInt(button){
        let buttonValue = button.textContent;
        
        return parseInt(buttonValue.substring(0, buttonValue.length -1));
    }

    function setButtonBackground(buttonException = -1){

        for(let button = 0 ; button < buttonsLength ; button++){
            tipButtons[button].id = '';
        }
        if(buttonException > -1){
            tipButtons[buttonException].id = 'button-active';
            inputs[1].value = '';
        }
    }

    /*CHECK IF WE ARE REASY TO CALCULATE AND CALCULATES THE RESULT*/

    function calculate(){
        if(canCalculate()){
            calculateTip();
            calculateTotal();
            changeSize();
        }
    }


    function calculateTip(){
        splitterTip.innerHTML = parseFloat((inputData[0]/100 * inputData[1]).toFixed(2));
    }

    function calculateTotal(){
        const tip = parseFloat((inputData[0]/100 * inputData[1]).toFixed(2));
        splitterTotal.innerHTML = ((inputData[0]+tip)/inputData[2]).toFixed(2);
    }

    function calculateListenerInputs(){
        for(let inputCheck = 0 ; inputCheck < inputsLength ; inputCheck++){
            inputs[inputCheck].addEventListener('keyup',function(){
                calculate();
            });
        }
    }

    function calculateListenerButtons(){
        for(let buttonCheck = 0 ; buttonCheck < buttonsLength ; buttonCheck++){
            tipButtons[buttonCheck].addEventListener('click',function(){
                calculate();
            });
        }
    }

    function canCalculate(){
        let calculate = true;
        
        for(let data = 0 ; data < inputsLength ; data++){
            if(isNaN(inputData[data]) || inputData[data] <= 0){
                calculate = false;
            }
        }
    
        return calculate;
    }

    function changeSize(){
        if(splitterTotal.textContent > 999 || splitterTip.textContent > 999){
            splitterSize.classList.add('splitter__size');
        }else{
            splitterSize.classList.remove('splitter__size');
        }
    }

    function reset(){
        resetButton.onclick = function(){
            resetInputData();
            setButtonBackground();
            resetResult();
            clearInputs();
        }
    }

    function resetInputData(){
        for(let data = 0 ; data < inputsLength ; data++){
            inputData[data] = 0;
        }
    }

    function resetResult(){
        splitterTotal.textContent = '0.00';
        splitterTip.textContent = '0.00';
        splitterSize.classList.remove('splitter__size');
    }

    return{
        start:start,
    }
    
}();

tipCalculator.start();





