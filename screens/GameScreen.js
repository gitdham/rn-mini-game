import { useEffect, useState } from "react"
import { Alert, StyleSheet, Text, View } from "react-native"
import NumberContainer from "../components/game/NumberContainer"
import PrimaryButton from "../components/ui/PrimaryButton"
import Title from "../components/ui/Title"

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min

  if (rndNum === exclude) return generateRandomBetween(min, max, exclude)
  return rndNum
}

let minBoundary = 1
let maxBoundary = 100

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber)
  const [currentGusess, setCurrentGuess] = useState(initialGuess)

  useEffect(() => {
    if (currentGusess === userNumber) onGameOver()
  }, [currentGusess, userNumber, onGameOver])

  // direction => 'lower', 'greater'
  function nextGuessHandler(direction) {
    if (
      (direction === 'lower' && currentGusess < userNumber) ||
      (direction === 'greater' && currentGusess > userNumber)
    ) {
      Alert.alert(
        'Don\'t lie!',
        'You know that this is wrong...',
        [{
          text: 'Sorry!',
          style: 'cancel',
        }]
      )
      return
    }

    if (direction === 'lower') maxBoundary = currentGusess
    else minBoundary = currentGusess + 1

    const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGusess)
    setCurrentGuess(newRndNumber)
  }

  return (
    <View style={ styles.screen }>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{ currentGusess }</NumberContainer>
      <View>
        <Text>Higher or lower?</Text>
        <View>
          <PrimaryButton onPress={ nextGuessHandler.bind(this, 'lower') }>-</PrimaryButton>
          <PrimaryButton onPress={ nextGuessHandler.bind(this, 'greater') }>+</PrimaryButton>
        </View>
      </View>
      {/* <View>LOG ROUNDS</View> */ }
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
})

export default GameScreen
