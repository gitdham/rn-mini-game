import { useEffect, useState } from "react"
import { Alert, FlatList, StyleSheet, Text, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import NumberContainer from "../components/game/NumberContainer"
import Card from "../components/ui/Card"
import InstructionText from "../components/ui/InstructionText"
import PrimaryButton from "../components/ui/PrimaryButton"
import Title from "../components/ui/Title"
import GuessLogItem from "../components/game/GuessLogItem"

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
  const [guessRounds, setGuessRounds] = useState([initialGuess])

  useEffect(() => {
    if (currentGusess === userNumber) onGameOver(guessRounds.length)
  }, [currentGusess, userNumber, onGameOver])

  useEffect(() => {
    minBoundary = 1
    maxBoundary = 100
  }, [])

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
    setGuessRounds((prevGuessRounds => [newRndNumber, ...prevGuessRounds]))
  }

  const guessRoundsListLength = guessRounds.length

  return (
    <View style={ styles.screen }>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{ currentGusess }</NumberContainer>
      <Card>
        <InstructionText style={ styles.instructionText }>Higher or lower?</InstructionText>
        <View style={ styles.buttonsContainer }>
          <View style={ styles.buttonContainer }>
            <PrimaryButton onPress={ nextGuessHandler.bind(this, 'lower') }>
              <Ionicons name='md-remove' size={ 24 } color='white' />
            </PrimaryButton>
          </View>
          <View style={ styles.buttonContainer }>
            <PrimaryButton onPress={ nextGuessHandler.bind(this, 'greater') }>
              <Ionicons name='md-add' size={ 24 } color='white' />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={ styles.listContainer }>
        <FlatList
          data={ guessRounds }
          renderItem={ (itemData) => (
            <GuessLogItem
              roundNumber={ guessRoundsListLength - itemData.index }
              guess={ itemData.item }
            />
          ) }
          keyExtractor={ (item) => item }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  instructionText: {
    marginBottom: 12
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  }
})

export default GameScreen
