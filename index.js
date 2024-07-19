const operators = ['+', '-', '*', '/', '='];
const numberKeys = '0123456789.';

clearDisplay();

// Button Clicked
$(".button").on("click", function(e) {
    let btn = e.target.innerHTML;

    btn = btn === '×' ? '*' : btn === '÷' ? '/' : btn;

    handleInput(btn);
});

// Keyboard clicked
$(document).on("keydown", function(e) {
    let btn = e.key;
    handleInput(btn);
});

function handleInput(key) { // $('.disabled').prop('disabled', true);
    let displayText = $("#display").text().trim();

    if (key.toLowerCase() === 'c') {
        clearDisplay();
    } else if (key === '=' || key === 'Enter') {
        calculateResult(displayText);
    } else if (numberKeys.includes(key)) {
        handleNumber(key);
    } else if (operators.includes(key) || key === '%') {
        handleOperator(key, displayText);
    } else if (key === '⌫' || key === 'Backspace') {
        $('#display').text(displayText.slice(0,-1)); 
        
        (displayText.length == 1) ? clearDisplay() : '';
    }

    $('#display').css("font-size", displayText.length > 11 ? "1.5rem" : "3.5rem");
}

function handleNumber(num) { 
    ($("#display").text() == 0) ? $("#display").text(num) 
                                : $("#display").text($("#display").text() + num);
}

function handleOperator(oper, currentText) { 
    
    (operators.includes(currentText.slice(-1))) ? $("#display").text(currentText.slice(0, -1) + oper) 
                                                : $("#display").text(currentText + oper);
                                                
    let pattern = new RegExp(`[${operators.map(operator => `\\${operator}`).join('')}]`);
    
    let num = currentText.split(pattern);

    if(oper == '%') { 
        let lastNumber = num[num.length - 1]; 
        let percent = lastNumber / 100;

        let newText = currentText.slice(0, - (lastNumber.length)) + percent;
        
        $("#display").text(newText);
    } 
}

function calculateResult(currentText) {
    currentText = currentText.replace(/=*$/, '');
    try {
        $("#display").text(eval(currentText));
    } catch (error) {
        $("#display").text('Error'); // console.error('Error during evaluation:', error);

        setTimeout(() => clearDisplay(), 2000); // Reset after 2 seconds 
    }
}

function clearDisplay() {
    $("#display").text(0);  
}