import React from 'react';
import {useState, useEffect} from 'react';
import { Keyboard, Text} from 'react-native';
//Components
import Header from "./Header.js";
import ListItems from './ListItems.js';
import InputModal from './InputModal.js';

const Home = () => {

    //Initial Todos
    const initialTodos = [{
        title: "Escreva sua primeira tarefa!",
        date: "15 de Outubro de 2022",
        key: "1"
    }, {
        title: "Compre Pão",
        date: "18 de Outubro de 2022",
        key: "2"
    },
    {
        title: "Aprenda React Native",
        date: "17 de Outubro de 2022",
        key: "3"
    }]

    const [todos, setTodos] = useState(initialTodos);

    //Clear all todos
    const handleClearTodos = () => {
        setTodos([]);
    }

    //Modal Visibility
    const [modalVisible, setModalVisible] = useState(false);
    const [todoInputvalue, setTodoInputValue] = useState();
    
    //Function to add a new todo
    const handleAddTodo = () => {
        Keyboard.dismiss();
        setTodos([...todos, todoInputvalue]);
        setTodoInputValue(null);
        setModalVisible(false);
    }
    
    //Editing a todo
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [todoToBeEdited, setTodoToBeEdited] = useState(null);

    const handleTriggerEdit = (item) => {
        setTodoToBeEdited(item);
        setModalVisible(true);
        setTodoInputValue(item.title);
    }

    const handleEditTodo = (editMap, editTodo) => {
        const newTodos = [...todos];
        const todoIndex = todos.findIndex((todo) => todo.key === editTodo);
        newTodos.splice(todoIndex, 1, editTodo);
        console.log(todoIndex);
        setTodos(newTodos);
        setTodoToBeEdited(null);
        setModalVisible(false);
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
                todoInputvalue={todoInputvalue}
                setTodoInputValue={setTodoInputValue}
                handleAddTodo={handleAddTodo}
                todoToBeEdited={todoToBeEdited}
                setTodoToBeEdited={setTodoToBeEdited}
                handleEditTodo={handleEditTodo}
                todos={todos}
            />
        </>
    );
}
export default Home;