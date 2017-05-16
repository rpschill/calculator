/* globals $ math */

$(document).ready(function() {
    
    var $output = $('#output');
    
    
    // Initialize output display as 0
    $output.text(0);
    
    
    // Arrays containing numeral and operator strings for matching against button clicks
    var numerals = ['0','1','2','3','4','5','6','7','8','9'];
    var operators = ['+','-','*','/'];
    
    
    // Map event.which key values to numeral strings for keypress
    var keys = {
        96: '0',
        97: '1',
        98: '2',
        99: '3',
        100: '4',
        101: '5',
        102: '6',
        103: '7',
        104: '8',
        105: '9',
        106: '*',
        107: '+',
        109: '-',
        110: '.',
        111: '/',
        8: 'del',
        13: '='
    };
    
    
    // Initialize variables
    var currOper = '';
    var prevOper = '';
    
    var expression = '';
    var num = '';
    var memory = '';
    var result = '';
    var prevResult = '';
    
    
    
    function calculate(input) {
        
        
        // Number inputs
        if (numerals.indexOf(input) != -1) {
            
            // Check state of calculator
            if ($output.text() == 0 || prevResult != '') {
                if (input == '0') {
                    $output.text(0);
                    num = '';
                }
                else {
                    num = input;
                    $output.text(num);
                    prevResult = '';
                    prevOper = '';
                }
            }
            else {
                num += input;
                $output.text(num);
            }
        }
        else if (input == '.') {
            if (num[-1] != '.') {
                num += input;
                $output.text(num);
            }
            else {
                console.log('do nothing');
            }
        }
        else if (operators.indexOf(input) != -1) {
            if ($output.text() === 0) {
                memory = '0';
                currOper = input;
            }
            else if (currOper != '' && num != '') {
                currOper = input;
                prevOper = '';
            }
            else if (prevResult != '' && currOper == '') {
                prevOper = '';
                currOper = input;
                memory = prevResult;
                num = '';
            }
            else {
                memory = num;
                num = '';
                currOper = input;
            }
        }
        else if (input == '=') {
            if (currOper != '' && num != '') {
                expression = memory + currOper + num;
                result = math.eval(expression);
                $output.text(result);
                memory = num;
                prevOper = currOper;
                prevResult = result;
                currOper = '';
                result = '';
                num = '';
            }
            else if (prevResult != '') {
                expression = prevResult + prevOper + memory;
                result = math.eval(expression);
                prevResult = result;
                $output.text(result);
                result = '';
            }
            else {
                console.log('do nothing');
            }
        }
        else if (input == 'ce') {
            $output.text(0);
            memory = '';
            num = '';
            currOper = '';
            result = '';
            expression = '';
        }
        else if (input == 'c') {
            num = memory;
            currOper = '';
            $output.text(num);
        }
        else if (input == 'del') {
            if (num.length <= 1) {
                num = '';
                $output.text(0);
            }
            else {
                num = num.slice(0,-1);
                $output.text(num);
            }
        }
    };
    
    
    
    
    $('button').click(function() {
        var input = $(this).val();
        calculate(input);
    });
    
    
    
    
    $(document).keyup(function() {
        var key = event.which;
        var input = keys[key];
        calculate(input);
    });

    
});