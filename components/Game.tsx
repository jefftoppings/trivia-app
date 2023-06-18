import React from "react";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface ApiQuestion {
  category: string;
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
  type: "multiple" | "boolean";
}

interface Question {
  question: string;
  options: string[];
  correctOption: string;
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
  const [gameInfo, setGameInfo] = React.useState<GameInfo>(null);

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

  function updateData(data: ApiQuestion[]): void {
    const questions: Question[] = data?.map((apiQuestion: ApiQuestion) => {
      const options: string[] =
        apiQuestion.type === "multiple"
          ? apiQuestion.incorrect_answers.concat(apiQuestion.correct_answer)
          : ["True", "False"];
      return {
        question: apiQuestion.question,
        options: shuffleArray(options),
        correctOption: apiQuestion.correct_answer,
      };
    });
    const gameInfo: GameInfo = {
      questions,
      totalQuestions: questions.length,
      progress: {
        correct: 0,
        questionsAsked: 0,
      },
    };
    console.log({ gameInfo });
    setGameInfo(gameInfo);
  }

  function shuffleArray<T>(arr: T[]): T[] {
    return arr
      .map((value) => ({ value, sortVal: Math.random() }))
      .sort((a, b) => a.sortVal - b.sortVal)
      .map(({ value }) => value);
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
