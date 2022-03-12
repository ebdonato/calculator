import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Button from './src/components/Button'
import Display from './src/components/Display'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
})

export default function App() {
    const [displayValue, setDisplayValue] = useState('0')
    const [clearDisplay, setClearDisplay] = useState(false)
    const [operation, setOperation] = useState('')
    const [values, setValues] = useState([0, 0])
    const [current, setCurrent] = useState(0)

    const doOperation = (newOperation: string) => {
        if (current === 0) {
            setOperation(newOperation)
            setCurrent(1)
            setClearDisplay(true)
        } else {
            const newOperationIsEquals = newOperation === '='

            const [operandA, operandB] = values

            let result

            try {
                // eslint-disable-next-line no-eval
                result = eval(`${operandA} ${operation} ${operandB}`)
            } catch (_) {
                result = operandA
            }

            setDisplayValue(result.toString())
            setOperation(newOperationIsEquals ? '' : newOperation)
            setCurrent(newOperationIsEquals ? 0 : 1)
            setClearDisplay(!newOperationIsEquals)
            setValues([result, 0])
        }
    }

    const clearMemory = () => {
        setDisplayValue('0')
        setClearDisplay(false)
        setOperation('')
        setValues([0, 0])
        setCurrent(0)
    }

    const addDigit = (digit: string) => {
        const clear = displayValue === '0' || clearDisplay

        if (digit === '.' && !clear && displayValue.includes('.')) return

        const noCurrentValue = digit === '.' ? '0' : ''

        const currentValue = clear ? noCurrentValue : displayValue

        const newDisplayValue = currentValue + digit

        setDisplayValue(newDisplayValue)

        setClearDisplay(false)

        if (digit !== '.') {
            const [operandA, operandB] = values

            const newOperand = parseFloat(newDisplayValue)

            setValues(current ? [operandA, newOperand] : [newOperand, operandB])
        }
    }

    return (
        <View style={styles.container}>
            <Display value={displayValue} />
            <View style={styles.buttons}>
                <Button label="AC" triple onClick={() => clearMemory()} />
                <Button label="/" operation onClick={() => doOperation('/')} />
                <Button label="7" onClick={() => addDigit('7')} />
                <Button label="8" onClick={() => addDigit('8')} />
                <Button label="9" onClick={() => addDigit('9')} />
                <Button label="*" operation onClick={() => doOperation('*')} />
                <Button label="4" onClick={() => addDigit('4')} />
                <Button label="5" onClick={() => addDigit('5')} />
                <Button label="6" onClick={() => addDigit('6')} />
                <Button label="-" operation onClick={() => doOperation('-')} />
                <Button label="1" onClick={() => addDigit('1')} />
                <Button label="2" onClick={() => addDigit('2')} />
                <Button label="3" onClick={() => addDigit('3')} />
                <Button label="+" operation onClick={() => doOperation('+')} />
                <Button label="0" double onClick={() => addDigit('0')} />
                <Button label="." onClick={() => addDigit('.')} />
                <Button label="=" operation onClick={() => doOperation('=')} />
            </View>
        </View>
    )
}
