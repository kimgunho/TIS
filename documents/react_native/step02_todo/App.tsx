import { StatusBar } from 'expo-status-bar';
import { useState, useRef } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  ScrollView,
} from 'react-native';

import { getDate, getTime } from './utils/getDate';
import { getToDoData } from './utils/getTodoData';
import { theme } from './colors';
import { styles } from './styles';
import { ToDosDef } from './types';

export default function App() {
  const [isWorking, setWorking] = useState<boolean>(true);
  const [toDos, setToDos] = useState<ToDosDef>({});
  const inputRef = useRef<TextInput | null>(null);

  const handleWorking = () => {
    setWorking(true);
  };

  const handleTravel = () => {
    setWorking(false);
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
        createAt: new Date(),
      },
      ...toDos,
    };
    setToDos(newToDos);
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

    setToDos(newToDos);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleWorking}>
          <Text style={{ ...styles.text, color: isWorking ? theme.white : theme.gray }}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTravel}>
          <Text style={{ ...styles.text, color: !isWorking ? theme.white : theme.gray }}>Calendar</Text>
        </TouchableOpacity>
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
