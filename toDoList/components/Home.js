import React from 'react';
import {Text} from 'react-native';

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
    return (
        <>
            <Header handleClearTodos={handleClearTodos} />
            <ListItems 
                todos = {todos}
                setTodos = {setTodos}
            />
            <InputModal 
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                todoInputvalue={todoInputvalue}
                setTodoInputValue={setTodoInputValue}
            />
        </>
    );
}
export default Home;