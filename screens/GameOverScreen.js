import { Dimensions, Image, StyleSheet, Text, View } from "react-native"
import PrimaryButton from "../components/ui/PrimaryButton"
import Title from "../components/ui/Title"
import Colors from "../constants/colors"

function GameOverScreen({ roundsNumber, userNumber, onRestartGame }) {
  return (
    <View style={ styles.rootContainer }>
      <Title>GAME OVER!</Title>
      <View style={ styles.imageContainer }>
        <Image source={ require('../assets/images/success.png') } style={ styles.image } />
      </View>
      <Text style={ styles.summaryText }>
        Your phone needed <Text style={ styles.highlight }>{ roundsNumber }</Text> rounds to guess the number <Text style={ styles.highlight }>{ userNumber }</Text>.
      </Text>
      <PrimaryButton onPress={ onRestartGame }>Start New Game</PrimaryButton>
    </View>
  )
}

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: deviceWidth < 380 ? 150 : 300,
    height: deviceWidth < 380 ? 150 : 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    margin: 36,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: deviceWidth < 380 ? 18 : 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500
  },
})

export default GameOverScreen
