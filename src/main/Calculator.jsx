import './Calculator.css'

import React, {Component} from 'react'

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
    }

    clearMemory() {
        this.setState({ ...initialState })
        console.log('clear memory')
    }

    render() {
        return (
        <div className="Calculator">
            <Display value={this.state.displayValue} />
            <Button label="AC" click={this.clearMemory} triple />
        </div>
        )
    }

}