import React from "react";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
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

type GameState = "question" | "answer" | "result";

export default function Game({ route, navigation }) {
  const [isLoading, setLoading] = React.useState(false);
  const [gameInfo, setGameInfo] = React.useState<GameInfo>(null);
  const [numCorrect, setNumCorrect] = React.useState<number>(null);
  const [progressIndex, setProgressIndex] = React.useState<number>(null);
  const [gameState, setGameState] = React.useState<GameState>("question");
  const [questionCorrect, setQuestionCorrect] = React.useState<boolean>(false);

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
    setNumCorrect(0);
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
    return val
      .replaceAll("&quot;", '"')
      .replaceAll("&#039;", "'")
      .replaceAll("&rsquo;", "'")
      .replaceAll("&amp;", "&");
  }

  function handleOptionPress(question: Question, indexSelected: number): void {
    const questionCorrect: boolean =
      question.correctOption === question.options[indexSelected];
    setQuestionCorrect(questionCorrect);
    if (questionCorrect) {
      setNumCorrect(numCorrect + 1);
    }
    setGameState("answer");
  }

  function handleNextQuestion(): void {
    setProgressIndex(progressIndex + 1);
    setGameState("question");
  }

  function handleGoToResults(): void {
    setGameState("result");
  }

  const nextQuestionTemplate = (
    <TouchableOpacity
      style={styles.button}
      onPress={() => handleNextQuestion()}
    >
      <Text style={{ color: "white" }}>Next Question</Text>
    </TouchableOpacity>
  );

  const resultsTemplate = (
    <TouchableOpacity style={styles.button} onPress={() => handleGoToResults()}>
      <Text style={{ color: "white" }}>Results</Text>
    </TouchableOpacity>
  );

  const actualGame =
    gameState === "question" ? (
      <View>
        <Text
          style={{
            fontSize: 16,
            paddingTop: 8,
            paddingBottom: 8,
          }}
        >
          {gameInfo?.totalQuestions
            ? [
                "Question",
                progressIndex + 1,
                "of",
                gameInfo.totalQuestions,
              ].join(" ")
            : ""}
        </Text>
        <Text>{gameInfo?.questions?.[progressIndex]?.question || ""}</Text>
        {gameInfo?.questions?.[progressIndex]?.options?.map((prop, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() =>
                handleOptionPress(gameInfo.questions[progressIndex], index)
              }
            >
              <Text style={{ color: "white" }}>{prop}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    ) : gameState === "answer" ? (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require(`../assets/${
            questionCorrect ? "correct" : "incorrect"
          }.png`)}
        />
        {!questionCorrect ? (
          <Text>
            {"The correct answer was " +
              gameInfo.questions[progressIndex].correctOption}
          </Text>
        ) : (
          <></>
        )}
        {gameInfo.totalQuestions === progressIndex + 1
          ? resultsTemplate
          : nextQuestionTemplate}
      </View>
    ) : (
      <View>
        <Text>Final Results</Text>
        <Text>
          You got {Math.round((numCorrect / gameInfo.totalQuestions) * 100)}%!
        </Text>
        <Button
          title="New Game"
          onPress={() => navigation.navigate("Game Options")}
          color={"#384061"}
        />
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
  image: {
    height: 300,
    width: 300,
    resizeMode: "center",
  },
});
