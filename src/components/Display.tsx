import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
    display: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#373B44',
        alignItems: 'flex-end',
    },
    displayValue: {
        fontSize: 60,
        color: '#fff',
    },
})

type Props = {
    value: string
}

export default function Display({ value }: Props) {
    return (
        <View style={styles.display}>
            <Text style={styles.displayValue} numberOfLines={1}>
                {value}
            </Text>
        </View>
    )
}
