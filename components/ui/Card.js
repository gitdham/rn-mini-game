import { Dimensions, StyleSheet, View } from "react-native"
import Colors from "../../constants/colors"

function Card({ children }) {
  return <View style={ styles.card }>{ children }</View>
}

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: deviceWidth < 389 ? 18 : 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 4
  },
})

export default Card
