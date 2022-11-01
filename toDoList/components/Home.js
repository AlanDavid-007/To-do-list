import React from 'react';
import {useState, useEffect} from 'react';
import { Keyboard, Text} from 'react-native';
//Components
import Header from "./Header.js";
import ListItems from './ListItems.js';
import InputModal from './InputModal.js';

const Home = (todoInputValue, setTodoInputValue) => {

    //Initial Todos
    const initialTodos = [{
        title: "Escreva sua primeira tarefa!",
        description: "escreva aqui",
        date: "15 de Outubro de 2022",
        priority: "1",
        key: '1'
    }, {
        title: "Compre Pão",
        description: "desenvolva aqui",
        date: "14 de Outubro de 2022",
        priority: "2",
        key: '2'
    },
    {
        title: "Aprenda React Native",
        description: "Aceite aqui",
        date: "12 de Outubro de 2022",
        priority: "3",
        key: '3'
    }]

    const [todos, setTodos] = useState(initialTodos);

    //Clear all todos
    const handleClearTodos = () => {
        setTodos([]);
    }

    //Modal Visibility
    const [modalVisible, setModalVisible] = useState(false);
    
    //Function to add a new todo
    const handleAddTodo = (todo) => {
        const newTodos = [...todos, todo];
        setTodos(newTodos);
        setModalVisible(false);

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
        setTodos(newTodos);
        setTodoToBeEdited(null);
        setModalVisible(false);
        console.log(todoIndex);
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