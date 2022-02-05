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
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@todos";

export default function App() {
  const [working, setWorking] = useState({
    onWork: false,
    onTrav: false,
  });
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState([]);

  useEffect(() => {
    loadToDo();
  }, []);

  const work = () => {
    setWorking({ ...working, onWork: true, onTrav: false, nothing: false });
  };

  const travel = () => {
    setWorking({ ...working, onTrav: true, onWork: false, nothing: false });
  };

  const onChangeText = (e) => {
    setText(e);
  };

  const saveToDo = async (toDos) => {
    const objStr = JSON.stringify(toDos);
    await AsyncStorage.setItem(STORAGE_KEY, objStr);
  };

  const loadToDo = async () => {
    const getToDo = await AsyncStorage.getItem(STORAGE_KEY);
    const strObj = JSON.parse(getToDo);
    setToDos(strObj);
  };

  const addToDo = async () => {
    if (text === "") {
      return;
    }
    const newToDo = [...toDos, { id: Date.now(), text, working }];
    setToDos(newToDo);
    await saveToDo(newToDo);
    setText("");
  };

  async function remove(id) {
    const rm = toDos.filter((toDo) => id !== toDo.id);
    setToDos(rm);
    await saveToDo(rm);
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
      <ScrollView>
        {toDos
          .filter((toDo) => toDo.working.onWork && working.onWork)
          .map((toDo) => (
            <Title toDo={toDo} remove={remove} />
          ))}
        {toDos
          .filter((toDo) => toDo.working.onTrav && working.onTrav)
          .map((toDo) => (
            <Title toDo={toDo} remove={remove} />
          ))}
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
});
