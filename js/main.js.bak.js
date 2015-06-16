var Calc = {};
var numbers = [];
var memNum = 0, numOne = 0, numTwo, operator, result, prevOperator, opFlag = false, storedOp;

Calc.calculate = function(x, y, operator) {
	console.log(x);
	console.log(y);
	console.log('operator: ' + operator);
	if (operator === '+') {
		return x + y;
	} else if (operator === '-') {
		return x - y;
	} else if (operator === '*') {
		return x * y;
	} else if (operator === '/') {
		return x / y;
	}
}

Calc.inputCheck = function(input) {
	var inputIsNumber = Number.isInteger(input*1);

	if (inputIsNumber) { // if input is number
		// numInput = Number(input);
		if (numbers[1] || numbers[1] === 0) { // if num2 exists
			if(numbers[1] === 0) { // if num2 is 0
				console.log('no num2, making');
				numbers[1] = input; // set num2 to input
			} else { //otherwise
				console.log('cat to num2'); // concat to num2 
				numbers[1] += input;
			}
		} else if (numbers[0] && (numbers[0] !== 0) && operator) { // if num1 exists and isnt 0 and theres an operator
			numbers[1] = input; // set num2 to input
		} else if (numbers[0] && (numbers[0] !== 0)) { 
			if (operator) {
				numbers[1] += input;
			}
				console.log('cat to num1');
				numbers[0] += input;
		} else {
			console.log('no num1, making');
			numbers.push(input);
		}
	} else { // if operator
		// operator = input;
		if (numbers[1] && opFlag) { // if num2
			// operator = prevOperator;
			console.log('do math');
			result = Calc.calculate(numbers[0] * 1, numbers[1] * 1, storedOp || operator);
			numbers[0] = result;
			numbers.pop();
			console.log(result);
			$('.input-div').text(result);
			prevOperator = operator;
			// prevOperator = operator;	
			// operator = undefined;
		} else if (numbers[0]) { // no running operator
			console.log('add num1 and operator');
			operator = input;
			numbers[1] = 0;
		} else {
			console.log('you hit =');
			if (numbers[0] && numbers[1]) {
				result = Calc.calculate(numbers[0] * 1, numbers[1] * 1, operator);
				$('.input-div').text(result);
			}
		}
	}
	console.log(numbers);
}


$(document).ready(function() {
	$('.input-div').text(numOne || memNum); // init display
	$('.calc-btn').click(function() {
		var input =  $(this).text();
		$('.input-div').text(input);
		Calc.inputCheck(input);
	});
});