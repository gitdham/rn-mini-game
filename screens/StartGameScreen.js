import { useState } from "react"
import { Alert, StyleSheet, TextInput, View } from "react-native"
import PrimaryButton from "../components/ui/PrimaryButton"
import Colors from "../constants/colors"

function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState('')

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText)
  }

  function confirmInputHandler() {
    const choosenNumber = parseInt(enteredNumber)

    if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99.',
        [{
          text: 'Okay',
          style: 'destructive',
          onPress: resetInputHandler
        }]
      )
      return
    }

    onPickNumber(choosenNumber)
  }

  function resetInputHandler() {
    setEnteredNumber('')
  }

  return (
    <View style={ styles.inputContainer }>
      <TextInput
        style={ styles.numberInput }
        maxLength={ 2 }
        keyboardType='number-pad'
        autoCapitalize="none"
        autoCorrect={ false }
        onChangeText={ numberInputHandler }
        value={ enteredNumber }
      />
      <View style={ styles.buttonsContainer }>
        <View style={ styles.buttonContainer }>
          <PrimaryButton onPress={ resetInputHandler }>Reset</PrimaryButton>
        </View>
        <View style={ styles.buttonContainer }>
          <PrimaryButton onPress={ confirmInputHandler }>Confirm</PrimaryButton>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 4
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1,
  }
})

export default StartGameScreen
