import React, { Component } from 'react';
import './styles.css'

export default class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: 0,
        }
    }

    updateResult(newResult) {
        this.setState({
            result: newResult
        })
    }

    pressClear() {
        //reset result
        this.updateResult(0);
    }

    pressDelete() {
        var newResult = this.state.result.toString();
        if (newResult !== 0) {
            if (newResult.length === 1) newResult = 0;
            else {
                //last character = number: delete 1 character
                var character = newResult.substr(newResult.length - 1, 1);
                if (Number(character) || parseInt(character) === 0 || character === ".") {
                    newResult = newResult.substr(0, newResult.length - 1);
                }
                //last character = operator: delete 3 character
                else if (!Number(character)) {
                    newResult = newResult.substr(0, newResult.length - 3);
                }
            }

            this.updateResult(newResult);
        }
    }

    pressNumber(number) {
        var _result = this.state.result;
        var newResult = 0;
        if (_result === 0 && number !== 0) {
            newResult = number;
            if (_result === "0.")
                newResult = "0." + number;
        }
        else if (_result !== 0)
            newResult = `${_result}${number}`;
        this.updateResult(newResult);
    }

    pressOperator(operator) {
        var newResult = this.state.result.toString();

        var lastCharacter = newResult.substr(newResult.length - 1, 1);
        //last character = number: add operator
        if (Number(lastCharacter) || parseInt(lastCharacter) === 0) {
            newResult += operator;
        }
        //last character = operator: delete last 3 character, add new 3 character
        else if (!Number(lastCharacter)) {
            newResult = newResult.substr(0, newResult.length - 3) + operator;
        }
        this.updateResult(newResult);
    }

    pressDot() {
        var result = this.state.result.toString();
        var _length = result.length;
        var space = result.lastIndexOf(" ");
        //fistNumber isFloat?
        if (space === -1) {
            if (result.indexOf(".") === -1)
                result += ".";
        }
        else {
            //check lastNumber isFloat?
            let lastNumber = result.slice(space, _length);
            if (lastNumber.indexOf(".") === -1)
                result += ".";
        }
        this.updateResult(result);
    }

    pressEqual() {
        var result = this.state.result.toString();
        var lastCharacter = result.substr(result.length - 1, 1);
        if (Number(lastCharacter) || lastCharacter === "0") {
            var arrayCharacter = result.split(" ");
            var _length = arrayCharacter.length;

            for (let i = 1; i < _length; i += 2) {
                switch (arrayCharacter[i]) {
                    case "+":
                        arrayCharacter[i + 1] = parseFloat(arrayCharacter[i - 1]) + parseFloat(arrayCharacter[i + 1]);
                        break;
                    case "-":
                        arrayCharacter[i + 1] = parseFloat(arrayCharacter[i - 1]) - parseFloat(arrayCharacter[i + 1]);
                        break;
                    case "*":
                        arrayCharacter[i + 1] = parseFloat(arrayCharacter[i - 1]) * parseFloat(arrayCharacter[i + 1]);
                        break;
                    case "/":
                        arrayCharacter[i + 1] = parseFloat(arrayCharacter[i - 1]) / parseFloat(arrayCharacter[i + 1]);
                        break;
                    default: break;
                }
            }
            result = arrayCharacter[_length - 1];

            this.updateResult(result);
        }
    }

    render() {
        return (
            <div>
                <div id="header">Basic Calculator with ReactJs</div>
                <div class="calcuLator">
                    <div class="result">{this.state.result}</div>
                    <div class="item">CE</div>
                    <div class="item" onClick={() => this.pressNumber(7)}>7</div>
                    <div class="item" onClick={() => this.pressNumber(4)}>4</div>
                    <div class="item" onClick={() => this.pressNumber(1)}>1</div>
                    <div class="item"></div>
                    <div class="item" onClick={() => this.pressClear()}>C</div>
                    <div class="item" onClick={() => this.pressNumber(8)}>8</div>
                    <div class="item" onClick={() => this.pressNumber(5)}>5</div>
                    <div class="item" onClick={() => this.pressNumber(2)}>2</div>
                    <div class="item" onClick={() => this.pressNumber(0)}>0</div>
                    <div class="item" onClick={() => this.pressDelete()}>DEL</div>
                    <div class="item" onClick={() => this.pressNumber(9)}>9</div>
                    <div class="item" onClick={() => this.pressNumber(6)}>6</div>
                    <div class="item" onClick={() => this.pressNumber(3)}>3</div>
                    <div class="item" onClick={() => this.pressDot()}>.</div>
                    <div class="item" onClick={() => this.pressOperator(' / ')}>/</div>
                    <div class="item" onClick={() => this.pressOperator(' * ')}>x</div>
                    <div class="item" onClick={() => this.pressOperator(' - ')}>-</div>
                    <div class="item" onClick={() => this.pressOperator(' + ')}>+</div>
                    <div class="item" onClick={() => this.pressEqual()}>=</div>
                </div>
            </div>
        )
    }
}