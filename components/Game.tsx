import { Button, Text, StyleSheet, View } from "react-native";

export default function Game({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#384061" }}>New game here!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cacfe3",
    alignItems: "center",
    justifyContent: "center",
  },
});
