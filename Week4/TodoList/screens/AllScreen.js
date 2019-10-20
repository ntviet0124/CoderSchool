import React, { useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Alert,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  ImageBackground,
  KeyboardAvoidingView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TODOS } from '../utils/data.js';

export default function AllScreen(props) {

  const {height} = Dimensions.get('window');
  const [todoList, setTodoList] = useState(TODOS);
  const [todoBody, setTodoBody] = useState('');

  const onToggleTodo = id => {
    const todo = todoList.find(todo => todo.id === id);
    todo.status = todo.status === 'Done' ? 'Active' : 'Done';
    const foundIndex = todoList.findIndex(todo => todo.id === id);
    todoList[foundIndex] = todo;
    const newTodoList = [...todoList];
    setTodoList(newTodoList);

    setTimeout(() => {
      props.navigation.navigate('SingleTodo', {
        updatedTodo: todo
      });
    }, 1000);
  };

  const onDeleteTodo = id => {
    const newTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(newTodoList);
  };

  const onLongPress = todo => {
    const prompt = `"${todo.body}"`;
    Alert.alert(
      'Delete your todo?',
      prompt,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed,'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => onDeleteTodo(todo.id) }
      ],
      { cancelable: true }
    );
  };

  const onSubmitTodo = () => {
    const newTodo = {
      body: todoBody,
      status: 'Active',
      id: todoList.length + 1
    };
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
    setTodoBody('');
  };

  const TodoItem = props => {

    const statusStyle = {
      iconName: props.todo.status === 'Done' ? 'checkbox-outline' : 'square-outline',
      colorIcon: props.todo.status === 'Done' ? '#7b8493' : '#1576b9',
      colorItem: props.todo.status === 'Done' ? {textDecorationLine: 'line-through', color: '#fff'} : {color: '#fff'},
    };
    return (
      <TouchableOpacity
        key={props.todo.body}
        style={[styles.todoItem]}
        onPress={() => props.onToggleTodo(props.todo.id)}
        onLongPress={() => onLongPress(props.todo)}
      >
        <Ionicons name={`md-${statusStyle.iconName}`} color={`${statusStyle.colorIcon}`} size={26} />
        <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#e9e9e9', marginLeft: 15, width: '100%', paddingBottom: 20 }}>
          <Text style={[styles.todoText, statusStyle.colorItem]}>
            {/* {props.idx + 1}. {props.todo.body} */}
            {props.todo.body}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/images/bg.jpg')} style={styles.container}>
      <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView
          enabled
          behavior="padding"
        >
          <ScrollView style={styles.scrollView}>
            <View style={{ height: height }} />
            <View style={styles.container}>
              {todoList.map((todo, idx) => {
                return (
                  <TodoItem
                    idx={idx}
                    todo={todo}
                    key={todo.body}
                    onToggleTodo={onToggleTodo}
                    onDeleteTodo={onDeleteTodo}
                  />
                );
              })}

              <View style={styles.inputContainer}>
                <TextInput
                  value={todoBody}
                  style={styles.todoInput}
                  onChangeText={text => setTodoBody(text)}
                />
                <TouchableOpacity style={styles.button} onPress={onSubmitTodo}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

AllScreen.navigationOptions = {
  // headerTransparent: true,
  title: 'All Todos',
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontSize: 22,
  },
  headerStyle: {
    backgroundColor: '#0079be',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0000009a',
    justifyContent: 'center',
  },
  todoItem: {
    margin: 5,
    padding: 10,
    minHeight: 50,
    // width: '95%',
    // flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: 40,
  },
  todoText: {
    fontSize: 20,
    fontWeight: '500',
  },
  todoInput: {
    width: '95%',
    minHeight: 30,
    color: 'white',
    borderWidth: 1,
    marginTop: '20%',
    marginBottom: '5%',
    borderColor: 'grey',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  inputContainer: {
    flex: 1,
    width: '90%',
    marginTop: 20,
    marginBottom: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
  button: {
    height: 50,
    width: '50%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#0079be',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
  }
});