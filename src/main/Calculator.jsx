import './Calculator.css'

import React, { Component } from 'react'

import Display from '../components/Display'
import Button from '../components/Button'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        if (this.current === 0) {
            this.clearDisplay = true
            this.current = 1
        } else {
            let result = 0
            switch (this.operation) {
                case '+':
                    result = this.values[0] + this.values[1]
                    break
                case '-':
                    result = this.values[0] - this.values[1]
                    break
                case '*':
                    result = this.values[0] * this.values[1]
                    break
                case '/':
                    if (this.values[1] === 0) {
                        this.displayValue = 'Are you fu****g crazy?'
                        this.clearDisplay = true
                        this.values = [0, 0]
                        this.current  = 0
                    } else {
                        result = this.values[0] / this.values[1]
                    }
                    break
                default:
                    break
            }

            this.values = [result, 0]
            this.current = 1
            this.clearDisplay = true
            this.displayValue = `${result}`
        }

        if (operation === '=') {
            this.current = 0
            this.clearDisplay = false
        } else {
            this.operation = operation
        }
    }

    addDigit(digit) {

    }

    //lembre-se de terminar o calendário: os dias ainda não estão alinhados com os dias da semana

    render() {
        return (
            <div className="Calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" operation click={this.setOperation} />
            </div>
        )
    }
}