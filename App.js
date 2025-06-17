import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useState } from "react";
import { Keyboard } from "react-native";

export default function App() {
  const [correctNum, setCorrectNum] = useState(() =>
    Math.floor(Math.random() * 20 + 1)
  );
  const [guessedNum, setGuessedNum] = useState("");
  const [message, setMessage] = useState("");
  const [gameWon, setGameWon] = useState(false);
  const [guessCount, setGuessCount] = useState(0);

  const Restart = () => {
    setCorrectNum(Math.floor(Math.random() * 20 + 1));
    setGuessedNum();
    setMessage("");
    setGameWon(false);
    setGuessCount(0);
  };

  const SubmitGuess = () => {
    const guess = parseInt(guessedNum);
    setGuessCount(guessCount + 1);
    Keyboard.dismiss();

    if (isNaN(guess)) {
      setMessage("Du måste skriva ett giltigt nummer.");
    }

    if (guess === correctNum) {
      setMessage("Snyggt! Du gissade rätt!");
      setGameWon(true);
    } else if (guess > correctNum) {
      setMessage("För högt!");
    } else {
      setMessage("För lågt!");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Ange gissning nedan (1–20):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={guessedNum}
        onChangeText={setGuessedNum}
      />
      <Button onPress={() => SubmitGuess()} title="Gissa!" color="#4B0082" />
      <Text style={{ marginTop: 20 }}>{message}</Text>
      {guessCount > 0 && (
        <Text style={{ marginTop: 20 }}>
          Du har gissat: {guessCount} gånger
        </Text>
      )}
      <StatusBar style="auto" />
      {gameWon && (
        <View>
          <Button onPress={Restart} title="starta om"></Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4B0082",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 10,
  },
  input: {
    height: 40,
    width: 200,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});
