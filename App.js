import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useMemo, useCallback } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { theme } from "./color";

export default function App() {
  const [working, setWorking] = useState({
    onWork: false,
    onTrav: false,
    nothing: true,
  });
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState([]);

  const work = () => {
    setWorking({ ...working, onWork: true, onTrav: false, nothing: false });
  };

  const travel = () => {
    setWorking({ ...working, onTrav: true, onWork: false, nothing: false });
  };

  const onChangeText = (e) => {
    setText(e);
  };

  const addToDo = () => {
    if (text === "") {
      return;
    }
    setToDos([...toDos, { id: Date.now(), text, work: working }]);
    setText("");
  };

  function remove(id) {
    setToDos(toDos.filter((toDo) => id !== toDo.id));
  }
  console.log("---------------------------------------");
  console.log(working);
  console.log(toDos);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{
              ...styles.title,
              color: working.onWork ? theme.white : theme.grey,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel} activeOpacity={0}>
          <Text
            style={{
              ...styles.title,
              color: working.onTrav ? theme.white : theme.grey,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          onChangeText={onChangeText}
          editable={working.nothing ? false : true}
          value={text}
          onSubmitEditing={addToDo}
          returnKeyType="done"
          placeholder={
            working.nothing
              ? "목록을 선택해주세요."
              : working.onWork
              ? "할일을 추가해 보세요"
              : "어디를 가고 싶으세요?"
          }
          style={styles.input}
        />
      </View>
      <ScrollView style={{ flexDirection: "column" }}>
        {working.nothing ? (
          <View style={{ ...styles.contentscontainer, display: "none" }}></View>
        ) : working.onWork ? (
          toDos
            .filter((toDo) => toDo.work.onWork === true)
            .map((workToDo, index) => (
              <View style={styles.contentsContainer} key={workToDo.id}>
                <View style={styles.rowContents}>
                  <Text style={styles.contentsIndex}>{index + 1}.</Text>
                  <Text style={styles.contentsText}>{workToDo.text}</Text>
                  <TouchableOpacity onPress={() => remove(workToDo.id)}>
                    <AntDesign name="close" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
        ) : (
          toDos
            .filter((toDo) => toDo.work.onTrav === true)
            .map((workToDo, index) => (
              <View style={styles.contentsContainer} key={workToDo.id}>
                <View style={styles.rowContents}>
                  <Text style={styles.contentsIndex}>{index + 1}.</Text>
                  <Text style={styles.contentsText}>{workToDo.text}</Text>
                  <TouchableOpacity onPress={() => remove(workToDo.id)}>
                    <AntDesign name="close" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 100,
  },
  title: {
    color: theme.grey,
    fontSize: 50,
    fontWeight: "700",
  },
  input: {
    backgroundColor: theme.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 20,
    fontSize: 18,
  },
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
