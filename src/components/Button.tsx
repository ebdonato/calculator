import { StyleSheet, Text, TextStyle, Dimensions, TouchableHighlight } from 'react-native'

const defaultDimension = Dimensions.get('window').width / 4

type Styles = {
    button: TextStyle
    operationButton: TextStyle
    doubleButton: TextStyle
    tripleButton: TextStyle
}

const styles = StyleSheet.create<Styles>({
    button: {
        fontSize: 40,
        height: defaultDimension,
        width: defaultDimension,
        padding: 20,
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#888',
    },
    operationButton: {
        color: '#fff',
        backgroundColor: '#fa8231',
    },
    doubleButton: {
        width: defaultDimension * 2,
    },
    tripleButton: {
        width: defaultDimension * 3,
    },
})

type Props = {
    label: string
    onClick: () => void
    double?: boolean
    triple?: boolean
    operation?: boolean
}

export default function Button({ label, onClick, double, triple, operation }: Props) {
    const style: TextStyle[] = [styles.button]

    if (double) {
        style.push(styles.doubleButton)
    }

    if (triple) {
        style.push(styles.tripleButton)
    }

    if (operation) {
        style.push(styles.operationButton)
    }

    return (
        <TouchableHighlight onPress={onClick}>
            <Text style={style}>{label}</Text>
        </TouchableHighlight>
    )
}

Button.defaultProps = {
    double: false,
    triple: false,
    operation: false,
}
