import React from "react";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Game({ route, navigation }) {
  const [isLoading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<any>(null);

  useEffect(() => {
    console.log("use effect", route.params);
    // TODO update this with actual params
    const url = "https://opentdb.com/api.php?amount=10";
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text>Game works!</Text>
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
});
