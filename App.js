import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Keyboard,
  Animated,
} from "react-native";
import { useState, useRef } from "react";

export default function App() {
  const [correctNum, setCorrectNum] = useState(() =>
    Math.floor(Math.random() * 20 + 1)
  );
  const [guessedNum, setGuessedNum] = useState("");
  const [message, setMessage] = useState("");
  const [gameWon, setGameWon] = useState(false);
  const [guessCount, setGuessCount] = useState(0);

  const moveAnim = useRef(new Animated.Value(0)).current;

  const Restart = () => {
    setCorrectNum(Math.floor(Math.random() * 20 + 1));
    setGuessedNum("");
    setMessage("");
    setGameWon(false);
    setGuessCount(0);
    moveAnim.setValue(0); 
  };

  const SubmitGuess = () => {
    const guess = parseInt(guessedNum);
    if (isNaN(guess)) {
      setMessage("Du måste skriva ett giltigt nummer.");
      return;
    }

    setGuessCount((prev) => prev + 1);
    Keyboard.dismiss();

    if (guess === correctNum) {
      setMessage("Snyggt! Du gissade rätt!");
      setGameWon(true);
    } else if (guess > correctNum) {
      setMessage("För högt!");
    } else {
      setMessage("För lågt!");
    }

    Animated.timing(moveAnim, {
      toValue: guessCount * 10,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>Ange gissning nedan (1–20):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={guessedNum}
        onChangeText={setGuessedNum}
      />
      <Button onPress={SubmitGuess} title="Gissa!" color="#FFD700" />
      <Text style={{ marginTop: 20, color: "white" }}>{message}</Text>
      {guessCount > 0 && (
        <Animated.Text
          style={{
            marginTop: 20,
            color: "white",
            transform: [{ translateY: moveAnim }],
          }}
        >
          Du har gissat: {guessCount} gånger
        </Animated.Text>
      )}
      <StatusBar style="auto" />
      {gameWon && (
        <View style={{ marginTop: 20 }}>
          <Button onPress={Restart} title="Starta om" color="#FFD700" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008080", 
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
    backgroundColor: "white",
  },
});
