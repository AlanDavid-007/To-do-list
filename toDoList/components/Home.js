import React from 'react';
import {useState} from 'react';

//Components
import Header from "./Header.js";
import ListItems from './ListItems.js';
import InputModal from './InputModal.js';

const Home = () => {

    //Initial To-dos
    const initialTodos = [ {
        title: "Escreva sua primeira tarefa!",
        date: "15 de Outubro de 2022",
        key: "1"
    }]

    const [todos, setTodos] = useState(initialTodos);

    //Clear all todos
    const handleClearTodos = () => {
        setTodos = ([]);
    }

    //Modal Visibility
    const [modalVisible, setModalVisible] = useState(false);
    const [todoInputvalue, setTodoInputValue] = useState();
    
    //Function to add a new todo
    const handleAddTodo = (todo) => {
        const newTodos = [...todos, todo];
        setTodos(newTodos);
        setModalVisible(false);
    }
    
    //Editing a todo

    const [todoToBeEdited, setTodoToBeEdited] = useState(null);

    const handleTriggerEdit = (item) => {
        setTodoToBeEdited(item);
        setModalVisible(true);
        setTodoInputValue(item.title);
    }

    const handleEditTodo = (editTodo) => {
        const newTodos = [...todos];
        const TodoIndex = todos.findIndex((todo) => todo.key === editedTodo.key);
        newTodos.splice(TodoIndex, 1, editTodo);
        setTodos(newTodos);
        setTodoToBeEdited(null);
        setModalVisible(false);
    }
    return (
        <>
            <Header handleClearTodos={handleClearTodos} />
            <ListItems 
                todos = {todos}
                setTodos = {setTodos}
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