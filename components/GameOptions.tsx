import React from "react";
import { Button, StyleSheet, View } from "react-native";
import Dropdown from "react-native-input-select";
import { categoryMap } from "../utils/utils";

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
        onPress={() =>
          navigation.navigate("Game", { numQuestions, category, difficulty })
        }
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

const categoryOptions = Array.from(categoryMap, ([name, value]) => ({
  name,
  value,
}));

const difficultyOptions = [
  { name: "Easy", value: "easy" },
  { name: "Medium", value: "medium" },
  { name: "Hard", value: "hard" },
];
