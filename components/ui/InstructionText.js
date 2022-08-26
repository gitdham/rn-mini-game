import { StyleSheet, Text } from "react-native"
import Colors from "../../constants/colors"

function InstructionText({ children, style }) {
  return <Text style={ [styles.insrtuctionText, style] }>{ children }</Text>
}

const styles = StyleSheet.create({
  insrtuctionText: {
    fontFamily: 'open-sans',
    color: Colors.accent500,
    fontSize: 24,
  },
})

export default InstructionText
