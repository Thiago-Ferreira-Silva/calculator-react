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
        const state = { ...this.state }
        if (state.current === 0) {
            state.clearDisplay = true
            state.current = 1
        } else {
            let result = 0
            switch (state.operation) {
                case '+':
                    result = state.values[0] + state.values[1]
                    break
                case '-':
                    result = state.values[0] - state.values[1]
                    break
                case '*':
                    result = state.values[0] * state.values[1]
                    break
                case '/':
                    if (state.values[1] === 0) {
                        state.displayValue = 'Are you fu****g crazy?'
                        state.clearDisplay = true
                        state.values = [0, 0]
                        state.current  = 0
                    } else {
                        result = state.values[0] / state.values[1]
                    }
                    break
                default:
                    break
            }

            state.values = [result, 0]
            state.current = 1
            state.clearDisplay = true
            state.displayValue = `${result}`
        }

        if (operation === '=') {
            state.current = 0
            state.clearDisplay = false
            
        } else {
            state.operation = operation
        }

        this.setState({ ...state })
    }

    addDigit(digit) {
        let displayValue = this.state.displayValue
        const values = this.state.values

        if (digit === '.' && displayValue.includes('.')) return
        if (displayValue.length > 9 && !this.state.clearDisplay) return
        if (displayValue === '0') displayValue = ''

        this.state.clearDisplay ? displayValue = digit : displayValue += digit

        values[this.state.current] = displayValue.includes('.') ? parseFloat(displayValue) : parseInt(displayValue)

        this.setState({
            displayValue,
            values,
            clearDisplay: false
        })
    }

    //lembre-se de terminar o calendário: os dias ainda não estão alinhados com os dias da semana

    render() {
        return (
            <div className="calculator">
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