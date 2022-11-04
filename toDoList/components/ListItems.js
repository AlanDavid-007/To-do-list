import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';

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

//Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListItems = ({todos, setTodos, handleTriggerEdit, handleEditTodo, prioriColor, setPrioriColor}) => {

    //For styling currently swiped todo row
    const [swipedRow, setSwipedRow] = useState(null);

    const handleDeleteTodo = (rowMap, rowKey) => {
        const newTodos = [...todos];
        const todoIndex = todos.findIndex((todo) => todo.key === rowKey);
        newTodos.splice(todoIndex, 1);
        
        AsyncStorage.setItem("storedTodos", JSON.stringify([newTodos])).then(() => {
            setTodos(newTodos);
            // console.log(todoIndex);
        }).catch((error) => console.log(error));
    }
    const [dates, setDates] = useState(new Date());
    function pad(n) {return n < 10 ? "0"+n : n;}
    var Exced = pad(dates.getDate())+"/"+pad(dates.getMonth()+1)+"/"+dates.getFullYear();
    console.log(Exced);
    return (
        <>
         <SwipeListView
        
            data={todos}
            renderItem={(data) => {
                {if (data.item.date < Exced) {
                 const RowText = data.item.key == swipedRow ? SwipedTodoText : TodoText;
                  console.log(data.item);
                return(
                    <ListView
                            // underlayColor = {colors{prioriColor}}
                            style={{backgroundColor: "#D91616"}}
                            onPress={() => {
                                handleTriggerEdit(data.item)
                            }}
                        >
                            <>
                                <RowText>{data.item.title}</RowText>
                                {/* <RowText style={styles.rowText}>{data.item.description}</RowText> */}
                                {/* <TodoDate style={{color: "white"}}>Prioridade:{data.item.priority}</TodoDate> */}
                                <TodoDate style={{color: "white"}}>Prioridade:{data.item.priority}, {data.item.date}</TodoDate>
                            </>
                        </ListView>
                )
            } else {
                const RowText = data.item.key == swipedRow ? SwipedTodoText : TodoText;
                  console.log(data.item.key);
                return(
                    <ListView
                            // underlayColor = {colors{prioriColor}}
                            style={{backgroundColor: data.item.color}}
                            onPress={() => {
                                handleTriggerEdit(data.item)
                            }}
                        >
                            <>
                                <RowText>{data.item.title}</RowText>
                                {/* <RowText style={styles.rowText}>{data.item.description}</RowText> */}
                                {/* <TodoDate style={{color: "white"}}>Prioridade:{data.item.priority}</TodoDate> */}
                                <TodoDate style={{color: "white"}}>Prioridade:{data.item.priority}, {data.item.date}</TodoDate>
                            </>
                        </ListView>
                )
            }};
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
        />
        </>
    );
}
const styles = StyleSheet.create({
    rowText: {
        color: "gray"
    }
    })
export default ListItems;
