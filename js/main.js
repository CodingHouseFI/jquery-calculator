var numbers = [];
var num1 = 0, num2, lastNumber, lastOperator, opFlag = false, shifted = false;
var key1 = 49, key2 = 50, key3 = 51, key4 = 52, key5 = 53, key6 = 54, key7 = 55, key8 = 56, key9 = 57, key0 = 48, shift = 16, equalKey = 187, divideKey = 191, enterKey = 13, escKey = 27, minusKey = 189;

function updateDisplay(number) {
	var displayNumber = Math.floor(numbers[0] * 10) / 10;
	$('.input-div').text(displayNumber);
}


function numberInput(number) {
	lastNumber = number;

	var currentView = $('.input-div').text();

	if (currentView === '0' && number === '0') {
		// do nothing
		console.log('already 0');
	} else {	
		if (opFlag && numbers.length === 1) {
			numbers[1] = number;
			$('.input-div').text(numbers[1]);
		} else if (opFlag && numbers.length === 2) {
			numbers[1] += number
			$('.input-div').text(numbers[1]);		
		} else if (numbers.length < 1) {
			numbers[0] = number;
			$('.input-div').text(numbers[0]);
		} else if (numbers.length === 1) {
			numbers[0] += number;
			$('.input-div').text(numbers[0]);
		}
	}

	console.log(numbers);
}

function opInput(operator) {
	$('.input-div').text(operator);
	opFlag = true;
	var num1, num2;
	if (numbers.length === 2) {
		$('.input-div').text(operator);
		num1 = Number(numbers[0]);
		num2 = Number(numbers[1]);
		console.log(calculate[lastOperator](num1, num2));
		numbers[0] = calculate[lastOperator](num1, num2);
		updateDisplay(numbers[0]);
		numbers.pop();
	}
	else if (numbers.length === 1) {
		// numbers[0] += lastNumber;
		// numbers[0] = calculate[lastOperator](numbers[0], numbers[1]);
		// numbers.pop();
	}
	console.log(numbers, operator);
	lastOperator = operator;
}

function equals() {
		var num1 = Number(numbers[0]);
		var num2 = Number(numbers[1]);
	if (numbers.length === 2) {
		lastNumber = num2;
		numbers[0] = calculate[lastOperator](num1, num2);
		console.log(numbers[0]);
		updateDisplay(numbers[0]);
		numbers.pop();
	} else if (numbers.length === 1) {
		console.log('do it again');
		numbers[0] = calculate[lastOperator](numbers[0], lastNumber);
		updateDisplay(numbers[0]);
		opFlag = false;
	}
}

var calculate = {
  '+': function (x, y) { return x + y },
  '-': function (x, y) { return x - y },
  '*': function (x, y) { return x * y },
  '/': function (x, y) { return x / y }
};


$(document).ready(function() {
	$('.input-div').text(0); // init display
	$('.calc-btn').click(function() {
		var input =  $(this).text();
		numberInput(input);
	});
	$('.calc-btn-op').click(function() {
		var operator = $(this).text();
		opInput(operator);
	});
	$('.calc-btn-eq').click(function() {
		equals();
	});	
	$('.calc-btn-clear').click(function() {
		numbers = [];
		$('.input-div').text(0);
		opFlag = false;
	});
	$('.calc-btn-abs').click(function() {
		if (numbers[0] > 0) {
			numbers[0] = numbers[0] * -1;
		} else if (numbers[0] < 0) {
			numbers[0] = Math.abs(numbers[0]);
		} else {
			numbers[0] = 0;
		}
		// numbers[0] = Math.abs(number);
		updateDisplay(numbers[0]);
	});
	$('.calc-btn-mod').click(function() {
		numbers[0] = numbers[0] / 100;
		updateDisplay(numbers[0]);
	});
	$('body').on('keydown', function(event) {
		console.log(event.which);

		if (event.which === shift) {
			shifted = true;
			console.log('shift');
		}

		if (event.which === key1) {
			console.log('key1 pressed');
			numberInput('1');
		} else if (event.which === key2) {
			numberInput('2');			
		} else if (event.which === key3) {
			numberInput('3');			
		} else if (event.which === key4) {
			numberInput('4');			
		} else if (event.which === key5 && shifted) {
			numbers[0] = numbers[0] / 100;
			updateDisplay(numbers[0]);
		} else if (event.which === key5) {
			numberInput('5');
		} else if (event.which === key6) {
			numberInput('6');			
		} else if (event.which === key7) {
			numberInput('7');			
		} else if (event.which === key8 && shifted) {
			opInput('*');
		} else if (event.which === key8) {
			numberInput('8');
		} else if (event.which === key9) {
			numberInput('9');			
		} else if (event.which === key0) {
			numberInput('0');			
		} else if (event.which === equalKey && shifted) {
			opInput('+');
		} else if (event.which === minusKey) {
			opInput('-');			
		} else if (event.which === equalKey) {
			equals();
		} else if (event.which === enterKey) {
			equals();
		} else if (event.which === escKey) {
			numbers = [];
			$('.input-div').text(0);
			opFlag = false;
		} else if (event.which === divideKey) {
			opInput('/');
		}
	});
	$('body').on('keyup', function(event) {
		if (event.which === shift) {
			shifted = false;
			console.log('unshift');
		}
	});
});