import React from "react";
import { useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
}

export default function Game({ route, navigation }) {
  const [isLoading, setLoading] = React.useState(false);
  const [gameInfo, setGameInfo] = React.useState<GameInfo>(null);
  const [correct, setCorrect] = React.useState<number>(null);
  const [progressIndex, setProgressIndex] = React.useState<number>(null);

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
        question: decodeHtmlCharCodesInString(apiQuestion.question),
        options: shuffleArray(options),
        correctOption: apiQuestion.correct_answer,
      };
    });
    const gameInfo: GameInfo = {
      questions,
      totalQuestions: questions.length,
    };
    console.log({ gameInfo });
    setGameInfo(gameInfo);
    setCorrect(0);
    setProgressIndex(0);
  }

  function shuffleArray<T>(arr: T[]): T[] {
    return arr
      .map((value) => ({ value, sortVal: Math.random() }))
      .sort((a, b) => a.sortVal - b.sortVal)
      .map(({ value }) => value);
  }

  /**
   * fixes some issues from API responses
   */
  function decodeHtmlCharCodesInString(val: string): string {
    return val.replaceAll("&quot;", '"');
  }

  const actualGame = (
    <View>
      <Text
        style={{
          fontSize: 16,
          paddingTop: 8,
          paddingBottom: 8,
        }}
      >
        {gameInfo?.totalQuestions
          ? ["Question", progressIndex + 1, "of", gameInfo.totalQuestions].join(
              " "
            )
          : ""}
      </Text>
      <Text>{gameInfo?.questions?.[progressIndex]?.question || ""}</Text>
      {gameInfo?.questions?.[progressIndex]?.options?.map((prop, index) => {
        return (
          <TouchableOpacity key={index} style={styles.button}>
            <Text style={{ color: "white" }}>{prop}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading || !gameInfo?.totalQuestions ? (
        <ActivityIndicator />
      ) : (
        actualGame
      )}
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
  button: {
    alignItems: "center",
    backgroundColor: "#384061",
    borderRadius: 6,
    padding: 16,
    margin: 16,
  },
});
