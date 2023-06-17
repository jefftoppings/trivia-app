import React from "react";
import { Button, StyleSheet, View } from "react-native";
import Dropdown from "react-native-input-select";

export default function GameOptions({ navigation }) {
  const [numQuestions, setNumQuestions] = React.useState(10);
  const [category, setCategory] = React.useState(0);
  const [difficulty, setDifficulty] = React.useState("easy");

  return (
    <View style={styles.container}>
      <Dropdown
        label="Number of questions"
        options={numQuestionsOptions}
        optionLabel={"name"}
        optionValue={"code"}
        selectedValue={numQuestions}
        onValueChange={(value) => setNumQuestions(value)}
        primaryColor={"#384061"}
        labelStyle={{
          color: "#384061",
          fontSize: 16,
          fontWeight: "500",
        }}
      />
      <Dropdown
        label="Category"
        placeholder=""
        options={categoryOptions}
        optionLabel={"name"}
        optionValue={"value"}
        selectedValue={category}
        onValueChange={(v) => setCategory(v)}
        primaryColor={"#384061"}
        labelStyle={{
          color: "#384061",
          fontSize: 16,
          fontWeight: "500",
        }}
      />
      <Dropdown
        label="Difficulty"
        placeholder=""
        options={difficultyOptions}
        optionLabel={"name"}
        optionValue={"value"}
        selectedValue={difficulty}
        onValueChange={(v) => setDifficulty(v)}
        primaryColor={"#384061"}
        labelStyle={{
          color: "#384061",
          fontSize: 16,
          fontWeight: "500",
        }}
      />
      <Button
        title="Start"
        onPress={() => navigation.navigate("Game")}
        color={"#384061"}
      />
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

const numQuestionsOptions = [
  { name: "5", code: 5 },
  { name: "10", code: 10 },
  { name: "25", code: 25 },
  { name: "50", code: 50 },
  { name: "100", code: 100 },
];

const categoryMap: Map<string, number> = new Map([
  ["Random", 0],
  ["General Knowledge", 9],
  ["Entertainment: Books", 10],
  ["Entertainment: Film", 11],
  ["Entertainment: Music", 12],
  ["Entertainment: Musicals & Theatres", 13],
  ["Entertainment: Television", 14],
  ["Entertainment: Video Games", 15],
  ["Entertainment: Board Games", 16],
  ["Science & Nature", 17],
  ["Science: Computers", 18],
  ["Science: Mathematics", 19],
  ["Mythology", 20],
  ["Sports", 21],
  ["Geography", 22],
  ["History", 23],
  ["Politics", 24],
  ["Art", 25],
  ["Celebrities", 26],
  ["Animals", 27],
  ["Vehicles", 28],
  ["Entertainment: Comics", 29],
  ["Science: Gadgets", 30],
  ["Entertainment: Japanese Anime & Manga", 30],
  ["Entertainment: Cartoon & Animations", 31],
]);

const categoryOptions = Array.from(categoryMap, ([name, value]) => ({
  name,
  value,
}));

const difficultyOptions = [
  { name: "Easy", value: "easy" },
  { name: "Medium", value: "medium" },
  { name: "Hard", value: "hard" },
];
