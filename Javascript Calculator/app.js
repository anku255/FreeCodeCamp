// Keys Codes 
Input = {
  // Number keys
  NUM : 1,
  // Dot/Decimal
  DOT : 2,
  // Operator (=,-,*,/)
  OP : 3,
  // Equals key
  EQ : 4,
  // Clear Entry
  CE : 5,
  // Sign Key (±)
  SIGN: 6,
  // Delete Key
  DEL: 7
}

// States of the Calculator
States = {
  // staring state {display: 0}
  START : 1,
  // First number key is pressed {display: 1/0.1}
  FIRST_NUM : 2,
  // First number is a float {display: 1.3}
  FIRST_NUM_FLOAT : 3,
  // Operator key is pressed
  OPERATOR : 4,
  // Second number is integer
  SECOND_NUM : 5,  
  // Second number is float
  SECOND_NUM_FLOAT : 6,
  // Equal key is pressed
  EQ : 7
}

// Calculator object
// keeps track of numbers/states
Calculator = {
  // current state
  state : States.START,
  // current operator
  op : '',
  // display
  display : '',
  // first number
  firstNum : '',
  // second number
  secondNum : '',
  // current result
  result : '',
  // function to manage a task
  // @param keycode : INPUT KeyCodes
  // @param key: value of key pressed
  doTask: function(keycode, key) {
    switch(this.state) {
      case States.START:
        if(keycode === Input.NUM) {
          this.setDisplay(key);
          this.state = States.FIRST_NUM;
        } else if(keycode === Input.DOT) {
          this.setDisplay("0.");
          this.state = States.FIRST_NUM_FLOAT;
        }
        break;

      case States.FIRST_NUM:
        if(keycode === Input.NUM) {
          this.setDisplay(this.display + key);
        } 
        else if(keycode === Input.DOT) {
          this.setDisplay(this.display + '.');
          this.state = States.FIRST_NUM_FLOAT;
        }
        else if (keycode === Input.SIGN) {
          changeSign();
        }
        else if(keycode === Input.DEL) {
          deleteNum();
        }
        else if(keycode === Input.OP) {
          this.firstNum = this.display;
          this.op = key;
          this.result = this.firstNum;
          updateSecondDisplay();
          this.state = States.OPERATOR;
        } 
        else if(keycode === Input.CE) {
          this.setDisplay("0");
          this.state = States.START;
        }
        break;

      case States.FIRST_NUM_FLOAT:
        if(keycode === Input.NUM) {
          this.setDisplay(this.display + key);
        } 
        else if(keycode === Input.OP) {
          this.firstNum = this.display;
          this.op = key;
          this.result = this.firstNum;
          updateSecondDisplay();
          this.state = States.OPERATOR;
        }
        else if (keycode === Input.SIGN) {
          changeSign();
        }
        else if(keycode === Input.DEL) {
          deleteNum();
        }
        else if(keycode === Input.CE) {
          this.setDisplay("0");
          this.state = States.START;
        }
        break;

      case States.OPERATOR:
        if(keycode === Input.NUM) {
          this.setDisplay(key);
          this.secondNum = this.display;
          this.result = getResult();
          updateSecondDisplay();
          this.state = States.SECOND_NUM;
        } 
        else if(keycode === Input.DOT) {
          this.setDisplay('0.');
          this.state = States.SECOND_NUM_FLOAT;
        }
        break;

      case States.SECOND_NUM:
        if(keycode === Input.NUM) {
          this.setDisplay(this.display + key);
          this.secondNum = this.display;
          this.result = getResult();
          updateSecondDisplay();
        } 
        else if(keycode === Input.DOT) {
          this.setDisplay(this.display + '.');
          this.state = States.SECOND_NUM_FLOAT;
        }
        else if (keycode === Input.SIGN) {
          changeSign();
        }
        else if(keycode === Input.DEL) {
          deleteNum();
        }
        else if(keycode === Input.OP) {
          let result = getResult();
          this.firstNum = result;
          this.op = key;
          this.updateDisplay(result);
          this.state = States.OPERATOR;
        }
        else if(keycode === Input.EQ) {
          this.secondNum = this.display;
          let result = getResult();
          this.setDisplay(result);
          this.updateDisplay(result);
          this.state = States.EQ;
        } 
        else if(keycode === Input.CE) {
          this.setDisplay("0");
          this.result = this.firstNum;
          updateSecondDisplay();
          this.state = States.OPERATOR;
        }
        break;

      case States.SECOND_NUM_FLOAT:
        if(keycode === Input.NUM) {
          this.setDisplay(this.display + key);
          this.secondNum = this.display;
          this.result = getResult();
          updateSecondDisplay();
        }
        else if(keycode === Input.EQ) {
          this.secondNum = this.display;
          let result = getResult();
          this.setDisplay(result);
          this.state = States.EQ;
        }
        else if (keycode === Input.SIGN) {
          changeSign();
        }
        else if(keycode === Input.DEL) {
          deleteNum();
        }
        else if(keycode === Input.OP) {
          let result = getResult();
          this.firstNum = result;
          this.op = key;
          this.setDisplay(result);
          this.state = States.OPERATOR;
        }
        else if(keycode === Input.CE) {
          this.setDisplay("0");
          this.result = this.firstNum;
          updateSecondDisplay();
          this.state = States.OPERATOR;
        }
        break;

      case States.EQ:
        if(keycode === Input.EQ) {
          let result = getResult();
          this.setDisplay(result);
        }
        else if(keycode === Input.NUM) {
          this.setDisplay(key);
          this.state = States.FIRST_NUM;
        }
        else if(keycode === Input.DOT) {
          this.setDisplay("0.");
          this.state = States.FIRST_NUM_FLOAT;
        }
        else if(keycode === Input.DEL) {
          deleteNum();
        }
        else if(keycode === Input.OP) {
          this.firstNum = this.display;
          this.op = key;;
          this.state = States.OPERATOR;
        }
        else if(keycode === Input.CE) {
          this.setDisplay("0");
          this.clearAll();
        }
    }
  },

  // setter for display
  setDisplay: function(key) {
    this.display = key;
    this.updateDisplay(this.display);
  },

  updateDisplay: function(value) {
    $('#display_1').html(value);
  },

  clearAll: function() {
    this.state = States.START;
    this.firstNum;
    this.secondNum;
    this.result = '';
    this.op;
    this.setDisplay('0');
    updateSecondDisplay();
  }

}

function getResult() {
  let numOne = Calculator.firstNum;
  let numTwo = Calculator.secondNum;
  let op = Calculator.op;
  switch(op) {
    case '+':
      return Number(numOne) + Number(numTwo);
    case '-':
      return numOne - numTwo;
    case 'x':
      return numOne * numTwo;
    case '÷':
      return numOne / numTwo;
  }
}

function changeSign() {
  var str = Calculator.display;
  if(str.match(/-/))
    str = str.replace('-','');
  else
    str = '-' + str;
  Calculator.setDisplay(str);
}

function deleteNum() {
  var str = String(Calculator.display);
  if(str.length>1)
    Calculator.setDisplay(str.slice(0,-1));
  else
    Calculator.setDisplay('0');
}

function updateSecondDisplay() {
  var str = Calculator.result;
  $('#display_2').html(str);
}

$('.digit').on('click', function() {
  Calculator.doTask(Input.NUM, $(this).html());
});

$('.op_key').on('click', function() {
  Calculator.doTask(Input.OP, $(this).html());
});

$('.dot_key').on('click', function() {
  Calculator.doTask(Input.DOT, $(this).html());
});

$('.eq_key').on('click', function() {
  Calculator.doTask(Input.EQ, $(this).html());
});

$('.clearEntry').on('click', function() {
  Calculator.doTask(Input.CE, $(this).html());
});

$('.allClear').on('click', function() {
  Calculator.clearAll();
});

$('.sign').on('click', function() {
  Calculator.doTask(Input.SIGN, $(this).html());
});

$('.delete').on('click', function() {
  Calculator.doTask(Input.DEL, $(this).html());
});