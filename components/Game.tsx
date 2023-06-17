import React from "react";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { categoryMap } from "../utils/utils";

interface Question {
  question: string;
  options: string[];
  correctOption: string[];
}

interface GameInfo {
  questions: Question[];
  totalQuestions: number;
  progress: {
    correct: number;
    questionsAsked: number;
  };
}

export default function Game({ route, navigation }) {
  const [isLoading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<any>(null);

  useEffect(() => {
    const amount = route?.params?.numQuestions;
    const category = route?.params?.category;
    const difficulty = route?.params?.difficulty;
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => updateData(json?.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  function updateData(data: any): void {
    console.log(data);
    setData(data);
  }

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator /> : <Text>Game works!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cacfe3",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
});
