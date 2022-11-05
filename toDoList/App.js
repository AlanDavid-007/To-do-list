import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useState, useEffect} from 'react';
import { Keyboard, Text} from 'react-native';
//Components
import Header from "./components/Header.js";
import ListItems from './components/ListItems.js';
import InputModal from './components/InputModal.js';

//Styled Components
import {Container, TodoText} from "./styles/appStyles.js";
//Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';


export default function App() {
  
  const [ready, setReady] = useState(false);

     //Initial Todos
     const initialTodos = [{}];
      
     const [todos, setTodos] = useState([initialTodos]);

    //Clear all todos
    const handleClearTodos = () => {
        AsyncStorage.setItem("storedTodos", JSON.stringify([])).then(() => {
            setTodos([]);
        }).catch((error) => console.log(error));
    }

    //Modal Visibility
    const [modalVisible, setModalVisible] = useState(false);
    //Function to add a new todo
    const handleAddTodo = (todo) => {
        const newTodos = [...todos, todo]; 
        AsyncStorage.setItem("storedTodos", JSON.stringify(newTodos)).then(() => {
            setTodos(newTodos);
            setModalVisible(false);
        }).catch((error) => console.log(error));
            console.log(setTodos(newTodos));
        // const myNewTodo = todos.push();
    }
    //Editing a todo
    const [todoToBeEdited, setTodoToBeEdited] = useState(null);

    const handleTriggerEdit = (item) => {
        setTodoToBeEdited(item);
        setModalVisible(true);
        // setTodoInputValue(item.title);
    }
    const handleEditTodo = (editedTodo) => {
        const newTodos = [...todos];
        const todoIndex = todos.findIndex((todo) => todo.key === editedTodo.key);
        newTodos.splice(todoIndex, 1, editedTodo);
        AsyncStorage.setItem("storedTodos", JSON.stringify( newTodos)).then(() => {
            setTodos(newTodos);
            setTodoToBeEdited(null);
            setModalVisible(false);
            // console.log(todoIndex);
        }).catch((error) => console.log(error));
    }

    const loadTodos = () => {
      AsyncStorage.getItem("storedTodos").then(data => {
        if (data !== null) {
          setTodos(JSON.parse(data))
        }
      }).catch((error) => console.log(error));
    }

    if (!ready) {
      return (
        <AppLoading
          startAsync={loadTodos}
          onFinish={() => setReady(true)}
          onError={console.warn}
        />
      )
    }

    return (
        <>
            <Container todos={todos} setTodos={setTodos}>
            <Header handleClearTodos={handleClearTodos} />
            {todos.length == 0 ? <TodoText>Você ainda não possui tarefas</TodoText> : null}
            <ListItems 
                todos={todos}
                setTodos={setTodos}
                handleTriggerEdit={handleTriggerEdit}
            />
            <InputModal 
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                handleAddTodo={handleAddTodo}
                todoToBeEdited={todoToBeEdited}
                setTodoToBeEdited={setTodoToBeEdited}
                handleEditTodo={handleEditTodo}
                todos={todos}
                setTodos={setTodos}
            />
                  <StatusBar style="light" />
    </Container>
        </>
    );
}

