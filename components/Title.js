import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { theme } from "./color";

export default function Title({ toDo, remove }) {
  return (
    <View style={styles.contentsContainer} key={toDo.id}>
      <View style={styles.rowContents}>
        <Text style={styles.contentsText}>{toDo.text}</Text>
        <TouchableOpacity onPress={() => remove(toDo.id)}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentsContainer: {
    backgroundColor: theme.white,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    flexDirection: "column-reverse",
  },
  rowContents: {
    height: 40,
    alignItems: "center",
    flexDirection: "row",
  },
  contentsIndex: {
    flex: 0.5,
    fontSize: 13,
    color: theme.grey,
  },
  contentsText: {
    flex: 9,
    fontSize: 20,
    fontWeight: "600",
  },
});
