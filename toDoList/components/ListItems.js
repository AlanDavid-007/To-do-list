import React, {useState} from 'react';
import {Text} from 'react-native';

//Styled Components
import {
    ListView,
    ListViewHidden,
    TodoText,
    TodoDate,
    HiddenButton,
    SwipedTodoText,
    colors, 
} from "../styles/appStyles.js";

import { SwipeListView } from 'react-native-swipe-list-view';
import {Entypo} from "@expo/vector-icons";

const ListItems = ({todos, setTodos, handleTriggerEdit}) => {

    //For styling currently swiped todo row
    const [swipedRow, setSwipedRow] = useState(null);

    const handleDeleteTodo = (rowMap, rowKey) => {
        const newTodos = [...todos];
        const todoIndex = todos.findIndex((todo) => todo.key === rowKey);
        newTodos.splice(todoIndex, 1);
        setTodos(newTodos);
    }
    return (
        <>
        {todos.lenght == 0 && <TodoText>Você não tem tarefas hoje</TodoText>}
        {todos.lenght != 0 && <SwipeListView
            data={todos}
            renderItem={(data) => {
                 const RowText = data.item.key == swipedRow ? SwipedTodoText : TodoText;
                 console.log(data.item.title);
                return(
                    <ListView
                            underlayColor={colors.primary}
                            onPress={() => {
                                handleTriggerEdit(data.item)
                            }}
                        >
                            <>
                                <RowText>{data.item.title}</RowText>
                                <TodoDate>{data.item.date}</TodoDate>
                            </>
                        </ListView>
                )
            }}
            renderHiddenItem = {(data, rowMap) => {
                return (
                <ListViewHidden>
                    <HiddenButton
                        onPress={() => handleDeleteTodo(rowMap, data.item.key)}
                        >
                        <Entypo name="trash" size={25} color={colors.secondary} />
                    </HiddenButton>
                </ListViewHidden>
                )
            }}
            leftOpenValue={80}
            previewRowKey={"1"}
            previewOpenvalue={80}
            previewOpenDelay={3000}
            disableLeftSqipe={true}
            showsVerticalScrollIndicator={false}
            style={{
                flex: 1, paddingBottom: 30, marginBottom: 40
            }}
            onRowOpen={(rowKey) => {
                setSwipedRow(rowKey);
            }}
            onRowClose={() => {
                setSwipedRow(null);
            }}
        />}
        </>
    );
}

export default ListItems;