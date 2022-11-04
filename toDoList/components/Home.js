import React from 'react';
import {useState, useEffect} from 'react';
import { Keyboard, Text} from 'react-native';
//Components
import Header from "./Header.js";
import ListItems from './ListItems.js';
import InputModal from './InputModal.js';

//Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = ( {todoInputValue, setTodoInputValue}) => {


     //Initial Todos
     const initialTodos = [
        {
          title: "Escreva sua primeira tarefa!",
          description: "escreva aqui",
          date: "15 de Outubro de 2022",
          priority: "1",
          color: "blue",
          key: '1'
      }
      ];

    const [todos, setTodos] = useState(initialTodos);

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

        AsyncStorage.setItem("storedTodos", JSON.stringify([newTodos])).then(() => {
            setTodos(newTodos);
            setModalVisible(false);
        }).catch((error) => console.log(error));

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
        // if (todoIndex !== -1) {
        //     newTodos[todoIndex].title = 'Compre leite';
        // };
        newTodos.splice(todoIndex, 1, editedTodo);
        AsyncStorage.setItem("storedTodos", JSON.stringify([newTodos])).then(() => {
            setTodos(newTodos);
            setTodoToBeEdited(null);
            setModalVisible(false);
            // console.log(todoIndex);
        }).catch((error) => console.log(error));
    }
    return (
        <>
            <Header handleClearTodos={handleClearTodos} />
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
        </>
    );
}
export default Home;