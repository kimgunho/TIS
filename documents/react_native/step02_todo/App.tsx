import { StatusBar } from 'expo-status-bar';
import { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getDate, getTime } from './utils/getDate';
import { getToDoData } from './utils/getTodoData';
import { theme } from './colors';
import { styles } from './styles';
import { ToDosDef } from './types';

const STORAGE_KEY = '@toDos';

export default function App() {
  const [toDos, setToDos] = useState<ToDosDef>({});
  const inputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    getToDos();
  }, []);

  const getToDos = async () => {
    const latest = await AsyncStorage.getItem(STORAGE_KEY);
    if (latest) {
      saveToDos(JSON.parse(latest));
    }
  };

  const saveToDos = async (saveToDos: ToDosDef) => {
    setToDos(saveToDos);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(saveToDos));
  };

  const removeToDo = (key: string) => {
    const newToDos = { ...toDos };
    delete newToDos[key];
    saveToDos(newToDos);
  };

  const clearText = () => {
    if (inputRef.current) inputRef.current.clear();
  };

  const validationToDo = (text: string) => {
    const isAlreadyHasText = Object.values(toDos).some((toDo) => toDo.text === text);
    let result = false;
    if (text === '') {
      alert('Please write something');
      result = true;
    }
    if (isAlreadyHasText) {
      alert('It already exists.');
      result = true;
    }
    return result;
  };

  const addToText = ({ nativeEvent: { text } }: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    clearText();
    if (validationToDo(text)) return;

    const newToDos = {
      [Date.now()]: {
        text,
        isDone: false,
        createAt: new Date().toDateString(),
      },
      ...toDos,
    };
    saveToDos(newToDos);
  };

  const changeDone = (key: string) => {
    const copyToDos = { ...toDos };
    copyToDos[key].isDone = !copyToDos[key].isDone;

    const toDosArr = Object.entries(copyToDos).map(([id, data]) => ({ id, ...data }));

    toDosArr.sort((a, b) => {
      if (a.isDone !== b.isDone) {
        return a.isDone ? 1 : -1;
      }
      return new Date(a.createAt).getTime() - new Date(b.createAt).getTime();
    });

    const newToDos = toDosArr.reduce((acc, cur) => {
      const { text, createAt, isDone } = cur;
      return { ...acc, [cur.id]: { text, createAt, isDone } };
    }, {});

    saveToDos(newToDos);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.text}>Work</Text>
      </View>
      <View>
        <TextInput
          ref={inputRef}
          style={styles.input}
          returnKeyType="done"
          onSubmitEditing={addToText}
          placeholder={'Add a TODO'}
        />
      </View>
      <ScrollView>
        {Object.entries(toDos).map((data) => {
          const { key: _key, text, isDone, createAt } = getToDoData(data);

          return (
            <TouchableOpacity key={_key} onPress={() => changeDone(_key)} hitSlop={20}>
              <View style={{ ...styles.line, backgroundColor: isDone ? '#111' : theme.toDoBg }} key={_key}>
                <View style={styles.flex}>
                  <Text style={styles.lineText}>{text}</Text>
                  <Text style={styles.lineDoneBtn}>{isDone ? 'Done' : 'Not Done'}</Text>
                </View>
                <Text style={styles.lineDate}>
                  {getDate(createAt)} / {getTime(createAt)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
